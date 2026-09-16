import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import farmBgLocal from '../assets/farm_bg.jpg';
import cta_plant from '../assets/cta_plant.png';
import { showComingSoon } from '../utils/comingSoon';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================================================
// VECTOR ICONS (Tailwind CSS)
// ============================================================================
function MapPinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LocateIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BarChartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  );
}

function RefreshIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function StoreIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7a2 2 0 0 1-2 2 2.5 2.5 0 0 1-2.5-2 2.5 2.5 0 0 1-2.5 2 2.5 2.5 0 0 1-2.5-2 2.5 2.5 0 0 1-2.5 2 2.5 2.5 0 0 1-2.5-2 2.5 2.5 0 0 1-2.5 2 2.5 2.5 0 0 1-2.5-2 2.5 2.5 0 0 1-2.5 2 2 2 0 0 1-2-2" />
    </svg>
  );
}

function CompareIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CoinHandIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.7-2.9l-4.7 3.5" />
      <circle cx="16" cy="6" r="4" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function CalendarIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function XIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SortIcon({ className = 'w-3 h-3' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

// ============================================================================
// REALISTIC CROP ILLUSTRATIONS
// ============================================================================
function CropIllustration({ type, className = "w-12 h-12" }) {
  switch (type?.toLowerCase()) {
    case 'wheat':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEF9E7" />
          <path d="M32 52V20" stroke="#B8860B" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="32" cy="16" rx="3.5" ry="6" fill="#DAA520" />
          <ellipse cx="27" cy="22" rx="3.5" ry="5.5" transform="rotate(-30 27 22)" fill="#E5B338" />
          <ellipse cx="37" cy="22" rx="3.5" ry="5.5" transform="rotate(30 37 22)" fill="#E5B338" />
          <ellipse cx="26" cy="30" rx="3.5" ry="5.5" transform="rotate(-35 26 30)" fill="#D49B24" />
          <ellipse cx="38" cy="30" rx="3.5" ry="5.5" transform="rotate(35 38 30)" fill="#D49B24" />
          <ellipse cx="28" cy="38" rx="3" ry="5" transform="rotate(-40 28 38)" fill="#C68C1D" />
          <ellipse cx="36" cy="38" rx="3" ry="5" transform="rotate(40 36 38)" fill="#C68C1D" />
        </svg>
      );
    case 'rice':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F4F8F4" />
          <ellipse cx="26" cy="32" rx="2.5" ry="5" transform="rotate(-25 26 32)" fill="#FFFFFF" stroke="#CCD5CE" strokeWidth="0.8" />
          <ellipse cx="32" cy="28" rx="2.5" ry="5.2" fill="#FFFFFF" stroke="#CCD5CE" strokeWidth="0.8" />
          <ellipse cx="38" cy="31" rx="2.5" ry="5" transform="rotate(30 38 31)" fill="#FFFFFF" stroke="#CCD5CE" strokeWidth="0.8" />
          <path d="M16 40h32c0 6-7 12-16 12S16 46 16 40z" fill="#2C8C44" />
        </svg>
      );
    case 'maize':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FFFDF0" />
          <ellipse cx="32" cy="30" rx="7" ry="16" fill="#FBC02D" />
          <path d="M22 48c4-12 8-24 16-32 3 9 2 20-3 30-3 6-9 8-13 2z" fill="#4CAF50" />
        </svg>
      );
    case 'sugarcane':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F1F8E9" />
          <rect x="23" y="16" width="6" height="34" rx="2" fill="#7CB342" />
          <rect x="32" y="12" width="6" height="38" rx="2" fill="#8BC34A" />
          <rect x="41" y="20" width="6" height="30" rx="2" fill="#689F38" />
        </svg>
      );
    case 'cotton':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F8FAFC" />
          <circle cx="26" cy="32" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="38" cy="32" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="32" cy="24" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M32 40v10" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'tomato':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FFF5F5" />
          <ellipse cx="32" cy="36" rx="11" ry="9.5" fill="#EF5350" />
          <path d="M32 24v-4" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 22c2-2 6-2 8 0" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'potato':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FAF5E8" />
          <ellipse cx="32" cy="34" rx="12" ry="8.5" fill="#C68A4C" />
          <circle cx="26" cy="32" r="1" fill="#8C5824" />
          <circle cx="33" cy="36" r="1" fill="#8C5824" />
          <circle cx="38" cy="32" r="1" fill="#8C5824" />
        </svg>
      );
    case 'onion':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FDF2F8" />
          <path d="M32 16c-8 6-12 14-12 20 0 7 5.5 12 12 12s12-5 12-12c0-6-4-14-12-20z" fill="#AD1457" />
          <path d="M32 16v-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'mustard':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEFCE8" />
          <path d="M32 50V22" stroke="#4D7C0F" strokeWidth="2" />
          <circle cx="32" cy="18" r="4.5" fill="#FACC15" />
          <circle cx="25" cy="24" r="3.5" fill="#FDE047" />
          <circle cx="39" cy="24" r="3.5" fill="#FDE047" />
        </svg>
      );
    case 'gram':
    case 'chana':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FFF7ED" />
          <circle cx="27" cy="34" r="6" fill="#D97706" />
          <circle cx="37" cy="32" r="5.5" fill="#B45309" />
          <circle cx="31" cy="25" r="5" fill="#F59E0B" />
        </svg>
      );
    case 'tur':
    case 'arhar':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEF2F2" />
          <circle cx="28" cy="32" r="6" fill="#DC2626" />
          <circle cx="37" cy="32" r="6" fill="#EF4444" />
        </svg>
      );
    case 'moong':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F0FDF4" />
          <ellipse cx="32" cy="32" rx="7" ry="9" fill="#16A34A" />
          <ellipse cx="32" cy="32" rx="2" ry="6" fill="#86EFAC" />
        </svg>
      );
    case 'urad':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F8FAFC" />
          <circle cx="32" cy="32" r="8" fill="#1E293B" />
          <circle cx="30" cy="30" r="2" fill="#94A3B8" />
        </svg>
      );
    case 'soybean':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEFCE8" />
          <ellipse cx="28" cy="33" rx="5" ry="6.5" fill="#CA8A04" />
          <ellipse cx="36" cy="31" rx="5" ry="6.5" fill="#EAB308" />
        </svg>
      );
    case 'groundnut':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FFFBEB" />
          <path d="M24 32c0-5 4-8 8-4 4-4 8-1 8 4s-4 8-8 4c-4 4-8 1-8-4z" fill="#D97706" />
        </svg>
      );
    case 'turmeric':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
          <path d="M22 36c4-8 12-10 18-4 3 3 4 8 2 12-4 3-10 2-14-2l-6-6z" fill="#F59E0B" />
        </svg>
      );
    case 'cumin':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F5F5F4" />
          <ellipse cx="32" cy="32" rx="3" ry="12" transform="rotate(30 32 32)" fill="#78716C" />
          <ellipse cx="26" cy="30" rx="2.5" ry="9" transform="rotate(-20 26 30)" fill="#A8A29E" />
        </svg>
      );
    case 'redchilli':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEF2F2" />
          <path d="M38 20c-4 8-10 16-16 22 6-2 14-8 18-18-1-2-1-3-2-4z" fill="#DC2626" />
          <path d="M38 20l3-4" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'garlic':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F8FAFC" />
          <ellipse cx="32" cy="34" rx="9" ry="10" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M32 24v-4" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'apple':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#FEF2F2" />
          <path d="M32 24c-6-4-14 2-12 12 2 8 8 12 12 12s10-4 12-12c2-10-6-16-12-12z" fill="#EF4444" />
          <path d="M32 20v-4" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 18c2-2 5-2 6 0" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="#F0FDF4" />
          <path d="M32 46V22" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="18" r="4" fill="#22C55E" />
        </svg>
      );
  }
}

