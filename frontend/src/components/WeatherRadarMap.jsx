import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WeatherRadarMap({ 
  location = { name: 'Noida', latitude: 28.58, longitude: 77.33 },
  onRecenter
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const canvasLayerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const animTimeRef = useRef(0);
  const initialLocationRef = useRef(location);
  const locationRef = useRef(location);
  useEffect(() => { locationRef.current = location; });

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const lat = Number(initialLocationRef.current?.latitude) || 28.58;
    const lon = Number(initialLocationRef.current?.longitude) || 77.33;

    // Create Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lon],
      zoom: 9.5,
      minZoom: 6,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true
    });

    // High quality OpenStreetMap tile layer (Loaded securely from environment configuration)
    const tileLayerUrl = import.meta.env.VITE_OSM_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileLayerUrl, {
      maxZoom: 18,
      subdomains: 'abc'
    }).addTo(map);

    // Custom Clean Blue Location Dot Marker with exact styling from reference image
    const customIcon = L.divIcon({
      className: 'weather-map-clean-marker',
      html: `
        <div style="display: flex; align-items: center; gap: 7px; white-space: nowrap; transform: translate(-8px, -8px); pointer-events: none;">
          <div style="width: 15px; height: 15px; background: #1a73e8; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.4); flex-shrink: 0;"></div>
          <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; text-shadow: -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff, 0 1px 4px rgba(255,255,255,0.9); font-family: system-ui, -apple-system, sans-serif; letter-spacing: -0.01em;">
            ${initialLocationRef.current?.name || 'Noida'}
          </span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    const marker = L.marker([lat, lon], { icon: customIcon, zIndexOffset: 1000 }).addTo(map);

    // Create Custom Canvas Layer for High-Performance Doppler Radar Rendering
    const CanvasRadarLayer = L.Layer.extend({
      onAdd: function(m) {
        this._map = m;
        this._canvas = L.DomUtil.create('canvas', 'leaflet-radar-layer');
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
        this._canvas.style.pointerEvents = 'none';
        this._canvas.style.zIndex = '350';
        this._canvas.style.mixBlendMode = 'multiply';
        this._canvas.style.opacity = '0.88';
        m.getPanes().overlayPane.appendChild(this._canvas);
        m.on('move', this._reset, this);
        m.on('resize', this._resize, this);
        this._resize();
      },
      onRemove: function(m) {
        m.getPanes().overlayPane.removeChild(this._canvas);
        m.off('move', this._reset, this);
        m.off('resize', this._resize, this);
      },
      _resize: function() {
        const size = this._map.getSize();
        this._canvas.width = size.x;
        this._canvas.height = size.y;
        this._reset();
      },
      _reset: function() {
        const topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
        this.draw();
      },
      draw: function() {
        if (!this._canvas || !this._map) return;
        const ctx = this._canvas.getContext('2d');
        const size = this._map.getSize();
        ctx.clearRect(0, 0, size.x, size.y);

        const centerLat = Number(locationRef.current?.latitude) || 28.58;
        const centerLon = Number(locationRef.current?.longitude) || 77.33;
        const t = animTimeRef.current;

        // Radar Storm Cells positioned around the region matching reference image
        const cells = [
          // 1. Northwest Cell (Sonipat / Haryana area)
          {
            lat: centerLat + 0.38 + Math.sin(t * 0.001) * 0.015,
            lon: centerLon - 0.32 + Math.cos(t * 0.001) * 0.015,
            radiusKm: 28,
            intensity: 0.85,
            blobs: [
              { dx: 0, dy: 0, r: 1.0, power: 0.85 },
              { dx: 8, dy: -6, r: 0.7, power: 0.75 },
              { dx: -10, dy: 10, r: 0.8, power: 0.65 },
              { dx: 4, dy: 14, r: 0.6, power: 0.55 },
              { dx: -14, dy: -8, r: 0.5, power: 0.5 }
            ]
          },
          // 2. Far East Storm Front (Hapur / Bulandshahr / Meerut East - Intense storm)
          {
            lat: centerLat + 0.08 + Math.sin(t * 0.0012 + 1) * 0.02,
            lon: centerLon + 0.58 + Math.cos(t * 0.0012 + 1) * 0.02,
            radiusKm: 38,
            intensity: 1.0,
            blobs: [
              { dx: 0, dy: 0, r: 1.1, power: 1.0 },
              { dx: -6, dy: -18, r: 0.9, power: 0.95 },
              { dx: 8, dy: -32, r: 0.85, power: 0.85 },
              { dx: 2, dy: 18, r: 0.9, power: 0.9 },
              { dx: -4, dy: 34, r: 0.8, power: 0.75 },
              { dx: -18, dy: -6, r: 0.75, power: 0.6 },
              { dx: 14, dy: 4, r: 0.8, power: 0.7 }
            ]
          },
          // 3. Southwest Cell (Gurgaon / Manesar area)
          {
            lat: centerLat - 0.28 + Math.sin(t * 0.0015 + 2) * 0.012,
            lon: centerLon - 0.35 + Math.cos(t * 0.0015 + 2) * 0.012,
            radiusKm: 24,
            intensity: 0.75,
            blobs: [
              { dx: 0, dy: 0, r: 0.9, power: 0.75 },
              { dx: -8, dy: 8, r: 0.7, power: 0.65 },
              { dx: 10, dy: -10, r: 0.65, power: 0.6 },
              { dx: 6, dy: 12, r: 0.5, power: 0.5 }
            ]
          },
          // 4. North/Meerut fringes
          {
            lat: centerLat + 0.45 + Math.sin(t * 0.001 + 3) * 0.01,
            lon: centerLon + 0.22 + Math.cos(t * 0.001 + 3) * 0.01,
            radiusKm: 22,
            intensity: 0.7,
            blobs: [
              { dx: 0, dy: 0, r: 0.85, power: 0.7 },
              { dx: 12, dy: -4, r: 0.6, power: 0.55 },
              { dx: -10, dy: 6, r: 0.55, power: 0.5 }
            ]
          }
        ];

        // Draw each radar precipitation cell
        cells.forEach(cell => {
          const pt = this._map.latLngToContainerPoint([cell.lat, cell.lon]);
          // Approximate pixel radius based on map zoom
          const edgePt = this._map.latLngToContainerPoint([cell.lat, cell.lon + 0.1]);
          const scale = Math.abs(edgePt.x - pt.x) * 10;

          cell.blobs.forEach(b => {
            const bx = pt.x + (b.dx * scale * 0.035);
            const by = pt.y + (b.dy * scale * 0.035);
            const br = Math.max(15, b.r * scale * 0.5);

            const radGrad = ctx.createRadialGradient(bx, by, br * 0.05, bx, by, br);

            if (b.power >= 0.9) {
              // Heavy / Severe Storm (Red -> Orange -> Yellow -> Green -> Cyan)
              radGrad.addColorStop(0, 'rgba(185, 28, 28, 0.92)');     // Deep Crimson
              radGrad.addColorStop(0.25, 'rgba(220, 38, 38, 0.88)');   // Red
              radGrad.addColorStop(0.45, 'rgba(234, 88, 12, 0.82)');   // Orange
              radGrad.addColorStop(0.65, 'rgba(234, 179, 8, 0.75)');   // Yellow
              radGrad.addColorStop(0.82, 'rgba(34, 197, 94, 0.65)');   // Green
              radGrad.addColorStop(0.94, 'rgba(14, 165, 233, 0.45)');  // Cyan
              radGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
            } else if (b.power >= 0.7) {
              // Moderate to Heavy (Orange -> Yellow -> Green -> Cyan)
              radGrad.addColorStop(0, 'rgba(249, 115, 22, 0.85)');    // Orange
              radGrad.addColorStop(0.35, 'rgba(234, 179, 8, 0.78)');   // Yellow
              radGrad.addColorStop(0.65, 'rgba(34, 197, 94, 0.68)');   // Green
              radGrad.addColorStop(0.85, 'rgba(14, 165, 233, 0.45)');  // Cyan
              radGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
            } else if (b.power >= 0.55) {
              // Moderate (Yellow -> Green -> Cyan)
              radGrad.addColorStop(0, 'rgba(234, 179, 8, 0.75)');     // Yellow
              radGrad.addColorStop(0.45, 'rgba(34, 197, 94, 0.65)');   // Green
              radGrad.addColorStop(0.8, 'rgba(14, 165, 233, 0.4)');    // Cyan
              radGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
            } else {
              // Light Rain (Green -> Cyan)
              radGrad.addColorStop(0, 'rgba(34, 197, 94, 0.6)');      // Green
              radGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.38)');   // Cyan
              radGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
            }

            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      }
    });

    const radarLayer = new CanvasRadarLayer();
    radarLayer.addTo(map);

    mapInstanceRef.current = map;
    markerRef.current = marker;
    canvasLayerRef.current = radarLayer;

    // Smooth Radar Animation Loop
    let lastT = performance.now();
    const animate = (time) => {
      animTimeRef.current = time;
      if (time - lastT > 50) {
        lastT = time;
        if (canvasLayerRef.current) {
          canvasLayerRef.current.draw();
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Update Marker & Fly to location when coordinates change
  useEffect(() => {
    if (!mapInstanceRef.current || !location) return;
    const lat = Number(location.latitude) || 28.58;
    const lon = Number(location.longitude) || 77.33;

    mapInstanceRef.current.flyTo([lat, lon], 9.5, { duration: 1.2 });

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lon]);
      const customIcon = L.divIcon({
        className: 'weather-map-clean-marker',
        html: `
          <div style="display: flex; align-items: center; gap: 7px; white-space: nowrap; transform: translate(-8px, -8px); pointer-events: none;">
            <div style="width: 15px; height: 15px; background: #1a73e8; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.4); flex-shrink: 0;"></div>
            <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; text-shadow: -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff, 0 1px 4px rgba(255,255,255,0.9); font-family: system-ui, -apple-system, sans-serif; letter-spacing: -0.01em;">
              ${location.name || 'Noida'}
            </span>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
      markerRef.current.setIcon(customIcon);
    }
    if (canvasLayerRef.current) {
      canvasLayerRef.current.draw();
    }
  }, [location?.latitude, location?.longitude, location?.name, location]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleTargetLocation = () => {
    if (onRecenter) {
      onRecenter();
    } else if (mapInstanceRef.current && location) {
      mapInstanceRef.current.flyTo([location.latitude, location.longitude], 9.5, { duration: 1 });
    }
  };

  return (
    <div className="relative isolate z-0 w-full h-[330px] sm:h-[370px] rounded-xl overflow-hidden border border-slate-200 bg-[#eef3f0] shadow-sm">
      {/* Real Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Control Box (Top-Left) Matching User's Image Exactly */}
      <div className="absolute top-3 left-3 z-[400] flex flex-col bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 flex items-center justify-center text-slate-800 hover:bg-slate-100 font-bold text-lg leading-none border-b border-slate-100 transition-colors cursor-pointer"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 flex items-center justify-center text-slate-800 hover:bg-slate-100 font-bold text-lg leading-none border-b border-slate-100 transition-colors cursor-pointer"
        >
          −
        </button>
        <button
          type="button"
          onClick={handleTargetLocation}
          title="Center on My Location"
          className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="1" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="23" y2="12" />
          </svg>
        </button>
      </div>

      {/* Floating Legend Card (Bottom-Right) Matching User's Image Exactly */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/90 shadow-md text-xs">
        <span className="text-[11px] font-bold text-slate-800 block mb-1.5">
          Rainfall Intensity
        </span>
        <div className="w-36 sm:w-44 h-2 rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] via-[#eab308] via-[#f97316] to-[#dc2626] mb-1 shadow-2xs" />
        <div className="flex justify-between text-[10px] text-slate-500 font-medium px-0.5">
          <span>Light</span>
          <span>Moderate</span>
          <span>Heavy</span>
        </div>
      </div>
    </div>
  );
}
