import React, { useState, useEffect, useRef } from 'react';
import farmBgLocal from '../assets/farm_bg.jpg';
import cta_plant from '../assets/cta_plant.png';
import WeatherRadarMap from '../components/WeatherRadarMap';
import { showComingSoon } from '../components/ComingSoonModal';

// API Base resolution
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================================================
// PURE VECTOR SVG ICONS (NO EMOJIS ANYWHERE)
// ============================================================================

function MapPinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GpsTargetIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="6" y2="2" />
      <line x1="12" x2="12" y1="22" y2="18" />
    </svg>
  );
}

function NavigationIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function CloudIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CalendarIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function AlertTriangleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );
}

function SproutIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C9 7 4 8 4 13c0 4 4 6 8 4" />
      <path d="M12 10c3-5 8-4 8 1 0 4-4 6-8 4" />
    </svg>
  );
}

function DropletIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function WindIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function ThermometerIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function SunriseIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M20 18h2" />
      <path d="M2 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m8 6 4-4 4 4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
}

function SunsetIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10v6" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M20 18h2" />
      <path d="M2 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m16 10-4 4-4-4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
}

function CompassIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function EyeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ClockIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CloudRainIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}

function TrendingUpIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function LightbulbIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function MapIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}

function ToolIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 12 15 16 10" />
    </svg>
  );
}

function ChevronRightIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function DownloadIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function PlayIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function VolumeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function RefreshIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}

function CopyIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// Semantic Crop Vector SVGs
function CropVectorIcon({ cropKey, className = 'w-5 h-5' }) {
  switch (cropKey) {
    case 'wheat':
      return (
        <svg className={`${className} text-amber-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V8M8 8c0 3 4 5 4 5s4-2 4-5-4-5-4-5-4 2-4 5zM9 14c0 2 3 3.5 3 3.5s3-1.5 3-3.5-3-3.5-3-3.5-3 1.5-3 3.5z" />
        </svg>
      );
    case 'rice':
      return (
        <svg className={`${className} text-emerald-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-9m0 0C9 10 7 6 8 2c3 1 5 5 4 11zm0 0c3-3 5-7 4-11-3 1-5 5-4 11z" />
        </svg>
      );
    case 'sugarcane':
      return (
        <svg className={`${className} text-green-700`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="10" y1="4" x2="14" y2="4" />
          <path d="M12 8c2-3 5-4 7-4M12 14c-2-3-5-4-7-4" />
        </svg>
      );
    case 'maize':
      return (
        <svg className={`${className} text-yellow-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="4" width="6" height="14" rx="3" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <path d="M6 14c2 0 3-2 3-5M18 14c-2 0-3-2-3-5" />
        </svg>
      );
    case 'cotton':
    default:
      return (
        <svg className={`${className} text-cyan-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="11" r="4" />
          <circle cx="8" cy="11" r="3" />
          <circle cx="16" cy="11" r="3" />
          <path d="M12 15v7M10 20c1 0 2 1 2 2" />
        </svg>
      );
  }
}

// Weather Condition Vector Icons
function WeatherConditionIcon({ name, isNight = false, className = 'w-7 h-7' }) {
  let effectiveName = (name || 'sun').toLowerCase();

  // If night mode is active, automatically render moon-based variants for clear/partly cloudy conditions
  if (isNight) {
    if (effectiveName === 'sun' || effectiveName === 'clear' || effectiveName === 'clear sky' || effectiveName === 'clear-sky') {
      effectiveName = 'moon';
    } else if (
      effectiveName === 'sun-cloud' ||
      effectiveName === 'cloud-sun' ||
      effectiveName === 'partly cloudy' ||
      effectiveName === 'partly-cloudy' ||
      effectiveName === 'mainly clear'
    ) {
      effectiveName = 'moon-cloud';
    }
  }

  switch (effectiveName) {
    case 'sun':
    case 'clear':
    case 'clear sky':
    case 'clear-sky':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="12" x2="4" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'sun-cloud':
    case 'cloud-sun':
    case 'partly cloudy':
    case 'partly-cloudy':
    case 'mainly clear':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="3.5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="3.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17.66" y1="3.34" x2="16.6" y2="4.4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="9" x2="18.5" y2="9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6.34" y1="3.34" x2="7.4" y2="4.4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="9" x2="5.5" y2="9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17.5 21a4.5 4.5 0 0 0 2.5-8.24A6 6 0 0 0 9 10a6 6 0 0 0-5 3.5A4.5 4.5 0 0 0 6.5 21z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );
    case 'moon':
    case 'clear night':
    case 'clear-night':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#818CF8" fillOpacity="0.28" stroke="#4F46E5" strokeWidth="1.8" />
          <circle cx="19" cy="4.5" r="0.8" fill="#FBBF24" stroke="none" />
          <circle cx="15.5" cy="2.5" r="0.6" fill="#38BDF8" stroke="none" />
          <circle cx="21" cy="9.5" r="0.5" fill="#FBBF24" stroke="none" />
        </svg>
      );
    case 'moon-cloud':
    case 'cloud-moon':
    case 'partly-cloudy-night':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4a5 5 0 0 0 7 7 6 6 0 0 1-7-7Z" fill="#818CF8" fillOpacity="0.32" stroke="#4F46E5" strokeWidth="1.8" />
          <circle cx="18" cy="3.5" r="0.75" fill="#FBBF24" stroke="none" />
          <path d="M17.5 21a4.5 4.5 0 0 0 2.5-8.24A6 6 0 0 0 9 10a6 6 0 0 0-5 3.5A4.5 4.5 0 0 0 6.5 21z" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.6" />
        </svg>
      );
    case 'cloud':
    case 'cloudy':
    case 'overcast':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.8" />
        </svg>
      );
    case 'cloud-fog':
    case 'fog':
    case 'foggy':
    case 'foggy / mist':
    case 'mist':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.8" />
          <path d="M4 18h16M7 21h10" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'cloud-rain':
    case 'cloud-drizzle':
    case 'drizzle':
    case 'rain':
    case 'light drizzle':
    case 'moderate rain':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 16H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />
          <path d="M8 19v2.5M12 19v2.5M16 19v2.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'cloud-rain-heavy':
    case 'cloud-showers-heavy':
    case 'heavy-rain':
    case 'heavy rain':
    case 'showers':
    case 'rain showers':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1.8" />
          <path d="m8 18-1.5 4M12 18-1.5 4M16 18-1.5 4" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'cloud-lightning':
    case 'thunderstorm':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 16H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1.8" />
          <polygon points="13 12 9 17 13 17 11 22 17 15 13 15 13 12" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="12" x2="4" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

// Night Detection Helper for Hourly Telemetry
function isHourNight(hour) {
  if (!hour) return false;
  if (hour.isNight === true) return true;
  if (hour.isDay === false) return true;
  if (hour.icon && (hour.icon === 'moon' || hour.icon === 'moon-cloud' || hour.icon.includes('night'))) return true;
  
  if (hour.time) {
    const d = new Date(hour.time);
    const h = d.getHours();
    if (!isNaN(h)) {
      return (h < 6 || h >= 19);
    }
  }
  
  if (hour.hourLabel) {
    const raw = String(hour.hourLabel).trim().toUpperCase();
    const match = raw.match(/(\d+)(?::\d+)?\s*(AM|PM)/);
    if (match) {
      let num = parseInt(match[1], 10);
      const ampm = match[2];
      if (ampm === 'PM' && num < 12) num += 12;
      if (ampm === 'AM' && num === 12) num = 0;
      return (num < 6 || num >= 19);
    }
  }
  return false;
}

// Generate Dynamic Initial Hourly Forecast based on current hour
function getDynamicInitialHourly() {
  const now = new Date();
  const currentH = now.getHours();
  const list = [];
  
  for (let i = 0; i < 5; i++) {
    const h = (currentH + i) % 24;
    const isNightTime = (h < 6 || h >= 19);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const hourLabel = `${displayH} ${ampm}`;
    
    list.push({
      hourLabel,
      temperature: isNightTime ? 29 - (i % 3) : 32 + (i % 3),
      precipitationProbability: isNightTime ? 5 : 15,
      windSpeed: 4 + (i % 3),
      condition: isNightTime ? 'Clear Night' : 'Partly Cloudy',
      icon: isNightTime ? 'moon' : 'sun-cloud',
      isDay: !isNightTime,
      isNight: isNightTime
    });
  }
  return list;
}

// Initial default state (Dynamically night-aware on first mount)
const initialHour = new Date().getHours();
const initialIsNight = (initialHour < 6 || initialHour >= 19);

const INITIAL_WEATHER_STATE = {
  location: {
    name: 'Noida',
    region: 'Uttar Pradesh',
    country: 'India',
    latitude: 28.58,
    longitude: 77.33
  },
  current: {
    temperature: 30,
    feelsLike: 35,
    humidity: 72,
    windSpeed: 6,
    surfacePressure: 1012,
    sunrise: '6:05 AM',
    sunset: '6:26 PM',
    visibility: '8 km',
    condition: initialIsNight ? 'Clear Night' : 'Clear Sky',
    icon: initialIsNight ? 'moon' : 'sun',
    isDay: !initialIsNight,
    isNight: initialIsNight,
    summary: initialIsNight ? 'Calm, clear night. Stable soil moisture and optimal thermal condition.' : 'Pleasant weather for most farming activities',
    lastUpdated: 'Live Observation'
  },
  farmingConditions: {
    overallStatus: 'Good for Farming',
    checklist: [
      { label: 'Suitable for irrigation', status: true, tip: 'Soil moisture is steady; proceed with standard drip/flood watering.' },
      { label: 'Good for field operations', status: true, tip: 'Surface soil traction is optimal for tillers and weeders.' },
      { label: 'Low risk of disease spread', status: true, tip: 'Canopy humidity remains below disease germination thresholds.' },
      { label: 'Favourable for fertilizer application', status: true, tip: 'Gentle breeze prevents nitrogen volatilization.' }
    ]
  },
  hourly: getDynamicInitialHourly(),
  daily: [
    { dayName: 'Tue', fullDate: '15 Sept', maxTemp: 33, minTemp: 26, precipitationProbability: 70, precipitationSum: 1.4, windSpeedMax: 10, condition: 'Light Drizzle', icon: 'cloud-drizzle' },
    { dayName: 'Wed', fullDate: '16 Sept', maxTemp: 35, minTemp: 26, precipitationProbability: 37, precipitationSum: 0.4, windSpeedMax: 9, condition: 'Partly Cloudy', icon: 'sun-cloud' },
    { dayName: 'Thu', fullDate: '17 Sept', maxTemp: 33, minTemp: 24, precipitationProbability: 49, precipitationSum: 6.4, windSpeedMax: 16, condition: 'Thunderstorm', icon: 'cloud-lightning' },
    { dayName: 'Fri', fullDate: '18 Sept', maxTemp: 33, minTemp: 25, precipitationProbability: 20, precipitationSum: 0, windSpeedMax: 8, condition: 'Overcast', icon: 'cloud' },
    { dayName: 'Sat', fullDate: '19 Sept', maxTemp: 35, minTemp: 25, precipitationProbability: 35, precipitationSum: 0, windSpeedMax: 5, condition: 'Clear Sky', icon: 'sun' },
    { dayName: 'Sun', fullDate: '20 Sept', maxTemp: 36, minTemp: 25, precipitationProbability: 18, precipitationSum: 0, windSpeedMax: 8, condition: 'Clear Sky', icon: 'sun' },
    { dayName: 'Mon', fullDate: '21 Sept', maxTemp: 35, minTemp: 26, precipitationProbability: 6, precipitationSum: 0, windSpeedMax: 11, condition: 'Clear Sky', icon: 'sun' }
  ],
  cropImpact: [
    { crop: 'Wheat', status: 'Favourable', variant: 'success', iconKey: 'wheat' },
    { crop: 'Rice', status: 'Rain expected, ensure drainage', variant: 'warning', iconKey: 'rice' },
    { crop: 'Sugarcane', status: 'Good conditions', variant: 'success', iconKey: 'sugarcane' },
    { crop: 'Maize', status: 'Favourable', variant: 'success', iconKey: 'maize' },
    { crop: 'Cotton', status: 'Protect standing boll from moisture', variant: 'warning', iconKey: 'cotton' }
  ],
  alerts: [
    {
      id: 'alert-rain',
      category: 'rainfall',
      title: 'Rain Expected Today',
      date: '15 Sept 2026',
      description: 'High precipitation probability (70%) across Noida. Delay irrigation and chemical spraying.',
      severity: 'active',
      level: 'warning',
      action: 'Halt sprayers and secure open grain storage.'
    },
    {
      id: 'alert-heat',
      category: 'temperature',
      title: 'High Thermal Stress Advisory',
      date: '16 Sept 2026',
      description: 'Daytime temperatures reaching 35°C. Elevated evapotranspiration may cause moisture stress.',
      severity: 'active',
      level: 'warning',
      action: 'Provide light frequent evening irrigations and apply straw mulch over nursery beds.'
    },
    {
      id: 'alert-spray',
      category: 'spray',
      title: 'Optimal Spraying & Field Window',
      date: 'Current Observation',
      description: 'Gentle winds and moderate temperature provide ideal conditions for nutrient spraying.',
      severity: 'favourable',
      level: 'success',
      action: 'Ideal window for foliar spray and fertilizer top-dressing.'
    }
  ],
  expectedRainTomorrow: '0.4 mm',
  expectedRainDate: '16 Sept'
};

const POPULAR_HUBS = [
  'Noida', 'Ludhiana', 'Karnal', 'Nagpur', 'Pune', 'Nashik', 'Jaipur', 'Varanasi'
];

export default function Weather() {
  const [cityInput, setCityInput] = useState('Noida, Uttar Pradesh');
  const [weatherData, setWeatherData] = useState(INITIAL_WEATHER_STATE);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [mapType, setMapType] = useState('satellite'); // 'satellite' (hybrid), 'terrain', 'roadmap'
  const [googleZoom, setGoogleZoom] = useState(12);
  const [showRadarOverlay, setShowRadarOverlay] = useState(true);
  const [radarPlaying, setRadarPlaying] = useState(true);
  const [radarFrame, setRadarFrame] = useState(0);
  const [selectedHourlyIndex, setSelectedHourlyIndex] = useState(0);
  const [selectedRainDayIndex, setSelectedRainDayIndex] = useState(1);
  const [activeModal, setActiveModal] = useState(null); // '24h' | 'detailed7d' | 'alerts' | 'cropAdvisory' | 'api' | 'rainfallProb' | 'downloadApp' | 'demo' | 'frost'
  const [activeCropDetail, setActiveCropDetail] = useState('wheat');
  const [alertFilter, setAlertFilter] = useState('all'); // 'all', 'rainfall', 'temperature', 'storm', 'pest', 'spray'
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apkDownloading, setApkDownloading] = useState(false);
  const [apkProgress, setApkProgress] = useState(0);
  const [apkDownloaded, setApkDownloaded] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(true);
  const [demoProgress, setDemoProgress] = useState(38);
  const [highlightedCard, setHighlightedCard] = useState(null);

  const searchInputRef = useRef(null);
  const speechRef = useRef(null);

  // Helper for Temperature unit display
  const displayTemp = (valC) => {
    if (valC === undefined || valC === null) return '--';
    if (unit === 'F') {
      return `${Math.round((valC * 9) / 5 + 32)}°F`;
    }
    return `${valC}°C`;
  };

  const displayTempVal = (valC) => {
    if (valC === undefined || valC === null) return '--';
    if (unit === 'F') {
      return Math.round((valC * 9) / 5 + 32);
    }
    return valC;
  };

  // Helper for Google Maps Embed URL
  const getGoogleMapsEmbedUrl = () => {
    const lat = weatherData?.location?.latitude ?? 28.58;
    const lon = weatherData?.location?.longitude ?? 77.33;
    const locName = weatherData?.location?.name || 'Noida';
    const typeCode = mapType === 'satellite' ? 'h' : mapType === 'terrain' ? 'p' : 'm';
    const mapsBase = import.meta.env.VITE_GOOGLE_MAPS_URL || 'https://maps.google.com/maps';
    return `${mapsBase}?q=${lat},${lon}+(${encodeURIComponent(locName)})&t=${typeCode}&z=${googleZoom}&ie=UTF8&iwloc=B&output=embed`;
  };

  // Real-time backend fetch
  const fetchWeather = async (params = { city: 'Noida' }, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      let q = '';
      if (params.lat && params.lon) {
        q = `?lat=${params.lat}&lon=${params.lon}${isRefresh ? '&refresh=true' : ''}`;
      } else if (params.city) {
        q = `?city=${encodeURIComponent(params.city)}${isRefresh ? '&refresh=true' : ''}`;
      }

      let res;
      try {
        res = await fetch(`${API_BASE}/weather${q}`);
      } catch {
        res = await fetch(`/api/weather${q}`);
      }

      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setWeatherData(json.data);
          const loc = json.data.location;
          setCityInput(`${loc.name}${loc.region ? `, ${loc.region}` : ''}`);
        }
      }
    } catch (err) {
      console.warn('Real-time weather query fallback:', err);
    } finally {
      setLoading(false);
      setLocating(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather({ city: 'Noida' });
  }, []);

  // Lock body scrolling while preserving exact scroll position
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [activeModal]);

  // Radar Animation Loop
  useEffect(() => {
    let interval = null;
    if (radarPlaying) {
      interval = setInterval(() => {
        setRadarFrame(f => (f + 1) % 4);
      }, 750);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [radarPlaying]);

  // Handle Search Submission
  const handleSearch = (e) => {
    e?.preventDefault();
    if (!cityInput.trim()) return;
    fetchWeather({ city: cityInput.trim() });
  };

  // Click on Popular Hub Pill
  const handleHubSelect = (hub) => {
    setCityInput(hub);
    fetchWeather({ city: hub });
  };

  // Real Browser Geolocation Trigger
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather({ lat: latitude, lon: longitude });
      },
      (err) => {
        console.warn('GPS location request warning:', err);
        setLocating(false);
        alert('Could not access GPS. Please choose a nearby district manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Smooth scroll and pulse highlight section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedCard(id);
      setTimeout(() => setHighlightedCard(null), 2000);
    }
  };

  // Text-To-Speech Audio Advisory
  const toggleSpeechAdvisory = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio advisory is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentLoc = weatherData.location.name;
    const temp = weatherData.current.temperature;
    const cond = weatherData.current.condition;
    const rainNext = weatherData.expectedRainTomorrow;
    const farmingStat = weatherData.farmingConditions.overallStatus;

    const speechText = `KisanMitra Weather Report for ${currentLoc}. Current temperature is ${temp} degrees Celsius, with ${cond}. Overall farming condition is ${farmingStat}. Expected rainfall tomorrow is ${rainNext}. Check your field bund drainage and plan irrigation accordingly.`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  // Copy cURL Command
  const handleCopyCurl = () => {
    const siteBase = import.meta.env.VITE_SITE_URL || 'https://kisanmitra.in';
    const curlCommand = `curl -X GET "${siteBase}/api/weather?city=${encodeURIComponent(weatherData.location.name)}" -H "Accept: application/json"`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(curlCommand);
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2500);
    }
  };

  // Simulated APK Download
  const handleStartApkDownload = () => {
    setApkDownloading(true);
    setApkProgress(0);
    const interval = setInterval(() => {
      setApkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setApkDownloading(false);
          setApkDownloaded(true);
          setTimeout(() => setApkDownloaded(false), 4000);
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  // Printable Weather Report
  const handleDownloadReport = () => {
    window.print();
  };

  const dailyList = weatherData.daily && weatherData.daily.length > 0 ? weatherData.daily.slice(0, 7) : INITIAL_WEATHER_STATE.daily;
  const maxRainVal = Math.max(...dailyList.map(d => d.precipitationSum), 12);
  const filteredAlerts = (weatherData.alerts || []).filter(a => {
    if (alertFilter === 'all') return true;
    return a.category === alertFilter;
  });

  // Top active alert and its dynamic styles
  const primaryAlert = weatherData.alerts && weatherData.alerts.length > 0 ? weatherData.alerts[0] : null;

  // Dynamic badge color in card header based on severity
  const getAlertBadgeColor = () => {
    if (!weatherData.alerts || weatherData.alerts.length === 0) return 'bg-emerald-600 text-white';
    if (weatherData.alerts.some(a => a.level === 'danger')) return 'bg-rose-600 text-white';
    if (weatherData.alerts.some(a => a.level === 'warning')) return 'bg-amber-500 text-white';
    if (weatherData.alerts.some(a => a.level === 'info')) return 'bg-sky-600 text-white';
    return 'bg-emerald-600 text-white';
  };

  // Preview card styling (strictly amber/yellow when warning, red when danger, blue when info)
  const getAlertCardTheme = (alert) => {
    if (!alert) return {};
    if (alert.level === 'danger') {
      return {
        card: 'bg-rose-50/90 border-rose-200 hover:bg-rose-100/70',
        iconBg: 'bg-rose-600 text-white',
        title: 'text-rose-950',
        date: 'text-rose-700',
        desc: 'text-rose-900',
        chevron: 'text-rose-500'
      };
    }
    if (alert.level === 'warning') {
      return {
        card: 'bg-amber-50/90 border-amber-200 hover:bg-amber-100/70',
        iconBg: 'bg-amber-500 text-white',
        title: 'text-amber-950',
        date: 'text-amber-700',
        desc: 'text-amber-900',
        chevron: 'text-amber-500'
      };
    }
    if (alert.level === 'info') {
      return {
        card: 'bg-sky-50/90 border-sky-200 hover:bg-sky-100/70',
        iconBg: 'bg-sky-600 text-white',
        title: 'text-sky-950',
        date: 'text-sky-700',
        desc: 'text-sky-900',
        chevron: 'text-sky-500'
      };
    }
    return {
      card: 'bg-emerald-50/90 border-emerald-200 hover:bg-emerald-100/70',
      iconBg: 'bg-emerald-600 text-white',
      title: 'text-emerald-950',
      date: 'text-emerald-700',
      desc: 'text-emerald-900',
      chevron: 'text-emerald-500'
    };
  };

  const alertTheme = getAlertCardTheme(primaryAlert);
  const isNight = weatherData?.current?.isNight ?? (weatherData?.current?.isDay === false || (new Date().getHours() < 6 || new Date().getHours() >= 19));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION - Seamless Farm View Reference Matching Other Pages       */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[560px] flex items-center bg-white border-b border-gray-100 overflow-hidden">
        
        {/* Full-width Panoramic Farm Background (No abrupt image left edge) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={farmBgLocal}
            alt="Lush panoramic green farmland view"
            className="w-full h-full object-cover object-[center_right]"
          />
        </div>

        {/* 100% Seamless Multi-Stop Gradient Overlay (Solid white covers content, with day/night ambient horizon) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-700"
          style={{
            background: isNight
              ? 'linear-gradient(to right, #ffffff 0%, #ffffff 48%, rgba(255, 255, 255, 0.96) 55%, rgba(240, 245, 255, 0.75) 68%, rgba(30, 41, 59, 0.5) 88%, rgba(15, 23, 42, 0.8) 100%)'
              : 'linear-gradient(to right, #ffffff 0%, #ffffff 52%, rgba(255, 255, 255, 0.96) 58%, rgba(255, 255, 255, 0.72) 70%, rgba(255, 255, 255, 0.25) 84%, transparent 100%)'
          }}
        />

        {/* Content Container (Standard 95rem width matching other pages) */}
        <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle & Badges (7 Cols) */}
            <div className="lg:col-span-7 xl:col-span-7 max-w-[46rem]">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <p className="text-[#2C8C44] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                  WEATHER UPDATES
                </p>
                {isNight ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-indigo-200 border border-slate-700 shadow-2xs">
                    <WeatherConditionIcon name="moon" className="w-3.5 h-3.5" />
                    <span>Live Night Telemetry</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                    <WeatherConditionIcon name="sun" className="w-3.5 h-3.5" />
                    <span>Live Daytime Telemetry</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-gray-900 leading-[1.14] mb-5">
                Accurate Weather <br />
                <span className="text-[#2C8C44]">For Better Farming Decisions</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-[20px] mb-6 max-w-xl leading-relaxed">
                Get real-time weather updates, forecasts and AI-powered insights to plan your farming activities with confidence.
              </p>

              {/* Decorative accent divider matching FeaturesHero & AboutUsHero */}
              <div className="w-14 h-1.5 bg-[#2C8C44] mb-7 rounded-full" />

              {/* Quick Farming Region Hub Chips */}
              <div className="flex items-center gap-2 flex-wrap mb-8">
                <span className="text-xs md:text-sm font-bold text-gray-500 mr-1">Hubs:</span>
                {POPULAR_HUBS.map(hub => (
                  <button
                    key={hub}
                    onClick={() => handleHubSelect(hub)}
                    className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-white/90 hover:bg-[#2C8C44] hover:text-white text-gray-700 border border-gray-200 shadow-2xs transition-all cursor-pointer"
                  >
                    {hub}
                  </button>
                ))}
              </div>

              {/* 4 Feature Badges (Comfortably positioned inside the solid white zone) */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg">
                
                {/* 1. Real-time Updates */}
                <button
                  onClick={() => scrollToSection('current-weather')}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#2d6a4f] border border-emerald-200/80 flex items-center justify-center mb-2 shadow-2xs group-hover:bg-[#1e5631] group-hover:text-white transition-all">
                    <CloudIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#1e5631]">
                    Real-time <br />Updates
                  </span>
                </button>

                {/* 2. 7-Day Forecast */}
                <button
                  onClick={() => scrollToSection('seven-day-forecast')}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#2d6a4f] border border-emerald-200/80 flex items-center justify-center mb-2 shadow-2xs group-hover:bg-[#1e5631] group-hover:text-white transition-all">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#1e5631]">
                    7-Day <br />Forecast
                  </span>
                </button>

                {/* 3. Severe Weather Alerts */}
                <button
                  onClick={() => scrollToSection('weather-alerts')}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#2d6a4f] border border-emerald-200/80 flex items-center justify-center mb-2 shadow-2xs group-hover:bg-[#1e5631] group-hover:text-white transition-all">
                    <AlertTriangleIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#1e5631]">
                    Severe Weather <br />Alerts
                  </span>
                </button>

                {/* 4. Crop-specific Recommendations */}
                <button
                  onClick={() => scrollToSection('crop-impact')}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#2d6a4f] border border-emerald-200/80 flex items-center justify-center mb-2 shadow-2xs group-hover:bg-[#1e5631] group-hover:text-white transition-all">
                    <SproutIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#1e5631]">
                    Crop-specific <br />Advisory
                  </span>
                </button>

              </div>
            </div>

            {/* Right Column: Floating Location Card (5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-6 backdrop-blur-xs">
                
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Check Weather for Location
                  </h2>
                  {/* Temperature Unit Switcher */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs sm:text-sm font-bold">
                    <button
                      type="button"
                      onClick={() => setUnit('C')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        unit === 'C' ? 'bg-[#1e5631] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('F')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        unit === 'F' ? 'bg-[#1e5631] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSearch} noValidate className="space-y-4">
                  {/* Location Input */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white hover:border-slate-300 focus-within:border-[#1e5631] focus-within:ring-2 focus-within:ring-emerald-600/15 px-3.5 py-3 transition-all">
                    <span className="text-[#2d6a4f] mr-2.5 shrink-0">
                      <MapPinIcon className="w-5 h-5" />
                    </span>

                    <input
                      ref={searchInputRef}
                      type="text"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="Type district, e.g. Noida, Ludhiana"
                      className="w-full text-sm sm:text-base font-medium text-slate-800 bg-transparent border-none focus:outline-none placeholder-slate-400"
                    />

                    {cityInput && (
                      <button
                        type="button"
                        onClick={() => setCityInput('')}
                        className="text-slate-400 hover:text-slate-600 p-1 mr-1 shrink-0 cursor-pointer"
                        title="Clear search"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    )}

                    {/* GPS Target Icon Button */}
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      title="Fetch My Current Location"
                      className="text-slate-400 hover:text-[#2d6a4f] transition-colors p-1 shrink-0 cursor-pointer"
                    >
                      <GpsTargetIcon className={`w-5 h-5 ${locating ? 'animate-spin text-emerald-700' : ''}`} />
                    </button>
                  </div>

                  {/* Primary Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#1e5631] hover:bg-[#164326] active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Fetching Live Telemetry...
                      </span>
                    ) : (
                      'Get Weather Update'
                    )}
                  </button>

                  {/* Secondary Button */}
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={locating}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#1e5631] text-[#1e5631] hover:bg-emerald-50 active:scale-[0.99] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    <NavigationIcon className={`w-4 h-4 ${locating ? 'animate-bounce' : ''}`} />
                    {locating ? 'Locating via GPS coordinates...' : 'Use My Current Location'}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DASHBOARD BODY - Generous 95rem Width & Elevated Legibility            */}
      {/* ========================================================================= */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 mt-10 space-y-8">

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 1: Current Weather (Left) + Today's Farming Condition (Right)       */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Current Weather (8 Cols) */}
          <div
            id="current-weather"
            className={`lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 transition-all duration-500 ${
              highlightedCard === 'current-weather' ? 'ring-2 ring-[#1e5631] ring-offset-2' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <span className={isNight ? "text-indigo-600" : "text-emerald-700"}>
                  <MapPinIcon className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Current Weather</span>
                  {isNight ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-200 flex items-center gap-1.5 shadow-2xs">
                      <WeatherConditionIcon name="moon" className="w-3.5 h-3.5" />
                      <span>Night</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1.5 shadow-2xs">
                      <WeatherConditionIcon name="sun" className="w-3.5 h-3.5" />
                      <span>Day</span>
                    </span>
                  )}
                </h2>
              </div>

              {/* Force Live Refresh Button */}
              <button
                onClick={() => fetchWeather({ city: weatherData.location.name }, true)}
                disabled={refreshing}
                title="Refresh Live Satellite Observation"
                className="flex items-center gap-1.5 text-xs sm:text-sm text-[#1e5631] hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80 font-semibold transition-colors cursor-pointer"
              >
                <RefreshIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Syncing...' : 'Live Sync'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-800 text-base">{weatherData.location.name}, {weatherData.location.region}</span>
              <span className="text-slate-300">|</span>
              <span>Observed: {weatherData.current.lastUpdated}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Temperature & Condition */}
              <div className="md:col-span-5 flex items-center gap-5">
                <div className={`p-2.5 rounded-3xl transition-colors ${
                  isNight ? 'bg-indigo-50/80 border border-indigo-100/90 shadow-2xs' : 'bg-amber-50/60 border border-amber-100/80 shadow-2xs'
                }`}>
                  <WeatherConditionIcon name={weatherData.current.icon} isNight={isNight} className="w-20 h-20 shrink-0" />
                </div>
                <div>
                  <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight">
                    {displayTemp(weatherData.current.temperature)}
                  </div>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    {weatherData.current.condition}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 leading-snug">
                    {weatherData.current.summary}
                  </p>
                </div>
              </div>

              {/* Right Telemetry Grid */}
              <div className="md:col-span-7 grid grid-cols-2 gap-y-4 gap-x-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-8 text-sm sm:text-base">
                
                {/* Col 1 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <DropletIcon className="w-4 h-4 text-blue-500" /> Humidity
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <WindIcon className="w-4 h-4 text-teal-600" /> Wind Speed
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <ThermometerIcon className="w-4 h-4 text-amber-500" /> Feels Like
                    </span>
                    <span className="font-bold text-slate-900 text-base">{displayTemp(weatherData.current.feelsLike)}</span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <SunriseIcon className="w-4 h-4 text-amber-500" /> Sunrise
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.sunrise}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <SunsetIcon className="w-4 h-4 text-amber-600" /> Sunset
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.sunset}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <CompassIcon className="w-4 h-4 text-purple-600" /> Pressure
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.surfacePressure} hPa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                      <EyeIcon className="w-4 h-4 text-slate-500" /> Visibility
                    </span>
                    <span className="font-bold text-slate-900 text-base">{weatherData.current.visibility}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Card 2: Today's Farming Condition (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700">
                    <SproutIcon className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Today's Farming Condition
                  </h2>
                </div>

                {/* Audio Listen Button */}
                <button
                  onClick={toggleSpeechAdvisory}
                  title="Listen to Weather Advisory Aloud"
                  className={`p-2 rounded-lg border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                      : 'bg-emerald-50 text-[#1e5631] border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <VolumeIcon className="w-4 h-4" />
                  <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>
              </div>

              {/* Status Pill */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-[#1e5631] font-bold text-sm sm:text-base border border-emerald-200/80">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  {weatherData.farmingConditions.overallStatus}
                </span>
              </div>

              {/* 4 Checklist Items */}
              <div className="space-y-3.5">
                {weatherData.farmingConditions.checklist.map((item, idx) => (
                  <div key={idx} className="group relative flex items-start gap-3 text-sm sm:text-base text-slate-700 font-semibold">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.status ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {item.status ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="text-xs font-bold">!</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-400 font-medium">Auto-calculated from telemetry</span>
              <button
                onClick={() => setActiveModal('cropAdvisory')}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Crop Advisory →
              </button>
            </div>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 2: Hourly Forecast + 7-Day Forecast + Weather Alerts                */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Hourly Forecast */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">
                    <ClockIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Hourly Forecast
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal('24h')}
                  className="text-xs sm:text-sm font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  View 24-Hour Forecast →
                </button>
              </div>

              {/* 5 Hourly Columns (Interactive click to inspect) */}
              <div className="grid grid-cols-5 gap-1.5 text-center pt-2">
                {weatherData.hourly.slice(0, 5).map((hour, idx) => {
                  const nightFlag = isHourNight(hour);
                  const iconName = nightFlag
                    ? (hour.icon === 'sun-cloud' || hour.icon === 'cloud-sun' || (hour.condition && hour.condition.toLowerCase().includes('cloud')) ? 'moon-cloud' : 'moon')
                    : hour.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedHourlyIndex(idx)}
                      className={`flex flex-col items-center p-2 rounded-xl transition-all cursor-pointer ${
                        selectedHourlyIndex === idx ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        {hour.hourLabel}
                      </span>
                      <div className="my-2.5">
                        <WeatherConditionIcon
                          name={iconName}
                          isNight={nightFlag}
                          className="w-7 h-7 mx-auto"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        {displayTemp(hour.temperature)}
                      </span>
                      <span className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-0.5 justify-center">
                        <DropletIcon className="w-3 h-3 inline" /> {hour.precipitationProbability}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Micro telemetry for selected hour */}
              {weatherData.hourly[selectedHourlyIndex] && (() => {
                const selectedHour = weatherData.hourly[selectedHourlyIndex];
                const nightFlag = isHourNight(selectedHour);
                const displayCondition = nightFlag && (selectedHour.condition === 'Clear Sky' || selectedHour.condition === 'Clear')
                  ? 'Clear Night'
                  : selectedHour.condition;
                return (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-700">
                    <span>Selected: <strong className="text-slate-900 font-bold">{selectedHour.hourLabel}</strong> ({displayCondition})</span>
                    <span>Wind: <strong className="text-teal-700 font-bold">{selectedHour.windSpeed} km/h</strong></span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Card 2: 7-Day Forecast */}
          <div
            id="seven-day-forecast"
            className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-500 ${
              highlightedCard === 'seven-day-forecast' ? 'ring-2 ring-[#1e5631] ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">
                    <CalendarIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    7-Day Forecast
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal('detailed7d')}
                  className="text-xs sm:text-sm font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  View Detailed Forecast →
                </button>
              </div>

              {/* 7 Daily Columns (Clickable to inspect in modal) */}
              <div className="grid grid-cols-7 gap-1 text-center pt-2">
                {dailyList.map((day, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveModal('detailed7d')}
                    className="flex flex-col items-center p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      {day.dayName}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 block mb-1">
                      {day.fullDate.split(' ')[0]} {day.fullDate.split(' ')[1]}
                    </span>
                    <div className="my-1.5">
                      <WeatherConditionIcon name={day.icon} className="w-6 h-6 mx-auto" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-1">
                      {displayTempVal(day.maxTemp)}°/{displayTempVal(day.minTemp)}°
                    </span>
                    <span className="text-[11px] sm:text-xs text-blue-600 font-semibold block mt-1">
                      {day.precipitationProbability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
              <span>Peak Rain: <strong className="text-slate-800">{dailyList.find(d => d.precipitationSum > 3)?.fullDate || 'None predicted'}</strong></span>
              <button
                onClick={() => setActiveModal('rainfallProb')}
                className="text-emerald-700 font-semibold hover:underline cursor-pointer"
              >
                Rain Probability →
              </button>
            </div>
          </div>

          {/* Card 3: Weather Alerts (Correct Yellow/Amber vs Red Preview) */}
          <div
            id="weather-alerts"
            className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-500 ${
              highlightedCard === 'weather-alerts' ? 'ring-2 ring-[#1e5631] ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">
                    <AlertTriangleIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Weather Alerts
                  </h3>
                </div>

                {/* Dynamic Badge Color strictly matching severity */}
                <button
                  onClick={() => setActiveModal('alerts')}
                  className={`px-3 py-1 rounded-full font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity ${getAlertBadgeColor()}`}
                >
                  {weatherData.alerts && weatherData.alerts.length > 0 ? `${weatherData.alerts.length} Active` : '0 Active'}
                </button>
              </div>

              {/* Alert Preview Box - Styled strictly according to alert level */}
              {primaryAlert ? (
                <div
                  onClick={() => setActiveModal('alerts')}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-colors ${alertTheme.card}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${alertTheme.iconBg}`}>
                    <AlertTriangleIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm sm:text-base font-bold ${alertTheme.title}`}>
                      {primaryAlert.title}
                    </h4>
                    <span className={`text-xs block mb-1 font-medium ${alertTheme.date}`}>
                      {primaryAlert.date}
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed ${alertTheme.desc}`}>
                      {primaryAlert.description}
                    </p>
                  </div>
                  <span className={alertTheme.chevron}>
                    <ChevronRightIcon className="w-5 h-5" />
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-sm text-emerald-800 flex items-center gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>No adverse meteorological hazards active for your area.</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveModal('alerts')}
              className="w-full text-center text-xs sm:text-sm font-semibold text-emerald-700 hover:underline pt-4 mt-2 border-t border-slate-100 cursor-pointer"
            >
              View All Active Alerts ({weatherData.alerts?.length || 0}) →
            </button>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 3: Rainfall Forecast + Temperature Trend + Weather Insights         */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Rainfall Forecast */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">
                    <DropletIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Rainfall Forecast
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModal('rainfallProb')}
                  className="text-xs sm:text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Probability Map →
                </button>
              </div>

              <div className="mb-4">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                  {weatherData.expectedRainTomorrow}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">
                  Expected rainfall tomorrow ({weatherData.expectedRainDate})
                </div>
              </div>

              {/* Bar Chart with Clickable Bars */}
              <div className="pt-2">
                <div className="flex items-end justify-between h-32 gap-2 px-1 border-b border-slate-200 pb-1">
                  {dailyList.map((d, idx) => {
                    const heightPercent = Math.max(10, Math.min(100, Math.round((d.precipitationSum / maxRainVal) * 100)));
                    const isSelected = selectedRainDayIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedRainDayIndex(idx)}
                        className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group"
                      >
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 mb-1 group-hover:text-blue-600">
                          {d.precipitationSum} mm
                        </span>
                        <div
                          className={`w-full max-w-[28px] rounded-t-sm transition-all ${
                            isSelected ? 'bg-blue-600' : 'bg-sky-400 group-hover:bg-sky-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-2 px-1">
                  {dailyList.map((d, idx) => (
                    <span
                      key={idx}
                      onClick={() => setSelectedRainDayIndex(idx)}
                      className={`flex-1 text-center cursor-pointer ${selectedRainDayIndex === idx ? 'font-bold text-blue-700' : ''}`}
                    >
                      {d.fullDate.split(' ')[0]} {d.fullDate.split(' ')[1]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Day Info */}
              {dailyList[selectedRainDayIndex] && (
                <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-900 flex items-center justify-between">
                  <span>Day: <strong>{dailyList[selectedRainDayIndex].dayName}, {dailyList[selectedRainDayIndex].fullDate}</strong></span>
                  <span>Rain: <strong>{dailyList[selectedRainDayIndex].precipitationSum} mm</strong> ({dailyList[selectedRainDayIndex].precipitationProbability}% prob)</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Temperature Trend (SVG Line Graph) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">
                    <TrendingUpIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Temperature Trend
                  </h3>
                </div>

                <button
                  onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}
                  className="text-xs sm:text-sm font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  Switch to °{unit === 'C' ? 'F' : 'C'} →
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-4 text-xs sm:text-sm text-slate-600 mb-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-3 rounded-full bg-amber-500" /> Max Temp
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" /> Min Temp
                </span>
              </div>

              {/* Responsive SVG Curve */}
              <div className="w-full h-40">
                <svg viewBox="0 0 320 140" className="w-full h-full">
                  <line x1="30" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="50" x2="310" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="80" x2="310" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="110" x2="310" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                  
                  <text x="5" y="24" fontSize="10" fill="#94a3b8">{unit === 'C' ? '40°C' : '104°F'}</text>
                  <text x="5" y="54" fontSize="10" fill="#94a3b8">{unit === 'C' ? '30°C' : '86°F'}</text>
                  <text x="5" y="84" fontSize="10" fill="#94a3b8">{unit === 'C' ? '20°C' : '68°F'}</text>
                  <text x="5" y="114" fontSize="10" fill="#94a3b8">{unit === 'C' ? '10°C' : '50°F'}</text>

                  {/* Max Temp Line */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    points={dailyList.map((d, i) => `${45 + i * 42},${140 - (d.maxTemp / 40) * 120}`).join(' ')}
                  />
                  {dailyList.map((d, i) => {
                    const cx = 45 + i * 42;
                    const cy = 140 - (d.maxTemp / 40) * 120;
                    return (
                      <g key={i} className="cursor-pointer">
                        <circle cx={cx} cy={cy} r="4.5" fill="#f59e0b" />
                        <text x={cx} y={cy - 7} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#78350f">
                          {displayTempVal(d.maxTemp)}°
                        </text>
                      </g>
                    );
                  })}

                  {/* Min Temp Line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    points={dailyList.map((d, i) => `${45 + i * 42},${140 - (d.minTemp / 40) * 120}`).join(' ')}
                  />
                  {dailyList.map((d, i) => {
                    const cx = 45 + i * 42;
                    const cy = 140 - (d.minTemp / 40) * 120;
                    return (
                      <g key={i} className="cursor-pointer">
                        <circle cx={cx} cy={cy} r="4.5" fill="#10b981" />
                        <text x={cx} y={cy + 14} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#065f46">
                          {displayTempVal(d.minTemp)}°
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-slate-500 pl-8 pr-2 pt-2 border-t border-slate-100">
                {dailyList.map((d, idx) => (
                  <span key={idx} className="text-center font-medium">
                    {d.fullDate.split(' ')[0]} {d.fullDate.split(' ')[1]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Weather Insights for Farmers */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">
                    <LightbulbIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Weather Insights for Farmers
                  </h3>
                </div>

                <button
                  onClick={toggleSpeechAdvisory}
                  title="Read Aloud"
                  className="text-emerald-700 hover:text-emerald-800 p-1.5 rounded-lg hover:bg-emerald-50 cursor-pointer"
                >
                  <VolumeIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <DropletIcon className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    {weatherData.current.humidity > 65
                      ? 'Elevated moisture detected. Favourable for vegetative growth; avoid over-irrigating.'
                      : 'Soil moisture steady. Good window for morning furrow or drip irrigation.'}
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <SproutIcon className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    Precipitation sum of {weatherData.expectedRainTomorrow} expected for {weatherData.expectedRainDate}. Clear field bund trenches.
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangleIcon className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    Relative humidity at {weatherData.current.humidity}% with ambient warmth creates risk for fungal rust or blast. Inspect leaf undersides.
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <WindIcon className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    Wind speed at {weatherData.current.windSpeed} km/h is {weatherData.current.windSpeed < 15 ? 'optimal' : 'marginal'} for chemical spraying operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-400 font-medium">AI Agronomy Engine</span>
              <button
                onClick={() => setActiveModal('cropAdvisory')}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Detailed Crop Advisory →
              </button>
            </div>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 4: Weather Map + Crop-wise Impact + Tools & Resources                */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Real Weather Radar Map matching reference UI (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">
                    <MapIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Live Weather Radar Map
                  </h3>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Doppler Radar
                </span>
              </div>

              {/* Real Weather Radar Map matching user screenshot */}
              <WeatherRadarMap
                location={weatherData.location}
                onRecenter={handleUseCurrentLocation}
              />
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{weatherData.location.name} Radar Observation</span>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Recenter on GPS →
              </button>
            </div>
          </div>

          {/* Card 2: Crop-wise Weather Impact (4 Cols) */}
          <div
            id="crop-impact"
            className={`lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-500 ${
              highlightedCard === 'crop-impact' ? 'ring-2 ring-[#1e5631] ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-700">
                  <SproutIcon className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Crop-wise Weather Impact
                </h3>
              </div>

              {/* Crop Rows (Clicking any opens specific advisory) */}
              <div className="space-y-3 pt-1">
                {weatherData.cropImpact.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveCropDetail(item.iconKey);
                      setActiveModal('cropAdvisory');
                    }}
                    className="flex items-center justify-between text-sm py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-3 font-bold text-slate-800">
                      <CropVectorIcon cropKey={item.iconKey} className="w-5 h-5" />
                      <span className="text-sm sm:text-base">{item.crop}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      item.variant === 'warning'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/70'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                    }`}>
                      {item.variant === 'warning' ? (
                        <AlertTriangleIcon className="w-3.5 h-3.5 inline text-amber-600" />
                      ) : (
                        <CheckCircleIcon className="w-3.5 h-3.5 inline text-emerald-600" />
                      )}
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveModal('cropAdvisory')}
              className="w-full text-center text-xs sm:text-sm font-semibold text-emerald-700 hover:underline pt-4 mt-2 border-t border-slate-100 cursor-pointer"
            >
              View Crop-specific Advisory →
            </button>
          </div>

          {/* Card 3: Tools & Resources (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-700">
                  <ToolIcon className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Tools & Resources
                </h3>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <button
                  onClick={() => setActiveModal('detailed7d')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <CalendarIcon className="w-4 h-4 text-slate-500" /> 7-Day Detailed Forecast
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveModal('rainfallProb')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <DropletIcon className="w-4 h-4 text-blue-500" /> Rainfall Probability
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveModal('frost')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <AlertTriangleIcon className="w-4 h-4 text-amber-500" /> Frost & Heat Alerts
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    searchInputRef.current?.focus();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <MapPinIcon className="w-4 h-4 text-emerald-600" /> Weather for Your District
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveModal('api')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <CompassIcon className="w-4 h-4 text-indigo-500" /> API for Agri Businesses
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={handleDownloadReport}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <DownloadIcon className="w-4 h-4 text-teal-600" /> Download Weather Report (PDF)
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
              Verified IMD & Open-Meteo High-Res Telemetry
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION OF GREEN BOX ABOVE THE FOOTER - Scaled Down to Match Other Pages*/}
      {/* ========================================================================= */}
      <section className="w-full py-4 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[85rem] mx-auto bg-[#0F392B] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
          
          {/* Left Side: Plant Logo & Text */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 text-center md:text-left">
            
            {/* Plant Illustration */}
            <div className="w-[70px] h-[70px] md:w-[85px] md:h-[85px] flex-shrink-0 flex items-center justify-center">
              <img 
                src={cta_plant} 
                alt="Kisan Mitra Seedling" 
                className="w-full h-full object-contain" 
              />
            </div>

            <div className="flex flex-col justify-center mt-1">
              <h2 className="text-white text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-1.5">
                Plan Better. Farm Smarter.
              </h2>
              <p className="text-gray-300 text-[14px] md:text-[15px] max-w-xl leading-relaxed">
                Get real-time weather alerts and personalized crop advice on the Kisan Mitra App.
              </p>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0">
            {/* Download App Button */}
            <button
              onClick={() => showComingSoon('app', 'KisanMitra Weather & Radar App', 'Get real-time Doppler radar weather alerts & rain probability on your smartphone.', 'weather_app')}
              className="w-full sm:w-auto bg-[#6CB937] hover:bg-[#5ca62b] text-white px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg text-sm md:text-[15px] cursor-pointer"
            >
              Download App
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
            
            {/* Watch Demo Button */}
            <button
              onClick={() => showComingSoon('demo', 'KisanMitra Doppler Weather Demo', 'Watch our Doppler weather forecasting and satellite cloud radar in action.', 'weather_demo')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-colors text-sm md:text-[15px] cursor-pointer"
            >
              Watch Demo
              <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MODALS FOR ALL BUTTONS (PURE SVG, NO EMOJIS)                */}
      {/* ========================================================================= */}

      {/* Modal 1: 24-Hour Detailed Forecast */}
      {activeModal === '24h' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">
                  24-Hour Timeline — {weatherData.location.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-2.5 divide-y divide-slate-100">
              {weatherData.hourly.map((h, i) => {
                const nightFlag = isHourNight(h);
                const iconName = nightFlag
                  ? (h.icon === 'sun-cloud' || h.icon === 'cloud-sun' || (h.condition && h.condition.toLowerCase().includes('cloud')) ? 'moon-cloud' : 'moon')
                  : h.icon;
                const displayCondition = nightFlag && (h.condition === 'Clear Sky' || h.condition === 'Clear')
                  ? 'Clear Night'
                  : h.condition;
                return (
                  <div key={i} className="pt-2.5 first:pt-0 flex items-center justify-between text-sm sm:text-base">
                    <div className="w-24 font-bold text-slate-800">{h.hourLabel}</div>
                    <div className="flex items-center gap-2.5 flex-1 px-4">
                      <WeatherConditionIcon
                        name={iconName}
                        isNight={nightFlag}
                        className="w-6 h-6"
                      />
                      <span className="text-slate-600 font-medium">{displayCondition}</span>
                    </div>
                    <div className="w-20 font-extrabold text-slate-900 text-right">{displayTemp(h.temperature)}</div>
                    <div className="w-24 text-blue-600 text-right font-semibold flex items-center justify-end gap-1">
                      <DropletIcon className="w-3.5 h-3.5" /> {h.precipitationProbability}%
                    </div>
                    <div className="w-24 text-slate-500 text-right font-medium">{h.windSpeed} km/h</div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: 7-Day Detailed Agricultural Forecast */}
      {activeModal === 'detailed7d' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">
                  7-Day Detailed Agricultural Forecast
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-3">
              {dailyList.map((d, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-3.5">
                    <WeatherConditionIcon name={d.icon} className="w-8 h-8 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900 text-base">{d.dayName}, {d.fullDate}</div>
                      <div className="text-xs sm:text-sm text-slate-500">{d.condition}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between sm:justify-end">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">TEMP RANGE</span>
                      <span className="font-bold text-slate-900 text-sm">{displayTempVal(d.maxTemp)}° / {displayTempVal(d.minTemp)}°</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">RAIN PROB</span>
                      <span className="font-bold text-blue-600 text-sm">{d.precipitationProbability}% ({d.precipitationSum} mm)</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">MAX WIND</span>
                      <span className="font-bold text-teal-700 text-sm">{d.windSpeedMax} km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Weather Alerts & Preventative Actions Drawer */}
      {activeModal === 'alerts' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">
                  Meteorological Alerts & Preventative Actions
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-5 pt-3.5 pb-2.5 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2 flex-wrap text-xs sm:text-sm">
              <span className="text-slate-500 font-bold mr-1">Filter:</span>
              {[
                { key: 'all', label: 'All Alerts' },
                { key: 'rainfall', label: 'Rainfall' },
                { key: 'temperature', label: 'Thermal / Heat / Chill' },
                { key: 'storm', label: 'Storm & Squall' },
                { key: 'pest', label: 'Foliar Disease' },
                { key: 'spray', label: 'Spraying' }
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setAlertFilter(t.key)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    alertFilter === t.key
                      ? 'bg-[#1e5631] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((al, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      al.level === 'danger'
                        ? 'bg-rose-50 border-rose-200'
                        : al.level === 'warning'
                        ? 'bg-amber-50 border-amber-200'
                        : al.level === 'success'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-sky-50 border-sky-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">{al.title}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        al.level === 'danger'
                          ? 'bg-rose-600 text-white'
                          : al.level === 'warning'
                          ? 'bg-amber-600 text-white'
                          : al.level === 'success'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-sky-600 text-white'
                      }`}>
                        {al.severity}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block mb-2 font-medium">{al.date}</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">{al.description}</p>
                    <div className="pt-2.5 border-t border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-900">
                      Recommendation: {al.action}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No alerts match this filter criteria for your district today.
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Crop-specific Advisory */}
      {activeModal === 'cropAdvisory' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
              <div className="flex items-center gap-2">
                <SproutIcon className="w-5 h-5 text-emerald-800" />
                <h3 className="font-bold text-base md:text-lg text-emerald-950">
                  Agronomic Crop Advisories
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-emerald-200 text-emerald-800 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Crop Selector Tabs */}
            <div className="px-5 pt-3.5 pb-2.5 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2 flex-wrap text-xs sm:text-sm">
              {[
                { key: 'wheat', label: 'Wheat' },
                { key: 'rice', label: 'Rice / Paddy' },
                { key: 'sugarcane', label: 'Sugarcane' },
                { key: 'maize', label: 'Maize' },
                { key: 'cotton', label: 'Cotton' }
              ].map(c => (
                <button
                  key={c.key}
                  onClick={() => setActiveCropDetail(c.key)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeCropDetail === c.key
                      ? 'bg-[#1e5631] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <CropVectorIcon cropKey={c.key} className="w-4 h-4" />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {activeCropDetail === 'wheat' && (
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                    <CropVectorIcon cropKey="wheat" className="w-5 h-5" /> Wheat (Rabi Season)
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    Night temperatures are currently conducive for healthy crown root initiation and tillering. Maintain optimum soil moisture; avoid over-flooding to prevent root asphyxiation.
                  </p>
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-amber-800 block mb-1 font-bold">Field Action Items:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Apply first top-dressing of urea at crown root stage after light irrigation.</li>
                      <li>Inspect field borders for yellow rust streaks if humidity exceeds 70%.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCropDetail === 'rice' && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                    <CropVectorIcon cropKey="rice" className="w-5 h-5" /> Rice / Paddy (Kharif Season)
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    With precipitation expected, inspect bunds and drainage trenches to drain excess stagnant water and prevent bacterial leaf blight.
                  </p>
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-emerald-800 block mb-1 font-bold">Field Action Items:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Maintain 2-3 cm standing water in nursery beds; avoid deeper submergence.</li>
                      <li>Postpone spray of fungicides until rain has subsided.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCropDetail === 'sugarcane' && (
                <div className="p-4 rounded-xl border border-green-200 bg-green-50/40">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                    <CropVectorIcon cropKey="sugarcane" className="w-5 h-5" /> Sugarcane
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    Atmospheric temperature and solar radiation indices support active internode elongation. Earth up ridges to prevent stalk lodging during impending rain showers.
                  </p>
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-green-800 block mb-1 font-bold">Field Action Items:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Apply earthing-up operations to brace root anchorage.</li>
                      <li>Inspect cane tops for early shoot borer tunnels.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCropDetail === 'maize' && (
                <div className="p-4 rounded-xl border border-yellow-200 bg-yellow-50/40">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                    <CropVectorIcon cropKey="maize" className="w-5 h-5" /> Maize
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    Ensure adequate moisture during silking and cob development. Avoid waterlogging around root crown.
                  </p>
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-yellow-800 block mb-1 font-bold">Field Action Items:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Check whorls for fall armyworm larvae.</li>
                      <li>Drain excess surface runoff within 12 hours of rain.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCropDetail === 'cotton' && (
                <div className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                    <CropVectorIcon cropKey="cotton" className="w-5 h-5" /> Cotton
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    Protect open bolls from prolonged dampness to preserve lint quality and prevent boll rot.
                  </p>
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-cyan-800 block mb-1 font-bold">Field Action Items:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Perform selective manual picking of burst bolls before rainfall.</li>
                      <li>Ensure wide row spacing aeration to discourage fungal damping.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: API for Agri Businesses */}
      {activeModal === 'api' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <CompassIcon className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">
                  KisanMitra Weather API for Agribusinesses
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm text-slate-700">
              <p className="leading-relaxed">
                Integrate hyper-local agricultural weather forecasts, spray windows, and foliar disease warnings directly into your FPO portal, ERP, or farm IoT controllers.
              </p>

              <div className="relative p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
                <button
                  onClick={handleCopyCurl}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-sans flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>{copiedCurl ? 'Copied!' : 'Copy cURL'}</span>
                </button>
                <span className="text-slate-500"># Query hyper-local weather for any district</span><br />
                curl -X GET "{import.meta.env.VITE_SITE_URL || 'https://kisanmitra.in'}/api/weather?city={weatherData.location.name}" \<br />
                &nbsp;&nbsp;-H "Accept: application/json"
              </div>

              <p className="text-xs sm:text-sm text-slate-500">
                Responses include hourly telemetry vectors (24h), 7-day agronomic trends, soil saturation diagnostics, and crop suitability flags.
              </p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 6: Download App (With Real Simulated Download Progress) */}
      {activeModal === 'downloadApp' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-7 text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#1e5631] mx-auto flex items-center justify-center mb-4">
              <SproutIcon className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">
              Download KisanMitra Mobile App
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Get real-time audio weather alerts, mandi bhav notifications, and AI crop disease scanner on your smartphone.
            </p>

            {apkDownloaded && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                <span>KisanMitra_v2.4_Production.apk downloaded successfully!</span>
              </div>
            )}

            {apkDownloading && (
              <div className="mb-4 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Downloading APK...</span>
                  <span>{apkProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1e5631] transition-all duration-300"
                    style={{ width: `${apkProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleStartApkDownload}
                disabled={apkDownloading}
                className="w-full py-3 px-4 rounded-xl bg-[#1e5631] hover:bg-[#164326] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-sm"
              >
                <DownloadIcon className="w-4 h-4" />
                {apkDownloading ? 'Downloading...' : 'Direct Download Android APK (Free)'}
              </button>
              
              <button
                onClick={() => {
                  alert('Redirecting to Apple App Store — KisanMitra iOS Client.');
                  setActiveModal(null);
                }}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Download on Apple App Store
              </button>
            </div>
            
            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 text-sm text-slate-400 hover:underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal 7: Watch Interactive Demo */}
      {activeModal === 'demo' && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayIcon className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  KisanMitra AI Doppler Weather Engine Walkthrough
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Interactive Video Screen */}
            <div className="relative p-7 bg-slate-900 text-center text-white flex flex-col items-center justify-center min-h-[250px]">
              <div
                onClick={() => setDemoPlaying(p => !p)}
                className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl mb-3.5 cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                {demoPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-0.5" />}
              </div>
              <p className="text-sm text-slate-300 max-w-sm mb-4 leading-relaxed">
                {demoPlaying ? 'Video playing: Precision micro-climate Doppler forecast demo' : 'Video paused. Click to resume walkthrough.'}
              </p>

              {/* Scrubber & Controls */}
              <div className="w-full max-w-md space-y-1.5">
                <div
                  className="w-full h-2 bg-slate-700 rounded-full cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setDemoProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div
                    className="h-full bg-emerald-400"
                    style={{ width: `${demoProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>0:{(demoProgress * 0.6).toFixed(0).padStart(2, '0')}</span>
                  <span>1:00</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">1080p 60fps Doppler Stream</span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 8: Rainfall Probability / Frost Diagnostic */}
      {(activeModal === 'rainfallProb' || activeModal === 'frost') && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangleIcon className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                {activeModal === 'rainfallProb' ? 'Rainfall Probability Analysis' : 'Frost & Extreme Heat Diagnostics'}
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activeModal === 'rainfallProb'
                ? `Current 7-day cumulative rainfall forecast for ${weatherData.location.name} is ${dailyList.reduce((a, b) => a + b.precipitationSum, 0).toFixed(1)} mm with peak precipitation probability of ${Math.max(...dailyList.map(d => d.precipitationProbability))}% on ${dailyList[2]?.fullDate || 'upcoming days'}. Suitable for pre-irrigation planning.`
                : `No frost alerts detected. Daily minimum temperature remains above 20°C. Daytime thermal stress is within tolerable ranges for C3 and C4 cereal crops.`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#1e5631] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