function getFormattedDateLabels() {
  const now = new Date();
  return {
    today: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(now),
    yesterday: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(now.getTime() - 86400000)),
    weekStart: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(now.getTime() - 7 * 86400000)),
    weekEnd: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(now)
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MarketPrices() {
  // Global Market State
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedMandi, setSelectedMandi] = useState('');
  const [unitMode, setUnitMode] = useState('quintal'); // 'quintal' | 'kg' | 'ton'
  const [selectedDate, setSelectedDate] = useState('today');

  // Dynamic Date Labels
  const [dateLabels] = useState(getFormattedDateLabels);
  const { today: todayLabel, yesterday: yesterdayLabel, weekStart: weekStartLabel, weekEnd: weekEndLabel } = dateLabels;

  // Dynamic Data Containers from Backend
  const [locationName, setLocationName] = useState('Detecting location...');
  const [todayAvgPrices, setTodayAvgPrices] = useState([]);
  const [trendPoints, setTrendPoints] = useState([]);
  const [mandiComparisonBars, setMandiComparisonBars] = useState([]);
  const [nearbyMandis, setNearbyMandis] = useState([]);
  const [allTableRecords, setAllTableRecords] = useState([]);
  const [marketInsights, setMarketInsights] = useState([]);
  const [commoditiesList, setCommoditiesList] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [allMandisList, setAllMandisList] = useState([]);
  const [selectedCropDetails, setSelectedCropDetails] = useState(null);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locDetecting, setLocDetecting] = useState(false);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterMandi, setFilterMandi] = useState('');
  const [sortField, setSortField] = useState('modalPrice');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('Price Trends');

  // Modals State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editLocationInput, setEditLocationInput] = useState('');
  const [selectedCommodityDetail, setSelectedCommodityDetail] = useState(null);
  const [commodityDetail, setCommodityDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [activeHoverPoint, setActiveHoverPoint] = useState(null);
  const [activeInsightModal, setActiveInsightModal] = useState(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  // Unit Multipliers & Formatting helper
  const unitMultiplier = unitMode === 'kg' ? 0.01 : unitMode === 'ton' ? 10 : 1;
  const unitLabel = unitMode === 'kg' ? 'kg' : unitMode === 'ton' ? 'Ton' : 'Quintal';

  const formatPrice = (rawQuintalPrice) => {
    if (!rawQuintalPrice || isNaN(rawQuintalPrice)) return '₹ 0';
    const converted = Math.round(rawQuintalPrice * unitMultiplier);
    return `₹ ${converted.toLocaleString('en-IN')}`;
  };

  // 1. DYNAMIC DATA FETCHER
  const fetchMarketDashboardData = useCallback(async (opts = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      const effectiveState = opts.state !== undefined ? opts.state : (opts.isGps ? '' : selectedState);
      const effectiveCrop = opts.crop !== undefined ? opts.crop : selectedCrop;
      const effectiveMandi = opts.mandi !== undefined ? opts.mandi : (opts.state !== undefined ? '' : selectedMandi);

      if (opts.lat && opts.lon && !opts.state && !opts.location) {
        queryParams.append('lat', opts.lat);
        queryParams.append('lon', opts.lon);
      } else if (opts.location && !opts.state) {
        queryParams.append('location', opts.location);
      }

      if (effectiveState) {
        queryParams.append('state', effectiveState);
      }
      if (effectiveMandi) {
        queryParams.append('mandi', effectiveMandi);
      }
      if (effectiveCrop) {
        queryParams.append('crop', effectiveCrop);
      }

      const res = await fetch(`${API_BASE}/market-prices?${queryParams.toString()}`);
      const json = await res.json();

      if (json.success && json.data) {
        const d = json.data;
        if (d.location?.fullLocation) {
          setLocationName(d.location.fullLocation);
          if (d.location.state) setSelectedState(d.location.state);
          if (opts.mandi !== undefined) {
            setSelectedMandi(opts.mandi);
            setFilterMandi(opts.mandi);
          } else if (d.location.isGpsMatched && d.location.mandiName) {
            setSelectedMandi(d.location.mandiName);
            setFilterMandi(d.location.mandiName);
          } else if (opts.state !== undefined) {
            setSelectedMandi('');
            setFilterMandi('');
          }
        }
        setIsGpsActive(Boolean(d.location?.isGpsMatched || (opts.lat && opts.lon)));
        setTodayAvgPrices(d.todayAvgPrices || []);
        setTrendPoints(d.trendPoints || []);
        setMandiComparisonBars(d.mandiComparisonBars || []);
        setNearbyMandis(d.nearbyMandis || []);
        setAllTableRecords(d.tableRecords || []);
        setMarketInsights(d.insights || []);
        setCommoditiesList(d.commodities || []);
        setAvailableStates(d.allStates || []);
        setAllMandisList(d.allMandis || []);
        setSelectedCropDetails(d.selectedCropDetails || null);
      }
    } catch (err) {
      console.error('Error fetching market dashboard data:', err);
    } finally {
      setLoading(false);
      setLocDetecting(false);
    }
  }, [selectedCrop, selectedMandi, selectedState]);

  // 2. AUTOMATIC USER GEOLOCATION ON MOUNT & MANUAL TRIGGER
  const initialGpsRan = useRef(false);

  const detectUserGPS = useCallback(() => {
    setLocDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchMarketDashboardData({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            crop: selectedCrop,
            isGps: true
          });
        },
        () => {
          // If permission denied or unavailable, use reverse IP detection or default
          const ipApiBase = import.meta.env.VITE_IPAPI_URL || 'https://ipapi.co/json/';
          fetch(ipApiBase)
            .then(res => res.json())
            .then(data => {
              if (data.region) {
                fetchMarketDashboardData({ state: data.region, crop: selectedCrop });
              } else {
                fetchMarketDashboardData({ state: 'Uttar Pradesh', crop: selectedCrop });
              }
            })
            .catch(() => {
              fetchMarketDashboardData({ state: 'Uttar Pradesh', crop: selectedCrop });
            });
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      fetchMarketDashboardData({ state: 'Uttar Pradesh', crop: selectedCrop });
    }
  }, [fetchMarketDashboardData, selectedCrop]);

  useEffect(() => {
    if (!initialGpsRan.current) {
      initialGpsRan.current = true;
      detectUserGPS();
    }
  }, [detectUserGPS]);

  // When crop changes
  const handleCropChange = (newCropId) => {
    setSelectedCrop(newCropId);
    fetchMarketDashboardData({ crop: newCropId, state: selectedState, mandi: selectedMandi });
  };

  // When state changes manually
  const handleStateChange = (newState, newMandi = '') => {
    setSelectedState(newState);
    setSelectedMandi(newMandi);
    setFilterMandi(newMandi);
    setFilterDistrict('');
    setFilterCrop('');
    setCurrentPage(1);
    setIsGpsActive(false);
    fetchMarketDashboardData({ state: newState, crop: selectedCrop, mandi: newMandi });
  };

  // When mandi changes manually
  const handleMandiChange = (mandiName) => {
    setSelectedMandi(mandiName);
    setFilterMandi(mandiName);
    setCurrentPage(1);
    if (mandiName) {
      setLocationName(`${mandiName}, ${selectedState}`);
    } else {
      setLocationName(`${selectedState} Mandis Hub, ${selectedState}`);
    }
  };

  // Fetch Commodity Details Modal
  const openCommodityModal = async (cropId) => {
    try {
      setSelectedCommodityDetail(cropId);
      setDetailLoading(true);
      const res = await fetch(`${API_BASE}/market-prices/${cropId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setCommodityDetail(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Lock body scrolling while preserving exact scroll position
  const isAnyModalOpen = Boolean(
    isLocationModalOpen ||
    selectedCommodityDetail ||
    activeInsightModal ||
    isAppModalOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
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
  }, [isAnyModalOpen]);

  // 3. TABLE FILTERING, SORTING & PAGINATION ENGINE
  const filteredAndSortedRecords = useMemo(() => {
    let result = allTableRecords.map(r => {
      let effectiveModal = r.rawModalPrice;
      let effectiveReportedDate = r.lastUpdated || todayLabel;

      if (selectedDate === 'yesterday') {
        effectiveModal = r.isUp ? Math.round(r.rawModalPrice * 0.975) : Math.round(r.rawModalPrice * 1.025);
        effectiveReportedDate = yesterdayLabel;
      } else if (selectedDate === 'weekly') {
        effectiveModal = Math.round(r.rawModalPrice * 0.985);
        effectiveReportedDate = `${weekStartLabel} - ${weekEndLabel}`;
      }

      return {
        ...r,
        displayModalPrice: effectiveModal,
        displayMinPrice: Math.round(effectiveModal * 0.93),
        displayMaxPrice: Math.round(effectiveModal * 1.07),
        displayDate: effectiveReportedDate
      };
    });

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.crop.toLowerCase().includes(q) ||
        r.hindiName?.toLowerCase().includes(q) ||
        r.mandi.toLowerCase().includes(q) ||
        r.district?.toLowerCase().includes(q)
      );
    }

    // Filter by Crop
    if (filterCrop) {
      result = result.filter(r => r.crop.toLowerCase() === filterCrop.toLowerCase());
    }

    // Filter by District
    if (filterDistrict) {
      result = result.filter(r => r.district?.toLowerCase() === filterDistrict.toLowerCase());
    }

    // Filter by Mandi
    if (filterMandi) {
      result = result.filter(r => r.mandi.toLowerCase().includes(filterMandi.toLowerCase()));
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'modalPrice' || sortField === 'rawModalPrice') {
        valA = a.displayModalPrice || a.rawModalPrice || 0;
        valB = b.displayModalPrice || b.rawModalPrice || 0;
      } else if (sortField === 'minPrice') {
        valA = a.displayMinPrice || 0;
        valB = b.displayMinPrice || 0;
      } else if (sortField === 'maxPrice') {
        valA = a.displayMaxPrice || 0;
        valB = b.displayMaxPrice || 0;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [allTableRecords, searchQuery, filterCrop, filterDistrict, filterMandi, sortField, sortDirection, selectedDate, todayLabel, yesterdayLabel, weekStartLabel, weekEndLabel]);

  // 4. DYNAMIC TREND CHART DATA
  const trendChartData = useMemo(() => {
    if (!trendPoints || trendPoints.length === 0) {
      return { pathD: '', areaD: '', points: [], yTicks: [] };
    }

    const prices = trendPoints.map(p => p.price);
    const minVal = Math.min(...prices);
    const maxVal = Math.max(...prices);
    const range = (maxVal - minVal) || (maxVal * 0.1) || 100;
    const padding = range * 0.18;
    const yMin = Math.max(0, Math.floor((minVal - padding) / 50) * 50);
    const yMax = Math.ceil((maxVal + padding) / 50) * 50;
    const yRange = (yMax - yMin) || 100;

    // 5 dynamic Y-ticks
    const step = yRange / 4;
    const yTicks = [yMax, yMax - step, yMax - 2 * step, yMax - 3 * step, yMin];

    const plotLeft = 55;
    const plotRight = 385;
    const plotTop = 30;
    const plotBottom = 170;
    const plotW = plotRight - plotLeft;
    const plotH = plotBottom - plotTop;

    const coords = trendPoints.map((pt, i) => {
      const x = plotLeft + (i / (trendPoints.length - 1 || 1)) * plotW;
      const normalizedPrice = Math.min(1, Math.max(0, (pt.price - yMin) / yRange));
      const y = plotBottom - normalizedPrice * plotH;
      return { ...pt, cx: x, cy: y };
    });

    // Build smooth cubic bezier curve
    let linePath = `M ${coords[0].cx.toFixed(1)} ${coords[0].cy.toFixed(1)}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      const cp1x = p1.cx + (p2.cx - p0.cx) / 6;
      const cp1y = p1.cy + (p2.cy - p0.cy) / 6;
      const cp2x = p2.cx - (p3.cx - p1.cx) / 6;
      const cp2y = p2.cy - (p3.cy - p1.cy) / 6;

      linePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.cx.toFixed(1)} ${p2.cy.toFixed(1)}`;
    }

    const areaPath = `${linePath} L ${coords[coords.length - 1].cx.toFixed(1)} ${plotBottom} L ${coords[0].cx.toFixed(1)} ${plotBottom} Z`;

    return {
      pathD: linePath,
      areaD: areaPath,
      points: coords,
      yTicks
    };
  }, [trendPoints]);

  // 5. DYNAMIC MANDI COMPARISON DATA
  const mandiComparisonData = useMemo(() => {
    if (!mandiComparisonBars || mandiComparisonBars.length === 0) {
      return { bars: [], yTicks: [] };
    }
    const maxVal = Math.max(...mandiComparisonBars.map(b => b.rawPrice), 100);
    const yMax = Math.ceil((maxVal * 1.15) / 100) * 100;
    const step = yMax / 5;
    const yTicks = [yMax, Math.round(yMax - step), Math.round(yMax - 2 * step), Math.round(yMax - 3 * step), Math.round(yMax - 4 * step), 0];

    const bars = mandiComparisonBars.map(b => {
      const heightPct = Math.min(95, Math.max(12, Math.round((b.rawPrice / yMax) * 100)));
      return {
        ...b,
        heightPct
      };
    });

    return { bars, yTicks };
  }, [mandiComparisonBars]);

  // Paginated Slices
  const totalRecords = filteredAndSortedRecords.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage) || 1;
  const paginatedRecords = filteredAndSortedRecords.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-900 font-sans antialiased">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                            */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[530px] flex items-center bg-white border-b border-gray-100 overflow-hidden">
        {/* Farm Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img src={farmBgLocal} alt="Indian Farm" className="w-full h-full object-cover object-[center_right]" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-white/95 via-50% to-transparent" />

        <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-20 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 max-w-[46rem]">
              <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C8C44] font-bold text-xs tracking-wider uppercase">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>{isGpsActive ? '📍 Current Location' : 'Mandi Network'}: {locationName}</span>
                </div>

                <button
                  onClick={detectUserGPS}
                  title="Detect and use current device location"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#2C8C44] hover:border-[#2C8C44] font-bold text-xs cursor-pointer shadow-xs transition-colors"
                >
                  <LocateIcon className="w-3.5 h-3.5 text-[#2C8C44]" />
                  <span>Use My Location</span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.12] mb-4">
                Transparent Prices. <br />
                <span className="text-[#2C8C44]">Better Decisions.</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-[20px] mb-8 max-w-2xl leading-relaxed">
                Get real-time mandi prices from over 500+ APMC markets across India, compare state rates and make smarter selling decisions.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div
                  onClick={() => {
                    const el = document.getElementById('mandi-table-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/95 border border-gray-100 shadow-xs hover:border-[#2C8C44] cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2.5">
                    <StoreIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                    Real-Time <br />Mandi Prices
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('Compare Markets');
                    const el = document.getElementById('market-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/95 border border-gray-100 shadow-xs hover:border-[#2C8C44] cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2.5">
                    <CompareIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                    Compare Multiple <br />Markets
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('Price Trends');
                    const el = document.getElementById('market-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/95 border border-gray-100 shadow-xs hover:border-[#2C8C44] cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2.5">
                    <BarChartIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                    Price Trends <br />& Insights
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('Price Forecast');
                    const el = document.getElementById('market-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/95 border border-gray-100 shadow-xs hover:border-[#2C8C44] cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2.5">
                    <CoinHandIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                    Support for <br />Better Income
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Check Market Price Interactive Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative z-20">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-gray-900">Check Market Price</h3>
                  <button
                    onClick={detectUserGPS}
                    className="text-xs font-bold text-[#2C8C44] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <LocateIcon className="w-3.5 h-3.5" />
                    <span>GPS Auto-Detect</span>
                  </button>
                </div>

                {/* Crop Selector */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CropIllustration type={selectedCrop} className="w-6 h-6" />
                    </div>
                    <select
                      value={selectedCrop}
                      onChange={(e) => handleCropChange(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-10 py-3.5 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2C8C44] cursor-pointer"
                    >
                      {commoditiesList.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.hindiName})</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* State / Location Selector */}
                <div className="mb-4">
                  <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-[#2C8C44] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-10 py-3.5 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2C8C44] cursor-pointer"
                    >
                      {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Mandi Selector */}
                <div className="mb-6">
                  <div className="relative">
                    <StoreIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedMandi}
                      onChange={(e) => handleMandiChange(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-10 py-3.5 text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2C8C44] cursor-pointer"
                    >
                      <option value="">Select Mandi (Optional - All {selectedState} Mandis)</option>
                      {nearbyMandis.map(m => (
                        <option key={m.id} value={m.name.replace(' Mandi', '')}>
                          {m.name} ({m.distance})
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('market-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#123C26] hover:bg-[#1a5234] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <SearchIcon className="w-4 h-4" />
                  <span>View Mandi Prices</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TODAY'S AVERAGE PRICES - Interactive 8-Column Grid                      */}
      {/* ========================================================================= */}
      <div id="market-dashboard" className="w-full bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {selectedDate === 'yesterday' ? "Yesterday's" : selectedDate === 'weekly' ? 'Weekly' : "Today's"} Avg. Prices ({selectedState})
              </h2>
              {loading && <span className="w-4 h-4 border-2 border-[#2C8C44] border-t-transparent rounded-full animate-spin" />}
            </div>

            <span
              onClick={() => {
                setFilterCrop('');
                const el = document.getElementById('mandi-table-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-bold text-[#2C8C44] hover:underline cursor-pointer flex items-center gap-1"
            >
              View All Crops ({commoditiesList.length}) <ArrowRightIcon className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-3.5">
            {todayAvgPrices.map(c => {
              const isSelected = selectedCrop === c.id;
              const effectivePrice = selectedDate === 'yesterday'
                ? (c.isUp ? Math.round(c.rawPrice * 0.975) : Math.round(c.rawPrice * 1.025))
                : selectedDate === 'weekly'
                ? Math.round(c.rawPrice * 0.985)
                : c.rawPrice;
              return (
                <div
                  key={c.id}
                  onClick={() => handleCropChange(c.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-center flex flex-col items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? 'border-[#2C8C44] bg-emerald-50/70 shadow-sm ring-2 ring-[#2C8C44]/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="mb-2 transition-transform duration-200 hover:scale-110">
                    <CropIllustration type={c.id} className="w-12 h-12" />
                  </div>

                  <span className="text-sm font-bold text-gray-900 block mb-0.5">{c.name}</span>
                  <span className="text-base font-extrabold text-gray-900 block">
                    {formatPrice(effectivePrice)} <span className="text-xs font-normal text-gray-500">/ {unitLabel}</span>
                  </span>

                  <span className={`text-xs font-bold mt-1.5 flex items-center gap-0.5 ${
                    c.isUp ? 'text-[#2C8C44]' : 'text-red-600'
                  }`}>
                    {c.isUp ? '▲' : '▼'} {c.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN DASHBOARD - 2 Column (Charts & Sidebar)                             */}
      {/* ========================================================================= */}
      <main className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-7">

            {/* Sub Navigation Tabs & Unit Selector */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-2">
                {[
                  { id: 'Price Trends', label: 'Price Trends' },
                  { id: 'Compare Markets', label: 'Compare Markets' },
                  { id: 'Price Forecast', label: 'Price Forecast' },
                  { id: 'Seasonal Trends', label: 'Seasonal Trends' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#123C26] text-white shadow-sm'
                        : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Unit Mode Selector */}
              <div className="relative flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 hidden sm:inline">Unit:</span>
                <select
                  value={unitMode}
                  onChange={(e) => setUnitMode(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                >
                  <option value="quintal">Quintal (100 kg)</option>
                  <option value="kg">Kilogram (1 kg)</option>
                  <option value="ton">Metric Ton (1000 kg)</option>
                </select>
                <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* TAB 1: PRICE TRENDS */}
            {activeTab === 'Price Trends' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Chart: Dynamic SVG Trend Curve */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 capitalize">
                        {selectedCropDetails?.name || selectedCrop} Price Trend
                      </h3>
                      <p className="text-xs text-gray-500">Past 7 Days &middot; {selectedState}</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl text-right">
                      <span className="text-xs font-extrabold text-[#123C26] block">
                        {formatPrice(trendPoints[trendPoints.length - 1]?.price || 2125)}
                      </span>
                      <span className="text-[10px] text-emerald-700 block font-medium">{todayLabel}</span>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative h-56 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dynamicGreenGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2C8C44" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2C8C44" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      {[30, 65, 100, 135, 170].map((y, idx) => (
                        <line key={idx} x1="45" y1={y} x2="390" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                      ))}

                      {/* Area Fill */}
                      {trendChartData.areaD && (
                        <path
                          d={trendChartData.areaD}
                          fill="url(#dynamicGreenGrad)"
                        />
                      )}

                      {/* Smooth Line */}
                      {trendChartData.pathD && (
                        <path
                          d={trendChartData.pathD}
                          fill="none"
                          stroke="#2C8C44"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Interactive Nodes */}
                      {trendChartData.points.map((pt, i) => (
                        <g key={i} className="cursor-pointer" onMouseEnter={() => setActiveHoverPoint(pt)} onMouseLeave={() => setActiveHoverPoint(null)}>
                          <circle cx={pt.cx} cy={pt.cy} r="6" fill="#FFFFFF" stroke="#2C8C44" strokeWidth="2.5" />
                          <circle cx={pt.cx} cy={pt.cy} r="3" fill="#2C8C44" />
                        </g>
                      ))}
                    </svg>

                    {/* Dynamic Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-medium">
                      {trendChartData.yTicks.map((val, idx) => (
                        <span key={idx}>{formatPrice(val)}</span>
                      ))}
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between pl-10 pr-2 text-[10px] text-gray-400 font-medium mt-1">
                      {trendPoints.map((pt, i) => <span key={i}>{pt.date}</span>)}
                    </div>

                    {/* Floating Tooltip */}
                    {activeHoverPoint && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none z-20">
                        <strong>{activeHoverPoint.date}:</strong> {formatPrice(activeHoverPoint.price)} / {unitLabel}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Chart: Compare Mandi Vertical Bars */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900 capitalize">
                      Compare Mandi Prices ({selectedCropDetails?.name || selectedCrop})
                    </h3>
                    <span className="text-xs text-[#2C8C44] font-bold">{selectedState} Hubs</span>
                  </div>

                  <div className="relative h-56 w-full flex items-end justify-between pl-10 pr-4 pb-8 pt-4">
                    {/* Dynamic Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 font-medium">
                      {mandiComparisonData.yTicks.map((val, idx) => (
                        <span key={idx}>{formatPrice(val)}</span>
                      ))}
                    </div>

                    {mandiComparisonData.bars.map((bar, idx) => (
                      <div
                        key={idx}
                        onClick={() => setFilterMandi(bar.name)}
                        className="flex-1 flex flex-col items-center h-full justify-end px-1 cursor-pointer group"
                      >
                        <div
                          className={`w-full max-w-[40px] rounded-t-lg transition-all duration-300 group-hover:opacity-90 ${
                            bar.isMain ? 'bg-[#123C26] shadow-sm' : 'bg-[#A8E4BA]'
                          }`}
                          style={{ height: `${bar.heightPct || 75}%` }}
                        />
                        <div className="text-center mt-2">
                          <span className="text-xs font-bold text-gray-800 block truncate max-w-[55px] group-hover:text-[#2C8C44]">
                            {bar.name}
                          </span>
                          <span className="text-[10px] font-semibold text-gray-500 block">
                            {formatPrice(bar.rawPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: COMPARE MARKETS */}
            {activeTab === 'Compare Markets' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Inter-State Mandi Price Benchmark</h3>
                    <p className="text-xs text-gray-500">Compare market rates for {selectedCropDetails?.name || selectedCrop} across top agricultural states</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                    MSP: {selectedCropDetails?.msp2025 ? `₹ ${selectedCropDetails.msp2025} / Q` : 'Market Driven'}
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { state: 'Punjab', mandi: 'Khanna / Ludhiana APMC', mult: 1.07 },
                    { state: 'Haryana', mandi: 'Karnal / Kurukshetra Mandi', mult: 1.05 },
                    { state: 'Maharashtra', mandi: 'Lasalgaon / Nashik APMC', mult: 1.09 },
                    { state: 'Rajasthan', mandi: 'Kota Bhamashah / Jaipur Mandi', mult: 1.02 },
                    { state: 'Madhya Pradesh', mandi: 'Indore Chhoitram / Mandsaur', mult: 1.04 },
                    { state: 'Gujarat', mandi: 'Unjha / Rajkot APMC', mult: 1.06 },
                    { state: 'Uttar Pradesh', mandi: 'Noida / Kanpur Mandi', mult: 1.0 },
                    { state: 'Bihar', mandi: 'Purnia Gulabbagh / Patna Mandi', mult: 0.98 },
                    { state: 'Karnataka', mandi: 'Yeshwanthpur / Hubli APMC', mult: 1.10 }
                  ].map((st, i) => {
                    const price = Math.round((selectedCropDetails?.basePrice || 2125) * st.mult);
                    const diffPct = (((price - (selectedCropDetails?.basePrice || 2125)) / (selectedCropDetails?.basePrice || 2125)) * 100).toFixed(1);
                    const isUp = parseFloat(diffPct) >= 0;
                    return (
                      <div
                        key={i}
                        onClick={() => handleStateChange(st.state)}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#2C8C44] cursor-pointer transition-all group"
                      >
                        <div>
                          <span className="text-sm font-bold text-gray-900 group-hover:text-[#2C8C44] block">{st.state}</span>
                          <span className="text-xs text-gray-500">{st.mandi}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <strong className="text-sm font-extrabold text-gray-900">{formatPrice(price)} / {unitLabel}</strong>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                            {isUp ? '+' : ''}{diffPct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: PRICE FORECAST */}
            {activeTab === 'Price Forecast' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">AI Price Forecast & Selling Recommendation ({selectedState})</h3>
                    <p className="text-xs text-gray-500">Based on CACP buffer stocks, crop harvest arrival patterns and weather alerts</p>
                  </div>
                  <span className="text-xs font-bold text-[#2C8C44]">94% Confidence</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-700 font-semibold block mb-1">Next 7 Days</span>
                    <strong className="text-xl font-bold text-emerald-900">
                      {formatPrice((selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0) * 1.02)}
                    </strong>
                    <span className="text-xs text-emerald-600 block mt-0.5 font-medium">+2.0% expected growth</span>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center">
                    <span className="text-xs text-sky-700 font-semibold block mb-1">Next 30 Days</span>
                    <strong className="text-xl font-bold text-sky-900">
                      {formatPrice((selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0) * 1.05)}
                    </strong>
                    <span className="text-xs text-sky-600 block mt-0.5 font-medium">+5.0% steady demand</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                    <span className="text-xs text-amber-700 font-semibold block mb-1">Harvest Peak</span>
                    <strong className="text-xl font-bold text-amber-900">
                      {formatPrice((selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0) * 0.94)}
                    </strong>
                    <span className="text-xs text-amber-600 block mt-0.5 font-medium">-6.0% arrival surge</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700">
                  <strong className="text-gray-900">Farmer Selling Advisory ({selectedState}):</strong> Holding grain for 2-3 weeks post-harvest in {selectedState} typically yields 4-8% higher returns across local APMC mandis. Ensure moisture level remains below 12% for best storage rates.
                </div>
              </div>
            )}

            {/* TAB 4: SEASONAL TRENDS */}
            {activeTab === 'Seasonal Trends' && (
              <div className="space-y-6">
                {/* Main 12-Month Seasonal Curve Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {selectedCropDetails?.name || selectedCrop} 12-Month Seasonal Price Curve
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {selectedCropDetails?.season || 'Annual'} Season
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Historical arrival glut, seasonal supply fluctuations, and estimated price trajectory in {selectedState}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-right">
                        <span className="text-[10px] text-gray-500 block font-medium">State Benchmark</span>
                        <strong className="text-xs font-bold text-gray-900">
                          {formatPrice((selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0))} / {unitLabel}
                        </strong>
                      </div>
                      {selectedCropDetails?.msp2025 && (
                        <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-right">
                          <span className="text-[10px] text-amber-700 block font-medium">Govt MSP (2025-26)</span>
                          <strong className="text-xs font-bold text-amber-900">
                            ₹ {selectedCropDetails.msp2025.toLocaleString('en-IN')} / Q
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 12-Month Visual Bar Chart */}
                  {(() => {
                    const seasonType = (selectedCropDetails?.season || '').toLowerCase();
                    const cropId = (selectedCropDetails?.id || selectedCrop).toLowerCase();
                    const baseRate = (selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0);

                    const isKharif = seasonType.includes('kharif') || ['rice', 'cotton', 'maize', 'soybean', 'tur', 'moong', 'urad', 'groundnut', 'bajra', 'jowar'].includes(cropId);
                    const isRabi = seasonType.includes('rabi') || ['wheat', 'mustard', 'gram', 'potato', 'barley'].includes(cropId);
                    const isPerishable = ['tomato', 'onion'].includes(cropId);

                    // Multipliers for each month (0=Jan ... 11=Dec)
                    const monthlyMultipliers = isKharif ? [
                      1.01, 1.03, 1.05, 1.07, 1.09, 1.12, 1.14, 1.10, 1.04, 0.93, 0.91, 0.95
                    ] : isRabi ? [
                      1.08, 1.10, 0.94, 0.91, 0.93, 0.98, 1.02, 1.04, 1.06, 1.07, 1.08, 1.08
                    ] : isPerishable ? [
                      0.92, 0.95, 1.05, 1.12, 1.20, 1.25, 1.18, 1.10, 0.98, 1.06, 1.12, 0.95
                    ] : [
                      1.02, 1.04, 1.06, 1.08, 1.05, 1.02, 0.97, 0.96, 0.99, 1.03, 1.06, 1.04
                    ];

                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const estPrices = monthNames.map((_, idx) => Math.round(baseRate * monthlyMultipliers[idx]));
                    const maxP = Math.max(...estPrices, 1);
                    const minP = Math.min(...estPrices, 0);
                    const rangeP = (maxP - minP) || (maxP * 0.1) || 1;

                    const monthData = monthNames.map((mon, idx) => {
                      const mult = monthlyMultipliers[idx];
                      const estPrice = Math.round(baseRate * mult);
                      const diffPct = ((mult - 1.0) * 100).toFixed(1);
                      const isHarvest = isKharif ? (idx >= 9 && idx <= 11) : isRabi ? (idx >= 2 && idx <= 4) : (idx >= 5 && idx <= 7);
                      const isPeakPrice = mult >= 1.08;
                      const heightPct = Math.min(95, Math.max(28, Math.round(((estPrice - minP) / rangeP) * 62 + 33)));

                      return {
                        mon,
                        monthIdx: idx,
                        estPrice,
                        diffPct,
                        isHarvest,
                        isPeakPrice,
                        heightPct
                      };
                    });

                    return (
                      <div>
                        {/* Chart Bars */}
                        <div className="grid grid-cols-12 gap-1 sm:gap-2 h-52 items-end mb-4 pt-4 px-1">
                          {monthData.map((m) => {
                            const barColor = m.isHarvest
                              ? 'bg-amber-400 hover:bg-amber-500'
                              : m.isPeakPrice
                              ? 'bg-[#123C26] hover:bg-[#1a5234]'
                              : 'bg-[#48BB78] hover:bg-[#38A169]';

                            return (
                              <div key={m.mon} className="flex flex-col items-center h-full justify-end group relative cursor-pointer">
                                {/* Hover Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none">
                                  <span className="font-bold">{m.mon}: {formatPrice(m.estPrice)}</span>
                                  <span className={parseFloat(m.diffPct) >= 0 ? 'text-emerald-300' : 'text-amber-300'}>
                                    {parseFloat(m.diffPct) >= 0 ? '+' : ''}{m.diffPct}% vs avg
                                  </span>
                                </div>

                                <span className="text-[9px] font-bold text-gray-500 mb-1 hidden sm:block truncate">
                                  ₹{Math.round(m.estPrice / (unitMode === 'kg' ? 100 : 1))}
                                </span>

                                {/* Bar Track & Solid Fill */}
                                <div className="w-full h-32 flex items-end justify-center">
                                  <div
                                    className={`w-full max-w-[32px] rounded-t-md transition-all duration-300 shadow-sm ${barColor}`}
                                    style={{ height: `${m.heightPct}%` }}
                                  />
                                </div>

                                <span className="text-[10px] sm:text-xs text-gray-700 font-bold mt-2">{m.mon}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Chart Legend */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded bg-[#123C26]" />
                              <span>Off-Season Peak Realization (Highest Price)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded bg-amber-400" />
                              <span>Harvest Arrival Glut (Price Dip)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded bg-[#48BB78]" />
                              <span>Normal Trading Range</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-gray-400 italic">Hover columns for monthly estimates</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 3 Key Farmer Decision Milestone Cards */}
                {(() => {
                  const seasonType = (selectedCropDetails?.season || '').toLowerCase();
                  const cropId = (selectedCropDetails?.id || selectedCrop).toLowerCase();
                  const isKharif = seasonType.includes('kharif') || ['rice', 'cotton', 'maize', 'soybean', 'tur', 'moong', 'urad', 'groundnut', 'bajra', 'jowar'].includes(cropId);
                  const isRabi = seasonType.includes('rabi') || ['wheat', 'mustard', 'gram', 'potato', 'barley'].includes(cropId);

                  const sowingWindow = isKharif ? 'June – July (Monsoon Onset)' : isRabi ? 'October – November (Post-Monsoon)' : 'February – March (Spring/Zaid)';
                  const harvestWindow = isKharif ? 'October – December (Heavy Arrivals)' : isRabi ? 'March – May (Bumper Arrivals)' : 'May – June (Summer Harvest)';
                  const sellingWindow = isKharif ? 'June – September (Off-Season Highs)' : isRabi ? 'November – January (Winter Off-Season)' : 'July – August (Post-Cure Peak)';

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center font-bold text-sm mb-3">
                          1
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Optimal Sowing Window</h4>
                        <p className="text-xs font-semibold text-emerald-700 mb-2">{sowingWindow}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Procure certified seeds early from nearby Krishi Vigyan Kendras (KVK) and treat with bio-fertilizers prior to field sowing.
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm mb-3">
                          2
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Peak Mandi Inflow (Glut)</h4>
                        <p className="text-xs font-semibold text-amber-700 mb-2">{harvestWindow}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Mandi arrival volumes peak by up to 300%. Utilize WDRA-registered warehouse receipt loans (e-NWR) to prevent panic selling at harvest dips.
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm mb-3">
                          3
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Optimal Selling Window</h4>
                        <p className="text-xs font-semibold text-sky-700 mb-2">{sellingWindow}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Lean market supplies consistently deliver 8% to 15% price premiums over MSP. Ensure crop moisture stays below 12% for safe warehousing.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Seasonal Price Advisory Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Annual Price Realization Roadmap</h4>
                      <p className="text-xs text-gray-500">Historical trading pattern benchmark for {selectedCropDetails?.name || selectedCrop} in {selectedState}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2C8C44] bg-emerald-50 px-3 py-1 rounded-full">
                      APMC Historical Model
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="px-4 py-3">Quarter / Month</th>
                          <th className="px-4 py-3">Arrival Inflow</th>
                          <th className="px-4 py-3 text-right">Est. Modal Rate</th>
                          <th className="px-4 py-3 text-center">Price Index</th>
                          <th className="px-4 py-3">Farmer Action Advisory</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {(() => {
                          const seasonType = (selectedCropDetails?.season || '').toLowerCase();
                          const cropId = (selectedCropDetails?.id || selectedCrop).toLowerCase();
                          const baseRate = (selectedCropDetails?.basePrice || 2125) * (selectedCropDetails?.stateMultipliers?.[selectedState] || 1.0);
                          const isKharif = seasonType.includes('kharif') || ['rice', 'cotton', 'maize', 'soybean', 'tur', 'moong', 'urad', 'groundnut', 'bajra', 'jowar'].includes(cropId);

                          const quarters = [
                            {
                              name: 'Q1 (Jan – Mar)',
                              inflow: isKharif ? 'Moderate Inflow' : 'Pre-Harvest Lean',
                              mult: isKharif ? 1.02 : 1.08,
                              advice: isKharif ? 'Gradual selling in tranches of 25%' : 'Prepare harvesting and threshing equipment'
                            },
                            {
                              name: 'Q2 (Apr – Jun)',
                              inflow: isKharif ? 'Lean Supply' : 'Peak Bumper Arrivals',
                              mult: isKharif ? 1.08 : 0.93,
                              advice: isKharif ? 'Target summer millers for peak price' : 'Store cleaned grain in hermetic bags / silos'
                            },
                            {
                              name: 'Q3 (Jul – Sep)',
                              inflow: isKharif ? 'Extreme Lean (Off-Season)' : 'Moderate Inflow',
                              mult: isKharif ? 1.12 : 1.04,
                              advice: isKharif ? 'Sell remaining warehouse stock at maximum margin' : 'Regular releases to meet working capital'
                            },
                            {
                              name: 'Q4 (Oct – Dec)',
                              inflow: isKharif ? 'Peak Harvest Glut' : 'Off-Season Highs',
                              mult: isKharif ? 0.92 : 1.08,
                              advice: isKharif ? 'Avoid spot distress sales; utilize MSP procurement centers' : 'Premium window for stock liquidation'
                            }
                          ];

                          return quarters.map((q, idx) => {
                            const estRate = Math.round(baseRate * q.mult);
                            const diffPct = ((q.mult - 1.0) * 100).toFixed(1);
                            const isPositive = parseFloat(diffPct) >= 0;

                            return (
                              <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                                <td className="px-4 py-3.5 font-bold text-gray-900">{q.name}</td>
                                <td className="px-4 py-3.5">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                    q.inflow.includes('Peak') ? 'bg-amber-100 text-amber-800' :
                                    q.inflow.includes('Lean') ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {q.inflow}
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 text-right font-extrabold text-gray-900">
                                  {formatPrice(estRate)} / {unitLabel}
                                </td>
                                <td className="px-4 py-3.5 text-center">
                                  <span className={`font-bold ${isPositive ? 'text-emerald-700' : 'text-amber-700'}`}>
                                    {isPositive ? '+' : ''}{diffPct}%
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 text-xs text-gray-600">
                                  {q.advice}
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* MANDI PRICES TABLE & FILTER ENGINE                                  */}
            {/* =================================================================== */}
            <div id="mandi-table-section" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-7 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Mandi Prices in {selectedState}</h3>
                    <p className="text-xs text-gray-500">
                      Live APMC arrivals and daily modal rates ({selectedDate === 'yesterday' ? `Yesterday, ${yesterdayLabel}` : selectedDate === 'weekly' ? `Weekly Avg, ${weekStartLabel} - ${weekEndLabel}` : `Today, ${todayLabel}`} &middot; {totalRecords} total entries)
                    </p>
                  </div>

                  {/* Search Bar & Date Picker */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <div className="relative min-w-[230px]">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search crop or mandi (e.g., wheat, Ludhiana)..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                      />
                      <SearchIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-7 py-2 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none"
                      >
                        <option value="today">Today ({todayLabel})</option>
                        <option value="yesterday">Yesterday ({yesterdayLabel})</option>
                        <option value="weekly">Weekly Avg ({weekStartLabel} - {weekEndLabel})</option>
                      </select>
                      <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <div className="relative">
                    <select
                      value={filterCrop}
                      onChange={(e) => {
                        setFilterCrop(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                    >
                      <option value="">All Crops</option>
                      {commoditiesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={filterMandi}
                      onChange={(e) => {
                        setFilterMandi(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                    >
                      <option value="">All Mandis ({selectedState})</option>
                      {nearbyMandis.map(m => (
                        <option key={m.id} value={m.name.replace(' Mandi', '')}>{m.name}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCrop('');
                      setFilterDistrict('');
                      setFilterMandi('');
                      setCurrentPage(1);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    <RefreshIcon className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Table with sorting */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-b border-gray-200 bg-gray-50/80">
                      <th onClick={() => toggleSort('crop')} className="text-left px-5 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center gap-1"><span>Crop</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                      <th onClick={() => toggleSort('mandi')} className="text-left px-4 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center gap-1"><span>Mandi ({selectedState})</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                      <th onClick={() => toggleSort('minPrice')} className="text-right px-4 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end gap-1"><span>Min Price ({unitLabel})</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                      <th onClick={() => toggleSort('maxPrice')} className="text-right px-4 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end gap-1"><span>Max Price ({unitLabel})</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                      <th onClick={() => toggleSort('modalPrice')} className="text-right px-4 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center justify-end gap-1"><span>Modal Price</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                      <th className="text-left px-4 py-3 font-bold text-gray-700 text-xs">Change (vs. yesterday)</th>
                      <th onClick={() => toggleSort('lastUpdated')} className="text-left px-4 py-3 font-bold text-gray-700 text-xs cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center gap-1"><span>Reported Date</span><SortIcon className="w-3 h-3" /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRecords.length > 0 ? (
                      paginatedRecords.map((r, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 hover:bg-gray-50/70 transition-colors cursor-pointer"
                          onClick={() => openCommodityModal(r.cropId)}
                        >
                          <td className="px-5 py-3 font-semibold text-gray-900 flex items-center gap-2.5">
                            <CropIllustration type={r.cropId} className="w-6 h-6 flex-shrink-0" />
                            <div>
                              <span>{r.crop}</span>
                              <span className="text-[10px] text-gray-400 block">{r.hindiName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{r.mandi}</td>
                          <td className="px-4 py-3 text-right text-gray-600 font-medium">{formatPrice(r.displayMinPrice)}</td>
                          <td className="px-4 py-3 text-right text-gray-600 font-medium">{formatPrice(r.displayMaxPrice)}</td>
                          <td className="px-4 py-3 text-right font-extrabold text-gray-900">{formatPrice(r.displayModalPrice)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                              r.isUp ? 'text-[#2C8C44]' : 'text-red-600'
                            }`}>
                              {r.isUp ? '▲' : '▼'} {r.change}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-gray-700">{r.displayDate}</span>
                              {r.isLive && selectedDate === 'today' && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Live APMC
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-gray-500 text-sm">
                          No matching mandi records found in {selectedState}. Try resetting filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 bg-white border-t border-gray-200 text-xs text-gray-600 gap-3">
                <span>
                  Showing {totalRecords > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, totalRecords)} of {totalRecords} records
                </span>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-40 cursor-pointer"
                  >
                    ‹
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center cursor-pointer transition-colors ${
                        currentPage === page
                          ? 'bg-[#123C26] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {totalPages > 5 && <span className="px-1 text-gray-400">...</span>}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-40 cursor-pointer"
                  >
                    ›
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-2.5 py-1 pr-6 text-xs text-gray-600 cursor-pointer focus:outline-none"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                  <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          {/* =================================================================== */}
          {/* RIGHT SIDEBAR (Nearby Mandis & Market Bulletin)                     */}
          {/* =================================================================== */}
          <div className="lg:col-span-4 space-y-6">

            {/* 1. Mandis for Active State / GPS */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <MapPinIcon className="w-5 h-5 text-[#2C8C44]" />
                <h3 className="text-base font-bold text-gray-900">
                  {isGpsActive ? 'Nearby Mandis' : `${selectedState} Mandis`}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#2C8C44]" />
                  <span>{locationName}</span>
                </div>
                <button
                  onClick={() => {
                    setEditLocationInput(locationName);
                    setIsLocationModalOpen(true);
                  }}
                  className="text-xs font-bold text-[#2C8C44] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="space-y-3">
                {nearbyMandis.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => {
                      setFilterMandi(m.name.replace(' Mandi', ''));
                      const el = document.getElementById('mandi-table-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <StoreIcon className="w-4 h-4 text-[#2C8C44] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#2C8C44] block">{m.name}</span>
                        <span className="text-[11px] text-gray-500">{m.area}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{m.distance}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setEditLocationInput(locationName);
                  setIsLocationModalOpen(true);
                }}
                className="w-full mt-4 py-2.5 rounded-xl border border-[#2C8C44] text-xs font-bold text-[#2C8C44] hover:bg-emerald-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Change State / Search Mandis</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Market Insights Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <BarChartIcon className="w-4 h-4 text-[#2C8C44]" />
                  <h3 className="text-base font-bold text-gray-900">Market Insights</h3>
                </div>
                <span
                  onClick={() => setActiveInsightModal(marketInsights[0])}
                  className="text-xs font-bold text-[#2C8C44] hover:underline cursor-pointer flex items-center gap-1"
                >
                  View All <ArrowRightIcon className="w-3 h-3" />
                </span>
              </div>

              <div className="space-y-3.5">
                {marketInsights.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      handleCropChange(item.type);
                      setActiveInsightModal(item);
                    }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <CropIllustration type={item.type} className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 group-hover:text-[#2C8C44] leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                        <span className="text-[10px] font-bold text-emerald-700">{item.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Useful Links Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <ExternalLinkIcon className="w-4 h-4 text-[#2C8C44]" />
                <h3 className="text-base font-bold text-gray-900">Useful Links</h3>
              </div>

              <ul className="space-y-2">
                {[
                  { label: 'Agmarknet (Government Portal)', url: 'https://agmarknet.gov.in' },
                  { label: `State Mandi Board (${selectedState})`, url: 'https://enam.gov.in' },
                  { label: 'e-NAM National Agriculture Market', url: 'https://enam.gov.in' },
                  { label: 'Market Arrivals Data (data.gov.in)', url: 'https://data.gov.in' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 hover:text-[#2C8C44] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <StoreIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{link.label}</span>
                      </div>
                      <ExternalLinkIcon className="w-3 h-3 text-gray-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. App Download Card */}
            <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] rounded-2xl border border-emerald-200 p-6 relative overflow-hidden">
              <div className="relative z-10 max-w-[210px]">
                <h4 className="text-base font-extrabold text-gray-900 leading-snug mb-1.5">
                  Get Live Market Prices on the Kisan Mitra App
                </h4>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  Real-time prices, alerts and personalized recommendations.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => showComingSoon('app', 'KisanMitra Mandi Bhav App', 'Track live mandi prices across 2,400+ APMCs and get personalized selling price alerts.', 'market_prices_app')}
                    className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors w-max"
                  >
                    <span className="text-[9px] leading-tight block text-left">
                      GET IT ON <br /><strong className="text-xs">Google Play</strong>
                    </span>
                  </button>
                  <button
                    onClick={() => showComingSoon('app', 'KisanMitra Mandi Bhav App', 'Track live mandi prices across 2,400+ APMCs and get personalized selling price alerts.', 'market_prices_app')}
                    className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors w-max"
                  >
                    <span className="text-[9px] leading-tight block text-left">
                      Download on the <br /><strong className="text-xs">App Store</strong>
                    </span>
                  </button>
                </div>
              </div>

              {/* Smartphone mockup with realistic KisanMitra App UI */}
              <div className="absolute -right-4 -bottom-6 w-36 h-64 bg-slate-950 rounded-3xl p-1.5 shadow-2xl border-2 border-slate-800 rotate-6 pointer-events-none overflow-hidden select-none">
                <div className="w-full h-full bg-gradient-to-b from-emerald-50 via-white to-slate-50 rounded-2xl overflow-hidden p-2 flex flex-col justify-between text-[8px]">
                  {/* Status & Island */}
                  <div className="flex justify-between items-center px-1">
                    <span className="font-bold text-gray-700 text-[7px]">09:41</span>
                    <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-[7px] text-gray-500 font-bold">5G</span>
                  </div>
                  {/* App Header */}
                  <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg shadow-sm border border-emerald-100">
                    <img src="/favicon.png" alt="KM" className="w-3.5 h-3.5 rounded-full object-contain" />
                    <div>
                      <div className="font-bold text-[#123C26] text-[8px] leading-none">KisanMitra</div>
                      <div className="text-[6px] text-gray-400">Live Mandi Prices</div>
                    </div>
                  </div>
                  {/* Mandi Card */}
                  <div className="bg-[#123C26] text-white p-2 rounded-lg shadow-sm">
                    <div className="text-[6.5px] text-emerald-200">APMC Live Rates</div>
                    <div className="font-bold text-[10px]">₹2,450 / Qtl</div>
                    <div className="text-[6.5px] text-emerald-300">Wheat (Gehu) • +2.8%</div>
                  </div>
                  {/* Quick Ticker */}
                  <div className="space-y-1">
                    <div className="flex justify-between bg-white p-1 rounded border border-gray-100 text-[7px]">
                      <span>Mustard (Sarson)</span>
                      <span className="font-bold text-emerald-700">₹5,680</span>
                    </div>
                    <div className="flex justify-between bg-white p-1 rounded border border-gray-100 text-[7px]">
                      <span>Basmati Rice</span>
                      <span className="font-bold text-emerald-700">₹3,920</span>
                    </div>
                  </div>
                  {/* App Footer */}
                  <div className="w-full py-1 bg-emerald-700 rounded-md text-[7px] text-white text-center font-bold">
                    ✓ Verified APMC Feed
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM GREEN CTA BANNER                                                 */}
      {/* ========================================================================= */}
      <section className="w-full py-6 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100">
        <div className="max-w-[85rem] mx-auto bg-[#0F392B] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
            <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] flex-shrink-0 flex items-center justify-center">
              <img src={cta_plant} alt="Kisan Mitra Seedling" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-1">Sell at the Best Price. Every Time.</h2>
              <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
                Get real-time market prices, mandi trends and personalized selling alerts on Kisan Mitra.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => showComingSoon('app', 'KisanMitra Mandi Bhav App', 'Track live market prices across 2,400+ APMCs and get personalized selling price alerts.', 'market_prices_app')}
              className="w-full sm:w-auto bg-[#6CB937] hover:bg-[#5ca62b] text-white px-7 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <span>Download App</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <Link
              to="/weather"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Weather Updates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LOCATION & MANDI SEARCH MODAL                                           */}
      {/* ========================================================================= */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-7 shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Change Location & Mandi</h3>
                <p className="text-xs text-gray-500">Access real-time APMC mandi prices from all Indian states & districts</p>
              </div>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* GPS 1-Click Button */}
            <div className="mb-4 flex-shrink-0">
              <button
                onClick={() => {
                  detectUserGPS();
                  setIsLocationModalOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#2C8C44] font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
              >
                <LocateIcon className="w-4 h-4" />
                <span>{locDetecting ? 'Detecting your device location...' : 'Use My Exact GPS Location'}</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="mb-4 flex-shrink-0 relative">
              <input
                type="text"
                value={editLocationInput}
                onChange={(e) => setEditLocationInput(e.target.value)}
                placeholder="Type any Mandi, District or State (e.g., Khanna, Lasalgaon, Kota, Guntur, Unjha)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                autoFocus
              />
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {editLocationInput && (
                <button
                  type="button"
                  onClick={() => setEditLocationInput('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto space-y-4 pr-1 flex-1">
              {/* Dynamic Search Matches */}
              {editLocationInput.trim() ? (
                <div>
                  <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Search Results ({allMandisList.filter(m =>
                      m.name.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                      m.district.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                      m.state.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                      m.area.toLowerCase().includes(editLocationInput.toLowerCase())
                    ).length} Mandis Found)
                  </span>
                  <div className="space-y-1.5 max-h-72 overflow-y-auto">
                    {allMandisList
                      .filter(m =>
                        m.name.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                        m.district.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                        m.state.toLowerCase().includes(editLocationInput.toLowerCase()) ||
                        m.area.toLowerCase().includes(editLocationInput.toLowerCase())
                      )
                      .slice(0, 20)
                      .map(m => (
                        <div
                          key={m.id}
                          onClick={() => {
                            handleStateChange(m.state, m.name.replace(' Mandi', ''));
                            setIsLocationModalOpen(false);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-300 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start gap-2.5">
                            <StoreIcon className="w-4 h-4 text-[#2C8C44] mt-0.5 flex-shrink-0" />
                            <div>
                              <strong className="text-xs font-bold text-gray-900 group-hover:text-[#2C8C44] block">
                                {m.name}
                              </strong>
                              <span className="text-[11px] text-gray-500">{m.area}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                            {m.state}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Select by Indian State */}
                  <div>
                    <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Select by Indian State / UT ({availableStates.length} States):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto pr-1">
                      {availableStates.map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            handleStateChange(st);
                            setIsLocationModalOpen(false);
                          }}
                          className={`p-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer border truncate ${
                            selectedState === st
                              ? 'bg-[#123C26] text-white border-[#123C26]'
                              : 'bg-gray-50 hover:bg-emerald-50 hover:text-[#2C8C44] border-gray-200 text-gray-800'
                          }`}
                        >
                          📍 {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Major APMC Hubs */}
                  <div>
                    <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Major APMC Mandis (Click to Apply):
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                      {[
                        { mandi: 'Khanna Grain Market', state: 'Punjab' },
                        { mandi: 'Lasalgaon Onion Mandi', state: 'Maharashtra' },
                        { mandi: 'Unjha APMC (Spices)', state: 'Gujarat' },
                        { mandi: 'Guntur Mirchi Yard', state: 'Andhra Pradesh' },
                        { mandi: 'Kota Bhamashah Mandi', state: 'Rajasthan' },
                        { mandi: 'Karnal Grain Mandi', state: 'Haryana' },
                        { mandi: 'Indore Chhoitram Mandi', state: 'Madhya Pradesh' },
                        { mandi: 'Yeshwanthpur APMC', state: 'Karnataka' },
                        { mandi: 'Purnia Gulabbagh (Maize)', state: 'Bihar' },
                        { mandi: 'Enumamula Mandi Warangal', state: 'Telangana' },
                        { mandi: 'Koyambedu Wholesale', state: 'Tamil Nadu' },
                        { mandi: 'Koley Market Kolkata', state: 'West Bengal' },
                        { mandi: 'Azadpur Mandi Delhi', state: 'Delhi' },
                        { mandi: 'Noida Mandi', state: 'Uttar Pradesh' },
                        { mandi: 'Kanpur Mandi', state: 'Uttar Pradesh' },
                        { mandi: 'Dhalli Apple Mandi', state: 'Himachal Pradesh' },
                        { mandi: 'Parimpora Apple Mandi', state: 'Jammu and Kashmir' },
                        { mandi: 'Bhubaneswar Unit-1', state: 'Odisha' },
                        { mandi: 'Raipur APMC', state: 'Chhattisgarh' },
                        { mandi: 'Ernakulam Market', state: 'Kerala' }
                      ].map(hub => (
                        <button
                          key={hub.mandi}
                          type="button"
                          onClick={() => {
                            handleStateChange(hub.state, hub.mandi.replace(' Mandi', ''));
                            setIsLocationModalOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-50 border border-gray-200 hover:bg-[#2C8C44] hover:text-white hover:border-[#2C8C44] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                        >
                          <span>{hub.mandi}</span>
                          <span className="text-[10px] opacity-70">({hub.state})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 mt-2 border-t border-gray-100 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. COMMODITY DETAIL INSPECTION MODAL                                       */}
      {/* ========================================================================= */}
      {selectedCommodityDetail && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            {detailLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2C8C44] rounded-full animate-spin mb-3" />
                <p className="text-sm text-gray-500">Loading commodity data...</p>
              </div>
            ) : commodityDetail ? (
              <>
                <div className="flex items-start justify-between pb-4 mb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <CropIllustration type={commodityDetail.commodity.id} className="w-12 h-12" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{commodityDetail.commodity.name}</h3>
                      <p className="text-xs text-gray-500">
                        {commodityDetail.commodity.hindiName} &middot; {commodityDetail.commodity.category} &middot; {commodityDetail.commodity.season} Season
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCommodityDetail(null);
                      setCommodityDetail(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                    <span className="text-xs text-gray-500 font-semibold block mb-1">Min Price</span>
                    <strong className="text-lg text-gray-900">{formatPrice(commodityDetail.currentPrice?.min)}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-700 font-semibold block mb-1">Modal Price</span>
                    <strong className="text-xl text-emerald-800">{formatPrice(commodityDetail.currentPrice?.modal)}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                    <span className="text-xs text-gray-500 font-semibold block mb-1">Max Price</span>
                    <strong className="text-lg text-gray-900">{formatPrice(commodityDetail.currentPrice?.max)}</strong>
                  </div>
                </div>

                {commodityDetail.commodity.msp2025 && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 mb-5 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Government MSP (2025-26)</span>
                    <strong className="text-sm font-extrabold text-amber-900">
                      ₹ {commodityDetail.commodity.msp2025.toLocaleString('en-IN')} / Quintal
                    </strong>
                  </div>
                )}

                {/* State-Wise Comparison List */}
                {commodityDetail.stateWisePrices && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">State-wise Modal Price Comparison</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {commodityDetail.stateWisePrices.map((sp, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                          <span className="text-gray-500 block font-medium">{sp.state}</span>
                          <strong className="text-gray-900 text-sm">{formatPrice(sp.modalPrice)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7-Day History Chart */}
                {commodityDetail.priceHistory && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">7-Day Modal Price History</h4>
                    <div className="grid grid-cols-7 gap-1.5 h-28 items-end bg-gray-50 p-3 rounded-xl border border-gray-200">
                      {(() => {
                        const historyPrices = commodityDetail.priceHistory.map(p => p.price);
                        const maxH = Math.max(...historyPrices, 1);
                        const minH = Math.min(...historyPrices, 0);
                        const rangeH = (maxH - minH) || (maxH * 0.1) || 1;
                        return commodityDetail.priceHistory.map((d, i) => {
                          const heightPct = Math.min(95, Math.max(25, Math.round(((d.price - minH) / rangeH) * 65 + 30)));
                          return (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                              <span className="text-[9px] font-bold text-gray-700">{formatPrice(d.price)}</span>
                              <div className="w-full bg-[#2C8C44] rounded-t" style={{ height: `${heightPct}%` }} />
                              <span className="text-[9px] text-gray-400">{d.date}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedCommodityDetail(null);
                      setCommodityDetail(null);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">Could not load details.</p>
                <button
                  onClick={() => {
                    setSelectedCommodityDetail(null);
                    setCommodityDetail(null);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 text-gray-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MARKET INSIGHT ARTICLE MODAL                                            */}
      {/* ========================================================================= */}
      {activeInsightModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <CropIllustration type={activeInsightModal.type} className="w-8 h-8" />
                <div>
                  <h4 className="text-base font-bold text-gray-900">{activeInsightModal.crop} Mandi Bulletin</h4>
                  <span className="text-xs text-gray-400">{activeInsightModal.date}</span>
                </div>
              </div>
              <button onClick={() => setActiveInsightModal(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm font-bold text-gray-900 mb-2 leading-snug">{activeInsightModal.title}</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{activeInsightModal.summary}</p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-emerald-900">Price Trend Impact:</span>
              <strong className="text-xs font-bold text-emerald-700">{activeInsightModal.impact}</strong>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveInsightModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. APP DOWNLOAD MODAL                                                      */}
      {/* ========================================================================= */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
            <div className="flex justify-end">
              <button onClick={() => setIsAppModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="w-16 h-16 bg-emerald-50 text-[#2C8C44] rounded-2xl mx-auto flex items-center justify-center mb-3">
              <StoreIcon className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Get Kisan Mitra Mobile App</h3>
            <p className="text-xs text-gray-500 mb-6">
              Get personalized mandi SMS alerts, crop disease diagnosis and live market price tracking on your smartphone.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>Google Play Store</span>
              </a>
              <a
                href="https://apple.com/app-store"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>Apple App Store</span>
              </a>
            </div>

            <p className="text-[11px] text-gray-400">Available free in Hindi, English, Punjabi, Marathi and Gujarati</p>
          </div>
        </div>
      )}

    </div>
  );
}
