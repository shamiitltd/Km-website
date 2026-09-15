/**
 * Weather Controller for KisanMitra Smart Farming
 * Integrates with Open-Meteo High-Resolution Agricultural Weather APIs
 */

// In-memory cache to prevent excessive upstream calls (10 min TTL)
const weatherCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

function decodeWmoWeatherCode(code, isDay = 1) {
  const c = Number(code);
  const isNight = Number(isDay) === 0;

  switch (c) {
    case 0:
      return {
        label: isNight ? 'Clear Night' : 'Clear Sky',
        icon: isNight ? 'moon' : 'sun',
        condition: isNight ? 'clear-night' : 'clear'
      };
    case 1:
      return {
        label: isNight ? 'Mainly Clear' : 'Mainly Clear',
        icon: isNight ? 'moon-cloud' : 'sun-cloud',
        condition: isNight ? 'partly-cloudy-night' : 'partly-cloudy'
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        icon: isNight ? 'moon-cloud' : 'sun-cloud',
        condition: isNight ? 'partly-cloudy-night' : 'partly-cloudy'
      };
    case 3:
      return { label: 'Overcast', icon: 'cloud', condition: 'cloudy' };
    case 45:
    case 48:
      return { label: 'Foggy / Mist', icon: 'cloud-fog', condition: 'fog' };
    case 51:
    case 53:
    case 55:
      return { label: 'Light Drizzle', icon: 'cloud-drizzle', condition: 'drizzle' };
    case 61:
    case 63:
      return { label: 'Moderate Rain', icon: 'cloud-rain', condition: 'rain' };
    case 65:
      return { label: 'Heavy Rain', icon: 'cloud-rain-heavy', condition: 'heavy-rain' };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain Showers', icon: 'cloud-showers-heavy', condition: 'showers' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: 'cloud-lightning', condition: 'thunderstorm' };
    default:
      return {
        label: isNight ? 'Clear Night' : 'Clear Sky',
        icon: isNight ? 'moon' : 'sun',
        condition: isNight ? 'clear-night' : 'clear'
      };
  }
}

/**
 * Controller: GET /api/weather
 * Query: ?city=Noida or ?lat=28.5355&lon=77.3910
 */
exports.getWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let latitude = lat ? parseFloat(lat) : null;
    let longitude = lon ? parseFloat(lon) : null;
    let locationName = city ? city.trim() : '';
    let region = 'Uttar Pradesh';
    let country = 'India';

    // 1. If lat & lon provided from GPS, reverse geocode to get real city and state
    if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
      try {
        const reverseGeoBase = process.env.BIGDATACLOUD_GEO_API_URL || 'https://api.bigdatacloud.net/data/reverse-geocode-client';
        const revRes = await fetch(
          `${reverseGeoBase}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        if (revRes.ok) {
          const revData = await revRes.json();
          locationName = revData.city || revData.locality || revData.principalSubdivision || 'My Location';
          region = revData.principalSubdivision || 'India';
          country = revData.countryName || 'India';
        }
      } catch (revErr) {
        console.warn('Reverse geocoding error:', revErr.message);
        if (!locationName) locationName = 'Current Location';
      }
    } else {
      // Resolve coordinates from city name
      if (!locationName) locationName = 'Noida';
      try {
        const geoBase = process.env.OPEN_METEO_GEO_API_URL || 'https://geocoding-api.open-meteo.com/v1/search';
        const geoRes = await fetch(
          `${geoBase}?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData && geoData.results && geoData.results.length > 0) {
            const topResult = geoData.results[0];
            latitude = topResult.latitude;
            longitude = topResult.longitude;
            locationName = topResult.name;
            region = topResult.admin1 || topResult.country || 'India';
            country = topResult.country || 'India';
          }
        }
      } catch (geoErr) {
        console.warn('Geocoding lookup failed:', geoErr.message);
      }
    }

    // Default fallback to Noida, UP
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      latitude = 28.5355;
      longitude = 77.3910;
      locationName = 'Noida';
      region = 'Uttar Pradesh';
      country = 'India';
    }

    // Cache check (?refresh=true bypasses cache)
    const forceRefresh = req.query.refresh === 'true' || req.query.refresh === '1';
    const cacheKey = `${latitude.toFixed(2)}_${longitude.toFixed(2)}`;
    const cached = weatherCache.get(cacheKey);
    const now = Date.now();
    if (!forceRefresh && cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.status(200).json({
        success: true,
        source: 'cache',
        data: cached.data
      });
    }

    // 2. Fetch Open-Meteo High-Resolution Forecast
    const forecastApiBase = process.env.OPEN_METEO_API_URL || 'https://api.open-meteo.com/v1/forecast';
    const weatherUrl = `${forecastApiBase}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset&timezone=auto`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo API status: ${weatherRes.status}`);
    }

    const raw = await weatherRes.json();
    const currentRaw = raw.current || {};
    const isCurrentDay = currentRaw.is_day !== undefined ? Number(currentRaw.is_day) === 1 : (new Date().getHours() >= 6 && new Date().getHours() < 19);
    const currentWeatherInfo = decodeWmoWeatherCode(currentRaw.weather_code || 0, isCurrentDay ? 1 : 0);

    // Format Sunrise / Sunset
    let sunrise = '5:58 AM';
    let sunset = '6:22 PM';
    if (raw.daily && raw.daily.sunrise && raw.daily.sunrise[0]) {
      const sRise = new Date(raw.daily.sunrise[0]);
      sunrise = sRise.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    if (raw.daily && raw.daily.sunset && raw.daily.sunset[0]) {
      const sSet = new Date(raw.daily.sunset[0]);
      sunset = sSet.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    // Visibility in km
    const visibilityKm = currentRaw.visibility ? Math.round(currentRaw.visibility / 1000) : 8;

    // Hourly Forecast (24h)
    const hourlyRaw = raw.hourly || { time: [], temperature_2m: [], precipitation_probability: [], weather_code: [], wind_speed_10m: [], is_day: [] };
    const currentIsoPrefix = (currentRaw.time || '').slice(0, 13);
    let startIndex = hourlyRaw.time.findIndex(t => t.startsWith(currentIsoPrefix));
    if (startIndex === -1) startIndex = 0;

    const hourlyForecast = [];
    for (let i = startIndex; i < Math.min(startIndex + 24, hourlyRaw.time.length); i++) {
      const code = hourlyRaw.weather_code[i] || 0;
      const dateObj = new Date(hourlyRaw.time[i]);
      const hourVal = dateObj.getHours();
      let hourIsDay = 1;
      if (hourlyRaw.is_day && hourlyRaw.is_day.length > i) {
        hourIsDay = Number(hourlyRaw.is_day[i]);
      } else {
        hourIsDay = (hourVal >= 6 && hourVal < 19) ? 1 : 0;
      }
      const info = decodeWmoWeatherCode(code, hourIsDay);
      hourlyForecast.push({
        time: hourlyRaw.time[i],
        hourLabel: dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true }),
        temperature: Math.round(hourlyRaw.temperature_2m[i]),
        precipitationProbability: hourlyRaw.precipitation_probability[i] || 0,
        windSpeed: Math.round(hourlyRaw.wind_speed_10m[i] || 0),
        condition: info.label,
        icon: info.icon,
        isDay: hourIsDay === 1
      });
    }

    // 7-Day Forecast & Trends
    const dailyRaw = raw.daily || { time: [] };
    const dailyForecast = [];
    for (let i = 0; i < Math.min(7, dailyRaw.time ? dailyRaw.time.length : 0); i++) {
      const code = dailyRaw.weather_code[i] || 0;
      const info = decodeWmoWeatherCode(code);
      const dateObj = new Date(dailyRaw.time[i]);
      const dayName = dateObj.toLocaleDateString('en-IN', { weekday: 'short' });
      const fullDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

      dailyForecast.push({
        date: dailyRaw.time[i],
        dayName,
        fullDate,
        maxTemp: Math.round(dailyRaw.temperature_2m_max[i]),
        minTemp: Math.round(dailyRaw.temperature_2m_min[i]),
        precipitationProbability: dailyRaw.precipitation_probability_max[i] || 0,
        precipitationSum: Math.round((dailyRaw.precipitation_sum[i] || 0) * 10) / 10,
        windSpeedMax: Math.round(dailyRaw.wind_speed_10m_max[i] || 0),
        uvIndex: dailyRaw.uv_index_max ? Math.round(dailyRaw.uv_index_max[i] * 10) / 10 : 6,
        condition: info.label,
        icon: info.icon
      });
    }

    // Dynamic Farming Conditions Checklist
    const rainSumTomorrow = dailyForecast[1] ? dailyForecast[1].precipitationSum : 0;
    const rainProbToday = dailyForecast[0] ? dailyForecast[0].precipitationProbability : 0;
    const windSpeed = Math.round(currentRaw.wind_speed_10m || 0);
    const humidity = currentRaw.relative_humidity_2m || 60;
    const temp = Math.round(currentRaw.temperature_2m || 28);

    const isGoodForFarming = windSpeed < 20 && rainProbToday < 60 && temp < 38;

    const farmingConditions = {
      overallStatus: isGoodForFarming ? 'Good for Farming' : 'Caution Required',
      checklist: [
        {
          label: rainProbToday > 60 ? 'Delay irrigation (rain incoming)' : 'Suitable for irrigation',
          status: rainProbToday <= 60
        },
        {
          label: windSpeed < 18 ? 'Good for field operations' : 'Windy: Secure nursery covers',
          status: windSpeed < 18
        },
        {
          label: humidity < 75 ? 'Low risk of disease spread' : 'Elevated foliar disease risk (inspect crops)',
          status: humidity < 75
        },
        {
          label: windSpeed < 15 && rainProbToday < 30 ? 'Favourable for fertilizer application' : 'Postpone chemical spraying',
          status: windSpeed < 15 && rainProbToday < 30
        }
      ]
    };

    // Crop-wise Weather Impact
    const cropImpact = [
      {
        crop: 'Wheat',
        status: temp < 32 ? 'Favourable' : 'Heat Monitoring Needed',
        variant: temp < 32 ? 'success' : 'warning',
        iconKey: 'wheat'
      },
      {
        crop: 'Rice',
        status: rainProbToday > 50 || rainSumTomorrow > 5 ? 'Rain expected, ensure drainage' : 'Standard watering schedule',
        variant: rainProbToday > 50 || rainSumTomorrow > 5 ? 'warning' : 'success',
        iconKey: 'rice'
      },
      {
        crop: 'Sugarcane',
        status: 'Good conditions',
        variant: 'success',
        iconKey: 'sugarcane'
      },
      {
        crop: 'Maize',
        status: temp > 34 ? 'Slight heat stress, monitor moisture' : 'Favourable',
        variant: temp > 34 ? 'warning' : 'success',
        iconKey: 'maize'
      },
      {
        crop: 'Cotton',
        status: rainProbToday > 40 || rainSumTomorrow > 4 ? 'Protect standing boll from excess moisture' : 'Favourable',
        variant: rainProbToday > 40 || rainSumTomorrow > 4 ? 'warning' : 'success',
        iconKey: 'cotton'
      }
    ];

    // Real-Time Dynamic Meteorological Alerts (Multi-Hazard Diagnostic Engine)
    const alerts = [];

    // 1. Rain / Heavy Precipitation Alerts
    if (dailyForecast[1] && dailyForecast[1].precipitationSum >= 5) {
      alerts.push({
        id: 'alert-rain-heavy',
        category: 'rainfall',
        title: 'Heavy Rainfall Expected',
        date: dailyForecast[1].fullDate + ' 2026',
        description: `Moderate to heavy rainfall (~${dailyForecast[1].precipitationSum} mm) forecast across ${locationName}. Clear drainage channels to prevent waterlogging.`,
        severity: 'active',
        level: 'danger',
        action: 'Clear field bund trenches and postpone basal fertilization.'
      });
    } else if (dailyForecast[0] && dailyForecast[0].precipitationProbability > 50) {
      alerts.push({
        id: 'alert-rain-today',
        category: 'rainfall',
        title: 'Rain Expected Today',
        date: dailyForecast[0].fullDate + ' 2026',
        description: `High precipitation probability (${dailyForecast[0].precipitationProbability}%) across ${locationName}. Delay irrigation and spraying.`,
        severity: 'active',
        level: 'warning',
        action: 'Halt sprayers and secure open grain storage.'
      });
    }

    // 2. Thunderstorm & Convective Squall Alert
    const thunderstormDay = dailyForecast.find(d => [95, 96, 99].includes(decodeWmoWeatherCode(d.weather_code || 0).condition === 'thunderstorm' || d.icon === 'cloud-lightning'));
    if (thunderstormDay) {
      alerts.push({
        id: 'alert-thunderstorm',
        category: 'storm',
        title: 'Thunderstorm & Lightning Warning',
        date: thunderstormDay.fullDate + ' 2026',
        description: `Convective activity with lightning and gusty winds predicted on ${thunderstormDay.fullDate} in ${locationName}.`,
        severity: 'active',
        level: 'danger',
        action: 'Avoid open field machinery; shelter livestock indoors; inspect polyhouse fastenings.'
      });
    }

    // 3. Thermal & Heat Stress Alert
    const maxHeatDay = dailyForecast.find(d => d.maxTemp >= 35);
    if (maxHeatDay || temp >= 34) {
      const peakTemp = maxHeatDay ? maxHeatDay.maxTemp : temp;
      alerts.push({
        id: 'alert-heat',
        category: 'temperature',
        title: 'High Thermal Stress Advisory',
        date: (maxHeatDay ? maxHeatDay.fullDate : dailyForecast[0]?.fullDate || 'Today') + ' 2026',
        description: `Daytime temperatures reaching ${peakTemp}°C. Elevated evapotranspiration may cause wilting in shallow-rooted crops.`,
        severity: 'active',
        level: 'warning',
        action: 'Provide light frequent evening irrigations and apply straw mulch over nursery beds.'
      });
    }

    // 3b. Cold Stress & Frost Warning (for cold & hill agricultural zones)
    const coldDay = dailyForecast.find(d => d.minTemp <= 11);
    if (coldDay || temp <= 12) {
      const lowTemp = coldDay ? coldDay.minTemp : temp;
      alerts.push({
        id: 'alert-cold-frost',
        category: 'temperature',
        title: 'Cold Stress & Chill Hazard Advisory',
        date: (coldDay ? coldDay.fullDate : dailyForecast[0]?.fullDate || 'Today') + ' 2026',
        description: `Night temperatures dropping to ${lowTemp}°C in ${locationName}. Risk of chill shock to sensitive seedling foliage.`,
        severity: 'active',
        level: 'warning',
        action: 'Cover nursery beds with straw or agro-fleece mulch and apply light evening irrigation to maintain root-zone soil temperature.'
      });
    }

    // 4. High Humidity & Foliar Fungal Risk Alert
    if (humidity >= 70 && temp >= 24) {
      alerts.push({
        id: 'alert-humidity-pest',
        category: 'pest',
        title: 'Elevated Foliar Disease Risk',
        date: dailyForecast[0]?.fullDate + ' 2026',
        description: `Relative humidity at ${humidity}% with ambient warmth creates favourable conditions for blast, rust, and leaf spot pathogens.`,
        severity: 'advisory',
        level: 'info',
        action: 'Scout crop canopy undersides closely; keep bio-fungicides ready.'
      });
    }

    // 5. Wind Drift / Chemical Spraying Advisory
    if (windSpeed >= 16) {
      alerts.push({
        id: 'alert-wind',
        category: 'wind',
        title: 'Wind Warning: Chemical Drift Risk',
        date: 'Current Observation',
        description: `Wind gusts recorded at ${windSpeed} km/h. Uneven spray droplet dispersion may lead to off-target pesticide drift.`,
        severity: 'advisory',
        level: 'warning',
        action: 'Postpone aerial or knapsack spraying until wind calms below 12 km/h.'
      });
    } else {
      alerts.push({
        id: 'alert-spray-window',
        category: 'spray',
        title: 'Optimal Spraying & Field Window',
        date: 'Current Observation',
        description: `Gentle winds (${windSpeed} km/h) and moderate temperature provide ideal conditions for nutrient and pest management.`,
        severity: 'favourable',
        level: 'success',
        action: 'Ideal window for foliar spray and fertilizer top-dressing.'
      });
    }

    const payload = {
      location: {
        name: locationName,
        region,
        country,
        latitude,
        longitude
      },
      current: {
        temperature: temp,
        feelsLike: Math.round(currentRaw.apparent_temperature || temp),
        humidity,
        windSpeed,
        windDirection: currentRaw.wind_direction_10m || 0,
        surfacePressure: Math.round(currentRaw.surface_pressure || 1012),
        sunrise,
        sunset,
        visibility: `${visibilityKm} km`,
        weatherCode: currentRaw.weather_code || 0,
        condition: currentWeatherInfo.label,
        icon: currentWeatherInfo.icon,
        isDay: isCurrentDay,
        isNight: !isCurrentDay,
        summary: !isCurrentDay
          ? (currentWeatherInfo.condition.includes('rain') ? 'Night showers with high humidity. Ensure proper furrow drainage.' : 'Calm, clear night. Stable soil moisture and optimal thermal condition.')
          : (currentWeatherInfo.condition.includes('rain') ? 'Rain conditions across fields. Delay chemical spraying.' : 'Pleasant daytime weather for agricultural field operations.'),
        lastUpdated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      },
      farmingConditions,
      hourly: hourlyForecast,
      daily: dailyForecast,
      cropImpact,
      alerts,
      expectedRainTomorrow: dailyForecast[1] ? `${dailyForecast[1].precipitationSum} mm` : '0 mm',
      expectedRainDate: dailyForecast[1] ? dailyForecast[1].fullDate : 'Tomorrow'
    };

    weatherCache.set(cacheKey, { timestamp: now, data: payload });

    return res.status(200).json({
      success: true,
      source: 'live',
      data: payload
    });
  } catch (error) {
    console.error('Weather controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch agricultural weather data',
      error: error.message
    });
  }
};
