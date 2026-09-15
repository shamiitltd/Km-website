import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import heroFarmer from "../assets/hero.png";
import cta_plant from "../assets/cta_plant.png";
import { showComingSoon } from "../utils/comingSoon";

// API Base resolution
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Verified Fallback Images
const FALLBACK_CROP_IMG = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80";
const FALLBACK_PEST_IMG = "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80";

// ============================================================================
// PURE VECTOR SVG ICONS (NO EMOJIS ANYWHERE)
// ============================================================================

function MapPinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SproutIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.3.9-4.9 2z" />
    </svg>
  );
}

function CloudRainIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrendingUpIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function DropletIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function BugIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="14" x="8" y="6" rx="4" />
      <path d="m19 7-3 2" />
      <path d="m5 7 3 2" />
      <path d="m19 19-3-2" />
      <path d="m5 19 3-2" />
      <path d="M20 13h-4" />
      <path d="M4 13h4" />
      <path d="m10 4 1 2" />
      <path d="m14 4-1 2" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SunIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function WindIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function PhoneCallIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FileTextIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function CalculatorIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function CameraIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function AwardIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function LandmarkIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function BookOpenIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ThermometerIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function LayersIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 20 7 4 7" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function SearchIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </svg>
  );
}

function CompassIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

// ============================================================================
// ALL 26 MARKETPLACE CROPS (100% Tested & Verified Real Images)
// ============================================================================

const ALL_INDIAN_CROPS = [
  { id: "wheat", name: "Wheat", hindiName: "गेहूं", category: "Cereals & Grains", season: "Rabi", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80" },
  { id: "rice", name: "Rice (Paddy)", hindiName: "धान", category: "Cereals & Grains", season: "Kharif", image: "https://static.vecteezy.com/system/resources/thumbnails/018/773/562/small_2x/jasmine-white-rice-in-wooden-bowl-with-gold-grain-from-agriculture-farm-photo.jpg" },
  { id: "maize", name: "Maize (Corn)", hindiName: "मक्का", category: "Cereals & Grains", season: "Kharif / Rabi", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80" },
  { id: "sugarcane", name: "Sugarcane", hindiName: "गन्ना", category: "Commercial & Cash", season: "Annual", image: "https://www.shutterstock.com/shutterstock/photos/2191190429/display_1500/stock-photo-sugarcane-field-with-full-grown-crop-sugar-cane-agricultural-economy-sugarcane-is-a-grass-of-2191190429.jpg" },
  { id: "cotton", name: "Cotton", hindiName: "कपास", category: "Commercial & Cash", season: "Kharif", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=80" },
  { id: "mustard", name: "Mustard (Sarson)", hindiName: "सरसों", category: "Oilseeds", season: "Rabi", image: "https://media.istockphoto.com/id/1444066039/photo/mustard-farming-in-india.jpg?s=170667a&w=0&k=20&c=qqhtUQPIFPSbTgQasBxJDYY2o6GyciQQ8FH-XD1h0WE=" },
  { id: "soybean", name: "Soybean", hindiName: "सोयाबीन", category: "Oilseeds", season: "Kharif", image: "https://png.pngtree.com/thumb_back/fw800/background/20220318/pngtree-soybean-hd-photography-material-image_1023175.jpg" },
  { id: "gram", name: "Gram / Chana", hindiName: "चना", category: "Pulses & Legumes", season: "Rabi", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80" },
  { id: "groundnut", name: "Groundnut", hindiName: "मूंगफली", category: "Oilseeds", season: "Kharif / Summer", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80" },
  { id: "tur", name: "Pigeon Pea (Tur/Arhar)", hindiName: "अरहर", category: "Pulses & Legumes", season: "Kharif", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Cajanus_cajan_blanco1.173.png" },
  { id: "moong", name: "Green Gram (Moong)", hindiName: "मूंग", category: "Pulses & Legumes", season: "Kharif / Summer", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Vigna_radiata_001.JPG" },
  { id: "urad", name: "Black Gram (Urad)", hindiName: "उड़द", category: "Pulses & Legumes", season: "Kharif / Spring", image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Vigna_mungo_001.JPG" },
  { id: "bajra", name: "Pearl Millet (Bajra)", hindiName: "बाजरा", category: "Millets & Cereals", season: "Kharif", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Pennisetum_glaucum_Taeni.jpg" },
  { id: "jowar", name: "Sorghum (Jowar)", hindiName: "ज्वार", category: "Millets & Cereals", season: "Kharif / Rabi", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Sorghum_bicolor_002.JPG" },
  { id: "tomato", name: "Tomato", hindiName: "टमाटर", category: "Vegetables", season: "Year-round", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80" },
  { id: "potato", name: "Potato", hindiName: "आलू", category: "Vegetables", season: "Rabi", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" },
  { id: "onion", name: "Onion", hindiName: "प्याज़", category: "Vegetables", season: "Rabi / Kharif", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80" },
  { id: "chilli", name: "Chilli (Mirch)", hindiName: "मिर्च", category: "Spices & Condiments", season: "Kharif / Rabi", image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80" },
  { id: "turmeric", name: "Turmeric (Haldi)", hindiName: "हल्दी", category: "Spices & Condiments", season: "Annual", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80" },
  { id: "cumin", name: "Cumin (Jeera)", hindiName: "जीरा", category: "Spices & Condiments", season: "Rabi", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Cuminum_cyminum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-052.jpg" },
  { id: "garlic", name: "Garlic (Lahsun)", hindiName: "लहसुन", category: "Vegetables", season: "Rabi", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Garlic_and_cross_section.jpg" },
  { id: "ginger", name: "Ginger (Adrak)", hindiName: "अदरक", category: "Spices & Condiments", season: "Annual", image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg" },
  { id: "apple", name: "Apple", hindiName: "सेब", category: "Fruits & Plantation", season: "Temperate", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { id: "banana", name: "Banana", hindiName: "केला", category: "Fruits & Plantation", season: "Tropical", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { id: "barley", name: "Barley (Jau)", hindiName: "जौ", category: "Cereals & Grains", season: "Rabi", image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Barley_field_in_summer.JPG" },
  { id: "jute", name: "Jute (Patson)", hindiName: "पटसन", category: "Commercial & Cash", season: "Kharif", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Jute_cultivation_in_Bangladesh.JPG" }
];

const CROP_CATEGORIES = [
  "All Crops",
  "Cereals & Grains",
  "Pulses & Legumes",
  "Oilseeds",
  "Commercial & Cash",
  "Vegetables",
  "Spices & Condiments",
  "Millets & Cereals",
  "Fruits & Plantation"
];

// ============================================================================
// ALL 28 STATES & 8 UNION TERRITORIES (ALL-INDIA COVERAGE)
// ============================================================================

const ALL_INDIAN_REGIONS = [
  { state: "Uttar Pradesh", districts: ["Noida", "Lucknow", "Varanasi", "Kanpur", "Agra", "Meerut", "Prayagraj", "Gorakhpur", "Bareilly", "Aligarh", "Mathura", "Bulandshahr"] },
  { state: "Punjab", districts: ["Ludhiana", "Amritsar", "Bathinda", "Jalandhar", "Patiala", "Sangrur", "Firozpur", "Mansa", "Hoshiarpur"] },
  { state: "Haryana", districts: ["Karnal", "Hisar", "Ambala", "Sirsa", "Kurukshetra", "Rohtak", "Sonipat", "Fatehabad", "Panipat"] },
  { state: "Madhya Pradesh", districts: ["Indore", "Bhopal", "Ujjain", "Jabalpur", "Gwalior", "Sagar", "Dewas", "Hoshangabad", "Neemuch", "Mandsaur"] },
  { state: "Maharashtra", districts: ["Nashik", "Nagpur", "Pune", "Aurangabad", "Kolhapur", "Solapur", "Ahmednagar", "Jalgaon", "Amravati", "Akola", "Nanded"] },
  { state: "Rajasthan", districts: ["Jaipur", "Jodhpur", "Kota", "Sri Ganganagar", "Bikaner", "Alwar", "Nagaur", "Hanumangarh", "Udaipur", "Bharatpur"] },
  { state: "Gujarat", districts: ["Rajkot", "Ahmedabad", "Surat", "Junagadh", "Vadodara", "Bhavnagar", "Gondal", "Amreli", "Banaskantha", "Mehsana"] },
  { state: "Bihar", districts: ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Nalanda", "Samastipur", "Purnia", "Rohtas", "Darbhanga"] },
  { state: "West Bengal", districts: ["Kolkata", "Purba Bardhaman", "Hooghly", "Murshidabad", "Siliguri", "Nadia", "Malda", "Bankura", "Birbhum"] },
  { state: "Karnataka", districts: ["Bengaluru", "Mysuru", "Belagavi", "Kalaburagi", "Hubballi-Dharwad", "Shivamogga", "Vijayapura", "Ballari", "Raichur"] },
  { state: "Andhra Pradesh", districts: ["Guntur", "Visakhapatnam", "Krishna", "Kurnool", "Chittoor", "East Godavari", "West Godavari", "Anantapur", "Nellore"] },
  { state: "Telangana", districts: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Nalgonda", "Khammam", "Mahabubnagar", "Adilabad"] },
  { state: "Tamil Nadu", districts: ["Coimbatore", "Chennai", "Thanjavur", "Madurai", "Salem", "Erode", "Tiruchirappalli", "Dindigul", "Tirunelveli"] },
  { state: "Kerala", districts: ["Ernakulam", "Palakkad", "Wayanad", "Idukki", "Alappuzha", "Thrissur", "Kottayam", "Kozhikode"] },
  { state: "Odisha", districts: ["Cuttack", "Bhubaneswar", "Sambalpur", "Bargarh", "Balasore", "Ganjam", "Kalahandi", "Koraput"] },
  { state: "Chhattisgarh", districts: ["Raipur", "Durg", "Bilaspur", "Rajnandgaon", "Bastar", "Janjgir-Champa", "Dhamtari"] },
  { state: "Jharkhand", districts: ["Ranchi", "Dhanbad", "Jamshedpur", "Hazaribagh", "Deoghar", "Bokaro", "Dumka"] },
  { state: "Assam", districts: ["Guwahati", "Nagaon", "Sonitpur", "Jorhat", "Cachar", "Dibrugarh", "Barpeta", "Tinsukia"] },
  { state: "Himachal Pradesh", districts: ["Shimla", "Kullu", "Kangra", "Mandi", "Solan", "Chamba", "Sirmaur", "Una"] },
  { state: "Uttarakhand", districts: ["Dehradun", "Haridwar", "Udham Singh Nagar", "Nainital", "Pauri Garhwal", "Almora"] },
  { state: "Jammu and Kashmir", districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Pulwama", "Kathua", "Udhampur", "Shopian"] },
  { state: "Delhi", districts: ["New Delhi", "Azadpur", "North Delhi", "South Delhi", "West Delhi", "East Delhi"] },
  { state: "Chandigarh", districts: ["Chandigarh (Sector 26)"] },
  { state: "Goa", districts: ["North Goa (Panaji)", "South Goa (Margao)"] },
  { state: "Arunachal Pradesh", districts: ["Papum Pare (Itanagar)", "Changlang", "West Kameng", "Pasighat"] },
  { state: "Manipur", districts: ["Imphal West", "Imphal East", "Thoubal", "Bishnupur"] },
  { state: "Meghalaya", districts: ["East Khasi Hills (Shillong)", "West Garo Hills", "Ri-Bhoi"] },
  { state: "Mizoram", districts: ["Aizawl", "Lunglei", "Champhai", "Kolasib"] },
  { state: "Nagaland", districts: ["Kohima", "Dimapur", "Mokokchung", "Wokha"] },
  { state: "Sikkim", districts: ["East Sikkim (Gangtok)", "West Sikkim", "South Sikkim (Namchi)"] },
  { state: "Tripura", districts: ["West Tripura (Agartala)", "Gomati", "North Tripura"] },
  { state: "Ladakh", districts: ["Leh", "Kargil"] },
  { state: "Puducherry", districts: ["Puducherry", "Karaikal", "Yanam"] },
  { state: "Andaman and Nicobar Islands", districts: ["Port Blair", "Nicobar"] },
  { state: "Dadra and Nagar Haveli and Daman and Diu", districts: ["Silvassa", "Daman", "Diu"] },
  { state: "Lakshadweep", districts: ["Kavaratti", "Agatti"] }
];

export default function CropAdvisory() {
  // Core state
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [selectedCategory, setSelectedCategory] = useState("All Crops");
  const [location, setLocation] = useState("Noida, Uttar Pradesh");
  const [activeSubTab, setActiveSubTab] = useState("Overview");
  const [data, setData] = useState(null);
  const [gpsDetecting, setGpsDetecting] = useState(false);

  // Custom Tailwind Modal Dialogs (Zero native alerts!)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isPestDiagnosisModalOpen, setIsPestDiagnosisModalOpen] = useState(false);
  const [isGovSchemesModalOpen, setIsGovSchemesModalOpen] = useState(false);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  const [isContactComingSoonModalOpen, setIsContactComingSoonModalOpen] = useState(false);
  const [selectedPestModal, setSelectedPestModal] = useState(null);
  const [selectedRecommendationModal, setSelectedRecommendationModal] = useState(null);

  // Location search and filter state
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("All States");

  // Fertilizer calculator state
  const [calcAcres, setCalcAcres] = useState(2);
  const [calcSoil, setCalcSoil] = useState("Sandy Loam");
  const [calcResult, setCalcResult] = useState(null);

  // Fetch Crop Advisory from backend
  const fetchAdvisory = useCallback(async (cropId = selectedCrop, loc = location, lat = null, lon = null) => {
    try {
      let url = `${API_BASE}/crop-advisory?crop=${encodeURIComponent(cropId)}&location=${encodeURIComponent(loc)}`;
      if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch crop advisory:", err);
    }
  }, [selectedCrop, location]);

  // Initial automatic geolocation detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const nominatimBase = import.meta.env.VITE_NOMINATIM_URL || 'https://nominatim.openstreetmap.org/reverse';
          try {
            const res = await fetch(`${nominatimBase}?lat=${latitude}&lon=${longitude}&format=json`);
            if (res.ok) {
              const geoJson = await res.json();
              const dist = geoJson.address?.state_district || geoJson.address?.county || geoJson.address?.city || geoJson.address?.town || "Delhi";
              const st = geoJson.address?.state || "Delhi";
              const detectedLoc = `${dist.replace(' District', '')}, ${st}`;
              setLocation(detectedLoc);
              fetchAdvisory(selectedCrop, detectedLoc, latitude, longitude);
              return;
            }
          } catch {
            // ignore network err
          }
          fetchAdvisory(selectedCrop, location, latitude, longitude);
        },
        () => {
          fetchAdvisory(selectedCrop, location);
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAdvisory(selectedCrop, location);
    }
  }, [fetchAdvisory, location, selectedCrop]);

  // Trigger re-fetch on crop or location change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAdvisory(selectedCrop, location);
  }, [selectedCrop, location, fetchAdvisory]);

  // Handle switching crops
  const handleCropSelect = (cropId) => {
    setSelectedCrop(cropId);
  };

  // Trigger GPS detection manually from modal
  const handleDetectGPS = () => {
    if (!navigator.geolocation) return;
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const nominatimBase = import.meta.env.VITE_NOMINATIM_URL || 'https://nominatim.openstreetmap.org/reverse';
        try {
          const res = await fetch(`${nominatimBase}?lat=${latitude}&lon=${longitude}&format=json`);
          if (res.ok) {
            const geoJson = await res.json();
            const dist = geoJson.address?.state_district || geoJson.address?.county || geoJson.address?.city || geoJson.address?.town || "Detected Location";
            const st = geoJson.address?.state || "India";
            const detectedLoc = `${dist.replace(' District', '')}, ${st}`;
            setLocation(detectedLoc);
            fetchAdvisory(selectedCrop, detectedLoc, latitude, longitude);
            setIsLocationModalOpen(false);
            setGpsDetecting(false);
            return;
          }
        } catch {
          // ignore
        }
        setLocation("Current Location, India");
        fetchAdvisory(selectedCrop, "Current Location, India", latitude, longitude);
        setIsLocationModalOpen(false);
        setGpsDetecting(false);
      },
      () => {
        setGpsDetecting(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Run fertilizer calculation
  const handleRunFertilizerCalc = useCallback(async (acres = calcAcres, soil = calcSoil) => {
    try {
      const res = await fetch(
        `${API_BASE}/crop-advisory/calculate-fertilizer?crop=${selectedCrop}&landArea=${acres}&soilType=${encodeURIComponent(soil)}`
      );
      const json = await res.json();
      if (json.success) {
        setCalcResult(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedCrop, calcAcres, calcSoil]);

  useEffect(() => {
    if (isCalculatorModalOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleRunFertilizerCalc(calcAcres, calcSoil);
    }
  }, [isCalculatorModalOpen, calcAcres, calcSoil, handleRunFertilizerCalc]);

  // Lock body scrolling when any modal is open
  const isAnyModalOpen = Boolean(
    isLocationModalOpen ||
    isCalculatorModalOpen ||
    isGuideModalOpen ||
    isPestDiagnosisModalOpen ||
    isGovSchemesModalOpen ||
    isBenefitsModalOpen ||
    isAppDownloadModalOpen ||
    isContactComingSoonModalOpen ||
    selectedPestModal ||
    selectedRecommendationModal
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

  // Filter crops by category
  const filteredCrops = selectedCategory === "All Crops"
    ? ALL_INDIAN_CROPS
    : ALL_INDIAN_CROPS.filter(c => c.category === selectedCategory);

  // Filter regions for location modal
  const filteredRegions = ALL_INDIAN_REGIONS.filter(reg => {
    if (selectedStateFilter !== "All States" && reg.state !== selectedStateFilter) return false;
    if (!locationSearchQuery.trim()) return true;
    const query = locationSearchQuery.toLowerCase();
    const stateMatch = reg.state.toLowerCase().includes(query);
    const distMatch = reg.districts.some(d => d.toLowerCase().includes(query));
    return stateMatch || distMatch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-900 font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION - Clean Agricultural Design & Authentic Imagery           */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[500px] flex items-center bg-white border-b border-gray-100 overflow-hidden">
        {/* Right-aligned Indian Farmer Hero Photo */}
        <div className="absolute inset-0 w-full h-full z-0 flex justify-end pointer-events-none">
          <img
            src={heroFarmer}
            alt=""
            className="hidden md:block w-[55%] lg:w-[48%] h-full object-cover object-[center_top]"
          />
        </div>

        {/* Seamless Multi-Stop Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, #ffffff 52%, rgba(255, 255, 255, 0.96) 58%, rgba(255, 255, 255, 0.68) 72%, rgba(255, 255, 255, 0.2) 86%, transparent 100%)",
          }}
        />

        {/* Content Container */}
        <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-20 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 max-w-[46rem]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C8C44] text-xs md:text-sm font-bold tracking-wider uppercase mb-4">
                <BookOpenIcon className="w-4 h-4" />
                <span>All-India Agricultural Agronomy Handbook</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.15] mb-5">
                Scientific Guide for <br />
                Healthy Crops & <span className="text-[#2C8C44]">Maximized Yields</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-[20px] mb-8 max-w-2xl leading-relaxed">
                Authentic Package of Practices, stage-by-stage agronomy, NPK fertilizer schedules, and comprehensive pest remedies curated from ICAR, IARI, and State Agricultural Universities across India.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                {/* 1. All-India Crop Coverage */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/90 border border-gray-100 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2">
                    <SproutIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    All-India <br />
                    26+ Crops
                  </span>
                </div>

                {/* 2. Real-Time Field Weather */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/90 border border-gray-100 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                    <CloudRainIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Real-Time <br />
                    Agro-Meteorology
                  </span>
                </div>

                {/* 3. ICAR & SAU Standards */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-white/90 border border-gray-100 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2C8C44] flex items-center justify-center mb-2">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    ICAR & SAU <br />
                    Field Standards
                  </span>
                </div>

                {/* 4. Increase Yield & Profit */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                    <TrendingUpIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Yield & Profit <br />
                    Optimization
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Location & Crop Selector Card (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative z-20">
                {/* Location row with State-Adaptive Indicator */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-gray-900 font-bold text-base truncate">
                    <MapPinIcon className="w-5 h-5 text-[#2C8C44] flex-shrink-0" />
                    <span className="truncate">{location}</span>
                  </div>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-sm font-bold text-[#2C8C44] hover:underline ml-2 cursor-pointer flex-shrink-0"
                  >
                    Change Region
                  </button>
                </div>

                {/* Crop Dropdown select */}
                <div className="relative mb-6">
                  <label className="block text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Select Agricultural Crop
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCrop}
                      onChange={(e) => handleCropSelect(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2C8C44] cursor-pointer"
                    >
                      {ALL_INDIAN_CROPS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.hindiName}) · {c.category}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Regional Sowing Variety Alert */}
                {data?.crop?.regionalVariety && (
                  <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <span className="font-bold text-emerald-900 block mb-0.5">
                      Recommended Varieties for {data.agronomySpecs?.state}:
                    </span>
                    <span>{data.crop.regionalVariety}</span>
                  </div>
                )}

                {/* CTA Action Button */}
                <button
                  onClick={() => {
                    fetchAdvisory(selectedCrop, location);
                    const el = document.getElementById("crop-encyclopedia");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-[#123C26] hover:bg-[#1a5234] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mb-3"
                >
                  <span>Explore Crop Guide</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                {/* Footnote */}
                <p className="text-center text-xs text-gray-500 font-medium">
                  All 28 States & 8 UTs Supported · ICAR Standard Database
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY TABS & VISUAL CROP SELECTOR STRIP WITH REAL IMAGES             */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-b border-gray-200 shadow-2xs sticky top-[72px] z-30">
        <div className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 py-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-2 border-b border-gray-100">
            {CROP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#123C26] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Visual Crops Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {filteredCrops.map((crop) => {
              const isSelected = selectedCrop === crop.id;

              return (
                <button
                  key={crop.id}
                  onClick={() => handleCropSelect(crop.id)}
                  className={`flex items-center gap-3 min-w-[170px] sm:min-w-[190px] p-2 rounded-xl border transition-all cursor-pointer flex-shrink-0 text-left ${
                    isSelected
                      ? "border-[#2C8C44] bg-[#2C8C44]/10 shadow-xs ring-2 ring-[#2C8C44]/20"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white"
                  }`}
                >
                  <img
                    src={crop.image}
                    alt=""
                    onError={(e) => { e.target.src = FALLBACK_CROP_IMG; }}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-gray-200 shadow-2xs"
                  />
                  <div className="truncate">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block truncate">
                      {crop.name}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium block">
                      {crop.hindiName} · {crop.season}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN DASHBOARD - Two Column Architecture (Left 8 Cols, Right 4 Cols)    */}
      {/* ========================================================================= */}
      <main
        id="crop-encyclopedia"
        className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Comprehensive Crop Encyclopedia & Field Practices (8 Cols)*/}
          {/* ===================================================================== */}
          <div className="lg:col-span-8 space-y-7">
            {/* A. CROP HERO BANNER & SCIENTIFIC SPEC CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header with Crop Banner Image */}
              <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
                <img
                  src={data?.crop?.cropImage || FALLBACK_CROP_IMG}
                  alt=""
                  onError={(e) => { e.target.src = FALLBACK_CROP_IMG; }}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#2C8C44] text-white text-xs font-bold uppercase tracking-wider">
                        {data?.crop?.category || "Cereals & Grains"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-xs font-semibold">
                        {data?.crop?.season || "Rabi"} Season
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {data?.crop?.name || "Wheat"} ({data?.crop?.hindiName || "गेहूं"})
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs sm:text-sm font-bold backdrop-blur-xs shadow-md">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>ICAR Verified Field Guide</span>
                  </div>
                </div>
              </div>

              {/* Sub-Tabs Bar */}
              <div className="px-6 border-b border-gray-100">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                  {[
                    "Overview",
                    "Growth Stages",
                    "Irrigation Schedule",
                    "Fertilizer (NPK)",
                    "Pests & Diseases",
                    "Package of Practices",
                    "Next 15 Days Plan",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSubTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                        activeSubTab === tab
                          ? "bg-[#123C26] text-white shadow-2xs"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Tab Content Area */}
              <div className="p-6 md:p-8">
                {/* 1. OVERVIEW SUB-TAB */}
                {activeSubTab === "Overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      {/* Active Growth Stage Box (7 Cols) */}
                      <div className="md:col-span-7 p-6 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                              <SproutIcon className="w-8 h-8 text-[#2C8C44]" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
                                Primary Growth Phase
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                {data?.stage?.name || "Tillering Stage"}
                              </h3>
                              <span className="text-xs font-semibold text-[#2C8C44] mt-0.5 block">
                                Duration: {data?.stage?.rangeDays || "25 - 45 Days"}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {data?.stage?.description ||
                              "Critical vegetative growth phase. Focus on balanced nitrogen nutrition, timely irrigation, and proactive weed management."}
                          </p>
                        </div>

                        <button
                          onClick={() => setIsGuideModalOpen(true)}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C8C44] hover:text-[#1e5c2e] transition-colors cursor-pointer"
                        >
                          <FileTextIcon className="w-4 h-4" />
                          <span>View Complete Package of Practices</span>
                        </button>
                      </div>

                      {/* Growing Conditions Assessment Gauge (5 Cols) */}
                      <div className="md:col-span-5 p-6 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                          Agro-Climatic Suitability
                        </span>

                        <div className="flex items-center gap-4 my-auto py-2">
                          {/* Circular Gauge */}
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-gray-200"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-[#2C8C44]"
                                strokeDasharray={`${data?.health?.score || 92}, 100`}
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                              <span className="text-xs font-bold text-gray-900">
                                {data?.health?.score || 92}%
                              </span>
                            </div>
                          </div>

                          {/* Checklist */}
                          <ul className="space-y-1.5 text-xs font-medium text-gray-700 min-w-0">
                            {(data?.health?.checklist || [
                              "Optimal thermal band",
                              "Low pest incidence",
                              "Adequate soil moisture",
                              "Standard ICAR protocol",
                            ]).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2C8C44] flex-shrink-0 mt-1" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2.5 border-t border-gray-200/60 text-[11px] text-gray-500 text-right">
                          Evaluation: <strong className="text-gray-900">{data?.health?.status || "Optimal"}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. GROWTH STAGES TIMELINE SUB-TAB */}
                {activeSubTab === "Growth Stages" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Complete Lifecycle & Growth Stages Timeline ({data?.crop?.totalDurationDays || 125} Total Days)
                    </h4>
                    <div className="space-y-3">
                      {(data?.allStages || []).map((stg, idx) => (
                        <div
                          key={stg.id || idx}
                          className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#123C26] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-gray-900">
                                {stg.name}
                              </h5>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {stg.description}
                              </p>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#2C8C44] whitespace-nowrap self-start md:self-center">
                            Day {stg.range[0]} - {stg.range[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. IRRIGATION SCHEDULE SUB-TAB */}
                {activeSubTab === "Irrigation Schedule" && (
                  <div className="p-6 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-4">
                    <div className="flex items-center gap-2.5 text-sky-950 font-bold text-base">
                      <DropletIcon className="w-5 h-5 text-sky-600" />
                      <span>Scientific Irrigation Benchmark for {data?.crop?.name}</span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      {data?.agronomicRecommendations?.[0]?.details ||
                        "Field soil moisture must be maintained above 50% available water capacity. Provide 5-6 cm light irrigation at critical physiological milestones."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-xs font-bold text-sky-800 block mb-1">Water Requirement:</span>
                        <span className="text-sm text-gray-800 font-semibold">{data?.crop?.rainfall || "75 - 100 cm"}</span>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-xs font-bold text-sky-800 block mb-1">Critical Stages:</span>
                        <span className="text-sm text-gray-800 font-semibold">CRI, Tillering, Booting & Milking</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. FERTILIZER (NPK) SCHEDULE SUB-TAB */}
                {activeSubTab === "Fertilizer (NPK)" && (
                  <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-base">
                        <SproutIcon className="w-5 h-5 text-emerald-600" />
                        <span>ICAR Recommended N:P:K Dose ({data?.crop?.standardNPK?.ratio || "120:60:40 kg/ha"})</span>
                      </div>
                      <button
                        onClick={() => setIsCalculatorModalOpen(true)}
                        className="text-xs font-bold bg-[#123C26] text-white px-3 py-1.5 rounded-lg hover:bg-[#1a5234] cursor-pointer"
                      >
                        Acreage Calculator
                      </button>
                    </div>

                    <p className="text-sm text-slate-800 leading-relaxed">
                      {data?.agronomicRecommendations?.[1]?.details ||
                        "Balanced nutrient application ensures stout tillering and lodging resistance. Apply full Phosphorus and Potash at sowing, and split Nitrogen in 2 top-dressings with irrigation."}
                    </p>

                    <div className="grid grid-cols-3 gap-3 text-center pt-2">
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                        <span className="text-xs text-gray-500 block">Nitrogen (N)</span>
                        <strong className="text-base text-gray-900">{data?.crop?.standardNPK?.n || 48} kg/acre</strong>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Urea (46% N)</span>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                        <span className="text-xs text-gray-500 block">Phosphorus (P₂O₅)</span>
                        <strong className="text-base text-gray-900">{data?.crop?.standardNPK?.p || 24} kg/acre</strong>
                        <span className="text-[10px] text-gray-400 block mt-0.5">DAP (18-46-0)</span>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                        <span className="text-xs text-gray-500 block">Potassium (K₂O)</span>
                        <strong className="text-base text-gray-900">{data?.crop?.standardNPK?.k || 16} kg/acre</strong>
                        <span className="text-[10px] text-gray-400 block mt-0.5">MOP (60% K₂O)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. PESTS & DISEASES SUB-TAB */}
                {activeSubTab === "Pests & Diseases" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Key Pests & Pathogens for {data?.crop?.name}
                      </h4>
                      <button
                        onClick={() => setIsPestDiagnosisModalOpen(true)}
                        className="text-xs font-bold text-[#2C8C44] hover:underline cursor-pointer"
                      >
                        Visual Symptom Library
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(data?.pestsAndDiseases || []).map((pest, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 flex flex-col justify-between"
                        >
                          <div>
                            <div className="h-32 w-full rounded-lg overflow-hidden mb-3 border border-gray-200 bg-slate-100">
                              <img
                                src={pest.imageUrl}
                                alt=""
                                onError={(e) => { e.target.src = FALLBACK_PEST_IMG; }}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-bold text-gray-900">{pest.name}</h5>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                pest.risk === "High" ? "bg-rose-100 text-rose-800" : pest.risk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                              }`}>
                                {pest.risk} Risk
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 italic mb-2">{pest.scientificName}</p>
                            <p className="text-xs text-gray-700 leading-relaxed mb-3">{pest.symptoms}</p>
                          </div>

                          <button
                            onClick={() => setSelectedPestModal(pest)}
                            className="w-full py-2 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer shadow-2xs text-center"
                          >
                            View Treatment Protocol
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. PACKAGE OF PRACTICES SUB-TAB */}
                {activeSubTab === "Package of Practices" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Agronomic Package of Practices (ICAR & KVK Standards)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                        <strong className="text-[#2C8C44] block mb-1">1. Seed Rate & Sowing:</strong>
                        <span>{data?.crop?.seedRate || "40-45 kg/acre"}. Spacing: {data?.crop?.spacing || "20-22.5 cm row-to-row"}.</span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                        <strong className="text-[#2C8C44] block mb-1">2. Soil Suitability:</strong>
                        <span>{data?.crop?.soilSuitability || "Well-drained loams and clay loams with pH 6.0-7.5"}.</span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                        <strong className="text-[#2C8C44] block mb-1">3. Major Growing States:</strong>
                        <span>{data?.crop?.majorStates || "Punjab, Haryana, UP, MP, Rajasthan, Bihar"}.</span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                        <strong className="text-[#2C8C44] block mb-1">4. Thermal Range:</strong>
                        <span>Optimal temperature: {data?.crop?.optimalTemp?.min || 12}°C - {data?.crop?.optimalTemp?.max || 25}°C.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. NEXT 15 DAYS PLAN SUB-TAB */}
                {activeSubTab === "Next 15 Days Plan" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Agronomic Action Plan (Next 15 Days)
                    </h4>
                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                        <span className="font-bold text-[#2C8C44] min-w-[80px]">Days 1 - 3:</span>
                        <span className="text-gray-800">Inspect field soil moisture and procure required Neem-Coated Urea and micronutrients.</span>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                        <span className="font-bold text-[#2C8C44] min-w-[80px]">Days 4 - 6:</span>
                        <span className="text-gray-800">Apply light surface irrigation (5 cm depth) across all planted beds in calm wind conditions.</span>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                        <span className="font-bold text-[#2C8C44] min-w-[80px]">Days 7 - 10:</span>
                        <span className="text-gray-800">Broadcast top-dress Nitrogen fertilizer into moist soil conditions at prescribed rate.</span>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                        <span className="font-bold text-[#2C8C44] min-w-[80px]">Days 11 - 15:</span>
                        <span className="text-gray-800">Inspect border rows and lower leaves for early pest or rust pustules; clear weed hosts from bunds.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* B. SCIENTIFIC RECOMMENDATIONS GRID */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#123C26] flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Scientific Agronomic Guidelines
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Standard ICAR package of practices mapped to current seasonal telemetry
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#2C8C44] text-xs font-bold self-start sm:self-center border border-emerald-200 shadow-2xs">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>National Agricultural Standards</span>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {(data?.agronomicRecommendations || []).map((rec, idx) => (
                  <div
                    key={rec.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-gray-50/90 border border-gray-200/80 flex flex-col justify-between hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        {rec.category.includes("Irrigation") && <DropletIcon className="w-5 h-5 text-sky-600" />}
                        {rec.category.includes("Nutrient") && <SproutIcon className="w-5 h-5 text-emerald-600" />}
                        {rec.category.includes("Pest") && <BugIcon className="w-5 h-5 text-amber-600" />}
                        {rec.category.includes("Agronomic") && <StarIcon className="w-5 h-5 text-emerald-600" />}
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {rec.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                        {rec.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedRecommendationModal(rec)}
                      className="w-full py-2.5 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-xs font-bold text-gray-800 transition-colors cursor-pointer text-center shadow-2xs"
                    >
                      {rec.actionLabel || "View Details"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* C. AGRO-METEOROLOGY & MANDI PRICE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather Forecast Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <SunIcon className="w-5 h-5 text-amber-500" />
                      <h4 className="text-base font-bold text-gray-900">
                        Agro-Meteorology ({data?.weather?.locationName || "Noida"})
                      </h4>
                    </div>
                    <Link
                      to="/weather"
                      className="text-xs font-bold text-[#2C8C44] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>7-Day Radar</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {data?.weather?.temperature || 28}°C
                      </div>
                      <div className="text-xs font-semibold text-gray-600 mt-0.5">
                        {data?.weather?.condition || "Partly Cloudy"}
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1.5 justify-end">
                        <DropletIcon className="w-3.5 h-3.5 text-sky-500" />
                        <span>Humidity: <strong className="text-gray-900">{data?.weather?.humidity || 62}%</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <WindIcon className="w-3.5 h-3.5 text-teal-500" />
                        <span>Wind: <strong className="text-gray-900">{data?.weather?.windSpeed || 12} km/h</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5-Day Mini Forecast Strip */}
                <div className="grid grid-cols-5 gap-1.5 pt-3 border-t border-gray-100 text-center">
                  {(data?.weather?.dailyForecast || []).map((day, idx) => (
                    <div key={idx} className="p-1.5 rounded-xl bg-gray-50">
                      <span className="text-[10px] font-bold text-gray-600 block mb-0.5">
                        {day.day}
                      </span>
                      <div className="w-4 h-4 mx-auto my-0.5 flex items-center justify-center">
                        {day.icon === "rain" ? (
                          <CloudRainIcon className="w-3.5 h-3.5 text-sky-600" />
                        ) : (
                          <SunIcon className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-gray-900 block">
                        {day.maxTemp}°/{day.minTemp}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* APMC Mandi Benchmark Price Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <AwardIcon className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-base font-bold text-gray-900">
                        Mandi Benchmark Price
                      </h4>
                    </div>
                    <span className="text-[11px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">
                      APMC e-NAM
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-500 font-semibold block">
                        {data?.mandiPrice?.marketName || "Noida Mandi"}
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">
                        {data?.mandiPrice?.formattedPrice || "₹ 2,450 / Quintal"}
                      </div>
                      <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">
                        {data?.mandiPrice?.mspPrice ? `Official CACP MSP: ₹${data.mandiPrice.mspPrice} / Qtl` : 'Market Driven Modal Price'}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shadow-2xs mb-1 mx-auto">
                        <img
                          src={data?.crop?.cropImage || FALLBACK_CROP_IMG}
                          alt=""
                          onError={(e) => { e.target.src = FALLBACK_CROP_IMG; }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C8C44]">
                        <TrendingUpIcon className="w-3.5 h-3.5" />
                        <span>+{data?.mandiPrice?.priceChangePct || 2.5}%</span>
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/market-prices"
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                >
                  <span>Explore All Mandi Rates</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-gray-500" />
                </Link>
              </div>
            </div>

            {/* D. PESTS & DISEASES VISUAL GALLERY */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Common Pests & Diseases ({data?.crop?.name || "Wheat"})
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Visual diagnostic gallery with ICAR-approved organic and chemical remedies
                  </p>
                </div>
                <button
                  onClick={() => setIsPestDiagnosisModalOpen(true)}
                  className="text-xs font-bold text-[#2C8C44] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Pest Diagnosis Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(data?.pestsAndDiseases || []).map((pest, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Diagnostic Photo */}
                      <div className="w-full h-32 rounded-xl overflow-hidden border border-gray-200 mb-3 relative bg-slate-100">
                        <img
                          src={pest.imageUrl}
                          alt=""
                          onError={(e) => { e.target.src = FALLBACK_PEST_IMG; }}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-gray-800 bg-white/95 px-2 py-0.5 rounded shadow-2xs">
                          {pest.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {pest.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pest.risk === "High"
                              ? "bg-rose-100 text-rose-800"
                              : pest.risk === "Medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {pest.risk}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 italic mb-2">
                        {pest.scientificName}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                        {pest.symptoms}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPestModal(pest)}
                      className="w-full py-2 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#2C8C44] hover:bg-emerald-50 transition-colors cursor-pointer text-center shadow-2xs"
                    >
                      Remedy & Control
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Sidebar (Agronomy Specs, Expert, Resources, App) (4 Cols)*/}
          {/* ===================================================================== */}
          <div className="lg:col-span-4 space-y-7">
            {/* 1. ALL-INDIA AGRONOMY SPECIFICATIONS CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <LayersIcon className="w-5 h-5 text-[#2C8C44]" />
                  <h3 className="text-base font-bold text-gray-900">
                    Agronomy Specifications
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {data?.crop?.name}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CalendarIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Sowing Season & Window</span>
                    <strong className="text-gray-900 text-xs font-bold">
                      {data?.crop?.season} ({data?.agronomySpecs?.standardSowingMonth || "Oct - Nov"})
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPinIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Major Growing States</span>
                    <strong className="text-gray-900 text-xs font-bold leading-tight">
                      {data?.crop?.majorStates || "Punjab, Haryana, UP, MP, Rajasthan"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <SproutIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Soil Suitability</span>
                    <strong className="text-gray-900 text-xs font-bold leading-tight">
                      {data?.crop?.soilSuitability || "Well-drained Loamy and Clayey Loam"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DropletIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Water Need & Rainfall</span>
                    <strong className="text-gray-900 text-xs font-bold">
                      {data?.crop?.rainfall || "75 - 100 cm"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ThermometerIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Optimal Thermal Range</span>
                    <strong className="text-gray-900 text-xs font-bold">
                      {data?.crop?.optimalTemp?.min || 12}°C to {data?.crop?.optimalTemp?.max || 25}°C
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AwardIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold">Standard Seed Rate</span>
                    <strong className="text-gray-900 text-xs font-bold">
                      {data?.crop?.seedRate || "40 - 45 kg/acre"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. NEED KVK / AGRONOMIST ASSISTANCE? */}
            <div className="bg-[#EBF7EE] rounded-2xl border border-emerald-200/80 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-white text-[#2C8C44] shadow-xs flex items-center justify-center mx-auto mb-3">
                <PhoneCallIcon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                KVK & Agronomist Support
              </h4>
              <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                Connect with government Krishi Vigyan Kendra scientists and agricultural officers for localized agronomic advice.
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsContactComingSoonModalOpen(true)}
                  className="w-full bg-[#123C26] hover:bg-[#1a5234] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCallIcon className="w-3.5 h-3.5" />
                  <span>Call Kisan Call Center (1800-180-1551)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsContactComingSoonModalOpen(true)}
                  className="w-full bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-300 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>WhatsApp Agronomy Desk</span>
                </button>
              </div>
            </div>

            {/* 3. SCIENTIFIC TOOLS & RESOURCES */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 pb-3 mb-3 border-b border-gray-100">
                Agronomic Tooling & Guides
              </h3>

              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setIsCalculatorModalOpen(true)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
                  >
                    <CalculatorIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 group-hover:text-[#2C8C44]">
                      ICAR Fertilizer Dose Calculator
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setIsPestDiagnosisModalOpen(true)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
                  >
                    <CameraIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 group-hover:text-[#2C8C44]">
                      Pest & Disease Visual Library
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
                  >
                    <FileTextIcon className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 group-hover:text-[#2C8C44]">
                      {data?.crop?.name || "Wheat"} Package of Practices
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setIsGovSchemesModalOpen(true)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
                  >
                    <LandmarkIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 group-hover:text-[#2C8C44]">
                      Government Schemes & Subsidies
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* 4. KISAN MITRA APP PROMO */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Kisan Mitra Field App
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Offline field guides, daily weather telemetry, and mandi prices in 11 Indian languages.
              </p>

              <div className="space-y-2 mb-5 text-xs text-gray-800 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#2C8C44] flex-shrink-0" />
                  <span>Real-time weather radar & alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#2C8C44] flex-shrink-0" />
                  <span>165+ Mandi live auction rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#2C8C44] flex-shrink-0" />
                  <span>Hindi, Punjabi, Marathi, Gujarati & English</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => showComingSoon('app', 'KisanMitra Crop Advisory App', 'Access 26+ crop growth guides, AI pest scanning, and seasonal fertilization plans.', 'crop_advisory_app')}
                  className="flex-1 bg-black text-white px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span>Google Play</span>
                </button>
                <button
                  onClick={() => showComingSoon('app', 'KisanMitra Crop Advisory App', 'Access 26+ crop growth guides, AI pest scanning, and seasonal fertilization plans.', 'crop_advisory_app')}
                  className="flex-1 bg-gray-900 text-white px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span>App Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM GREEN CTA BOX                                                   */}
      {/* ========================================================================= */}
      <section className="w-full py-4 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100">
        <div className="max-w-[85rem] mx-auto bg-[#0F392B] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
          {/* Left: Seedling & Text */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
            <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] flex-shrink-0 flex items-center justify-center">
              <img
                src={cta_plant}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
                Scientifically Backed Decisions. Higher Yields.
              </h2>
              <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
                Join thousands of farmers across India using Kisan Mitra for reliable agronomy guidelines.
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => showComingSoon('app', 'KisanMitra Crop Advisory App', 'Access 26+ crop growth guides, AI pest scanning, and seasonal fertilization plans.', 'crop_advisory_app')}
              className="w-full sm:w-auto bg-[#6CB937] hover:bg-[#5ca62b] text-white px-7 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <span>Download Mobile App</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBenefitsModalOpen(true)}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Read Benefits</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ALL-NEW CUSTOM TAILWIND MODALS (100% REPLACES ALL BROWSER ALERTS)      */}
      {/* ========================================================================= */}

      {/* MODAL 1: ALL-INDIA REGION & DISTRICT SELECTION MODAL */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <MapPinIcon className="w-6 h-6 text-[#2C8C44]" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Select All-India Region & State
                  </h3>
                  <p className="text-xs text-gray-500">
                    Covers all 28 States & 8 Union Territories for localized ICAR varieties and mandi rates
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* GPS Auto-Detect Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleDetectGPS}
                disabled={gpsDetecting}
                className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <CompassIcon className={`w-4 h-4 text-[#2C8C44] ${gpsDetecting ? 'animate-spin' : ''}`} />
                <span>{gpsDetecting ? "Detecting GPS Coordinates..." : "Use My Current Live GPS Location"}</span>
              </button>
            </div>

            {/* Search Input and State Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
              <div className="sm:col-span-7 relative">
                <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  placeholder="Search city, district or state (e.g. Ludhiana, Nagpur, Pune)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                />
              </div>

              <div className="sm:col-span-5 relative">
                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="w-full appearance-none py-2.5 px-3 rounded-xl border border-gray-300 text-xs font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2C8C44] cursor-pointer"
                >
                  <option value="All States">All 36 States & UTs</option>
                  {ALL_INDIAN_REGIONS.map(r => (
                    <option key={r.state} value={r.state}>{r.state}</option>
                  ))}
                </select>
                <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Scrollable Region & District Grid */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[220px]">
              {filteredRegions.map((region) => (
                <div key={region.state} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2C8C44]" />
                      {region.state}
                    </span>
                    <button
                      onClick={() => {
                        setLocation(region.state);
                        setIsLocationModalOpen(false);
                      }}
                      className="text-[11px] font-bold text-[#2C8C44] hover:underline cursor-pointer"
                    >
                      Select Whole State
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {region.districts.map((dist) => (
                      <button
                        key={dist}
                        onClick={() => {
                          const formatted = `${dist}, ${region.state}`;
                          setLocation(formatted);
                          setIsLocationModalOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white hover:bg-[#123C26] hover:text-white border border-gray-200 text-gray-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        {dist}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GOVERNMENT WELFARE SCHEMES & SUBSIDIES MODAL */}
      {isGovSchemesModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <LandmarkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Government Welfare Schemes & Subsidies
                  </h3>
                  <p className="text-xs text-gray-500">
                    Direct central & state financial benefits for Indian agricultural landholders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGovSchemesModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 overflow-y-auto pr-1 text-xs text-gray-800">
              {/* 1. PM KISAN */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm font-bold text-emerald-950">
                    1. PM-KISAN Samman Nidhi Yojana
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                    ₹6,000 / Year
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Direct income support of ₹6,000 per annum in three equal instalments of ₹2,000 transferred directly into Aadhaar-linked bank accounts of all landholding farmer families.
                </p>
                <div className="text-[11px] text-emerald-800 font-semibold">
                  Eligibility: Small and marginal farmer families with cultivable landholding.
                </div>
              </div>

              {/* 2. PMFBY */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm font-bold text-sky-950">
                    2. Pradhan Mantri Fasal Bima Yojana (PMFBY)
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-900 font-bold text-[10px]">
                    1.5% - 2% Premium
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Comprehensive crop insurance covering yield loss due to non-preventable natural risks (drought, flood, unseasonal hail, pests & diseases) from pre-sowing to post-harvest.
                </p>
                <div className="text-[11px] text-sky-800 font-semibold">
                  Farmer Premium: 2% for Kharif foodgrains/oilseeds, 1.5% for Rabi, and 5% for commercial/horticultural crops.
                </div>
              </div>

              {/* 3. Soil Health Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm font-bold text-amber-950">
                    3. Soil Health Card Scheme
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">
                    100% Free Testing
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Provides customized nutrient recommendations across 12 parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) for each farm plot every 2 years.
                </p>
                <div className="text-[11px] text-amber-800 font-semibold">
                  Benefit: Reduces chemical fertilizer expenditure by 15-20% and prevents soil degradation.
                </div>
              </div>

              {/* 4. SMAM Subsidies */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm font-bold text-purple-950">
                    4. Sub-Mission on Agricultural Mechanization (SMAM)
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold text-[10px]">
                    40% - 80% Subsidy
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Financial subsidy on procurement of tractors, rotavators, power tillers, laser land levellers, and establishment of Custom Hiring Centers (CHCs) in rural clusters.
                </p>
              </div>

              {/* 5. KCC */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm font-bold text-gray-900">
                    5. Kisan Credit Card (KCC) Crop Loan
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-900 font-bold text-[10px]">
                    4% Effective Interest Rate
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Institutional collateral-free production credit up to ₹1.60 Lakh (and up to ₹3.00 Lakh with prompt repayment 3% subvention) for seeds, fertilizers, and pesticide inputs.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">
                National Helpline: 1800-180-1551 (Toll-Free)
              </span>
              <button
                onClick={() => setIsGovSchemesModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Close Schemes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SCIENTIFIC AGRONOMY BENEFITS WALKTHROUGH MODAL */}
      {isBenefitsModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#123C26] flex items-center justify-center">
                  <TrendingUpIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Agronomic Benefits & ROI
                  </h3>
                  <p className="text-xs text-gray-500">
                    Estimated financial savings and yield enhancement per acre
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBenefitsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 text-xs text-gray-800">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase block mb-1">
                    Input Cost Savings
                  </span>
                  <strong className="text-2xl font-extrabold text-emerald-900">
                    ₹6,000 - ₹8,000
                  </strong>
                  <span className="text-[10px] text-emerald-800 block mt-0.5">
                    per acre / season
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                  <span className="text-[11px] font-bold text-sky-700 uppercase block mb-1">
                    Average Yield Gain
                  </span>
                  <strong className="text-2xl font-extrabold text-sky-900">
                    +15% to +22%
                  </strong>
                  <span className="text-[10px] text-sky-800 block mt-0.5">
                    with ICAR protocols
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircleIcon className="w-4 h-4 text-[#2C8C44] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block mb-0.5">Precision Nitrogen & Fertilizer Ratio:</strong>
                    <span>Prevents over-application of Urea by matching basal DAP/MOP with stage-wise split top-dressing.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircleIcon className="w-4 h-4 text-[#2C8C44] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block mb-0.5">Early Pest Intervention (ETL Thresholds):</strong>
                    <span>Eliminates broad-spectrum pesticide overuse by deploying pheromone traps, biologicals, and targeted sprays.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircleIcon className="w-4 h-4 text-[#2C8C44] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block mb-0.5">Weather-Integrated Irrigation:</strong>
                    <span>Syncs canal and tube-well watering with Open-Meteo precipitation forecasts, preventing crop root rot and electricity wastage.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsBenefitsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: FERTILIZER DOSE CALCULATOR MODAL */}
      {isCalculatorModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <CalculatorIcon className="w-5 h-5 text-[#2C8C44]" />
                <h3 className="text-lg font-bold text-gray-900">
                  ICAR Fertilizer Dose Calculator ({data?.crop?.name || "Wheat"})
                </h3>
              </div>
              <button
                onClick={() => setIsCalculatorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    Cultivated Land Size
                  </label>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {calcAcres} Acre(s)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={calcAcres}
                  onChange={(e) => setCalcAcres(parseFloat(e.target.value))}
                  className="w-full accent-[#2C8C44] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Soil Texture Type
                </label>
                <select
                  value={calcSoil}
                  onChange={(e) => setCalcSoil(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C8C44]"
                >
                  <option value="Sandy Loam">Sandy Loam (Light - High drainage)</option>
                  <option value="Clay Loam">Clay Loam (Medium - High nutrient retention)</option>
                  <option value="Black Cotton Soil">Black Cotton Soil (Heavy - High moisture capacity)</option>
                  <option value="Alluvial Soil">Alluvial Soil (Fertile River Plains)</option>
                </select>
              </div>
            </div>

            {calcResult && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-xs text-gray-500 block">Urea (45 kg)</span>
                    <strong className="text-lg text-emerald-700">
                      {calcResult.recommendations?.ureaBags45kg} Bags
                    </strong>
                    <span className="text-[11px] text-gray-400 block">
                      ({calcResult.recommendations?.ureaTotalKg} kg)
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-xs text-gray-500 block">DAP (50 kg)</span>
                    <strong className="text-lg text-emerald-700">
                      {calcResult.recommendations?.dapBags50kg} Bags
                    </strong>
                    <span className="text-[11px] text-gray-400 block">
                      ({calcResult.recommendations?.dapTotalKg} kg)
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-xs text-gray-500 block">MOP (50 kg)</span>
                    <strong className="text-lg text-emerald-700">
                      {calcResult.recommendations?.mopBags50kg} Bags
                    </strong>
                    <span className="text-[11px] text-gray-400 block">
                      ({calcResult.recommendations?.mopTotalKg} kg)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                  <span className="font-bold text-emerald-900 block mb-1.5">
                    Recommended Split Application Schedule:
                  </span>
                  <ul className="space-y-1 text-gray-700">
                    {(calcResult.schedule || []).map((sch, i) => (
                      <li key={i}>
                        • <strong>{sch.timing}:</strong> {sch.items}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-gray-100 text-right">
              <button
                onClick={() => setIsCalculatorModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Close Calculator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: CULTIVATION GUIDE MODAL */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {data?.crop?.name || "Wheat"} Package of Practices (ICAR)
              </h3>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto text-xs text-gray-700 pr-1">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-[#2C8C44] block mb-1">
                  1. Certified Regional High-Yielding Varieties:
                </strong>
                <span>Recommended for {data?.agronomySpecs?.state || "your state"}: <strong>{data?.crop?.regionalVariety}</strong>. Seed rate: {data?.crop?.seedRate}.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-[#2C8C44] block mb-1">
                  2. Seed Treatment Protocol:
                </strong>
                <span>Treat seeds with Trichoderma viride @ 5 g/kg or Carbendazim 50 WP @ 2 g/kg seed to prevent seedling rots, smuts, and damping-off.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-[#2C8C44] block mb-1">
                  3. NPK Nutrition & Soil Water Balance:
                </strong>
                <span>Apply balanced NPK ({data?.crop?.standardNPK?.ratio}) with full basal Phosphorus & Potash. Maintain continuous optimal moisture during peak vegetative milestones.</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">
                Source: ICAR & SAUs
              </span>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#2C8C44] text-white hover:bg-[#247337] cursor-pointer shadow-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: VISUAL PEST DIAGNOSIS LIBRARY MODAL */}
      {isPestDiagnosisModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CameraIcon className="w-5 h-5 text-[#2C8C44]" />
                <h3 className="text-lg font-bold text-gray-900">
                  Visual Pest & Disease Diagnosis Library
                </h3>
              </div>
              <button
                onClick={() => setIsPestDiagnosisModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {(data?.pestsAndDiseases || []).map((pest, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={pest.imageUrl}
                    alt=""
                    onError={(e) => { e.target.src = FALLBACK_PEST_IMG; }}
                    className="w-full sm:w-28 h-28 object-cover rounded-xl flex-shrink-0 border border-gray-200 bg-slate-100"
                  />
                  <div className="space-y-1.5 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-gray-900 text-sm">{pest.name}</strong>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pest.risk === "High" ? "bg-rose-100 text-rose-800" : pest.risk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {pest.risk} Risk
                      </span>
                    </div>
                    <p className="text-gray-500 italic">{pest.scientificName}</p>
                    <p className="text-gray-700 leading-relaxed">{pest.symptoms}</p>
                    <div className="pt-1.5 space-y-1">
                      <div className="text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                        🌱 <strong>Organic / Biological:</strong> {pest.organicTreatment}
                      </div>
                      <div className="text-blue-900 font-semibold bg-blue-50 p-2 rounded-lg border border-blue-100">
                        🧪 <strong>Chemical Control:</strong> {pest.chemicalTreatment}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-right">
              <button
                onClick={() => setIsPestDiagnosisModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white cursor-pointer"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: SINGLE PEST REMEDY MODAL */}
      {selectedPestModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl">
            <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 border border-gray-200 bg-slate-100">
              <img
                src={selectedPestModal.imageUrl}
                alt=""
                onError={(e) => { e.target.src = FALLBACK_PEST_IMG; }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedPestModal.name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedPestModal.risk === "High" ? "bg-rose-100 text-rose-800" : selectedPestModal.risk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {selectedPestModal.risk} Risk
              </span>
            </div>
            <p className="text-xs text-gray-500 italic mb-3">
              {selectedPestModal.scientificName}
            </p>

            <div className="space-y-2.5 text-xs text-gray-800 mb-5">
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="block text-gray-700 mb-0.5">Symptoms:</strong>
                {selectedPestModal.symptoms}
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950 font-medium">
                <strong className="block text-emerald-800 mb-0.5">🌱 Organic & Cultural Control:</strong>
                {selectedPestModal.organicTreatment}
              </div>
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100 text-blue-950 font-medium">
                <strong className="block text-blue-800 mb-0.5">🧪 Recommended Chemical Spray:</strong>
                {selectedPestModal.chemicalTreatment}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPestModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 8: RECOMMENDATION DETAIL MODAL */}
      {selectedRecommendationModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {selectedRecommendationModal.title}
            </h3>
            <span className="text-xs font-bold text-[#2C8C44] block mb-3">
              Category: {selectedRecommendationModal.category}
            </span>

            <p className="text-xs text-gray-700 leading-relaxed mb-5 p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
              {selectedRecommendationModal.details || selectedRecommendationModal.summary}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedRecommendationModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123C26] text-white hover:bg-[#1a5234] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 9: APP DOWNLOAD MODAL */}
      {isAppDownloadModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#123C26] text-[#80D939] flex items-center justify-center mx-auto mb-3 shadow-md">
              <SproutIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Download Kisan Mitra App
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Access all 26 crop guides, weather radar, and mandi rates in 11 Indian languages.
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-4 text-xs space-y-2">
              <p className="font-semibold text-gray-700">Scan QR Code on Mobile Camera:</p>
              <div className="w-32 h-32 bg-white border border-gray-300 rounded-xl mx-auto flex items-center justify-center font-mono text-[11px] text-gray-400 shadow-inner">
                [QR CODE]
              </div>
            </div>

            <button
              onClick={() => setIsAppDownloadModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 10: CONTACTS / KVK HOTLINE COMING SOON MODAL */}
      {isContactComingSoonModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-[#80D939] to-teal-500"></div>

            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-[#2C8C44] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <PhoneCallIcon className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span>🚀 Coming Soon</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              KVK & Agronomist Support Desk
            </h3>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-5">
              Direct 1-on-1 audio consultation and WhatsApp chat with ICAR-KVK agricultural scientists and certified agronomists is currently in active development.
            </p>

            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 text-left space-y-2.5 text-xs text-gray-800 mb-6">
              <div className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Toll-Free Hotline (1800-180-1551):</strong> Direct voice link with your state agricultural department.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>WhatsApp Photo Desk:</strong> Instant AI & agronomist visual diagnosis for pest attacks.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>11 Indian Languages:</strong> Localized support in Hindi, Punjabi, Marathi, Telugu, and more.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsContactComingSoonModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#123C26] hover:bg-[#1a5234] text-white font-bold text-xs tracking-wide shadow-md transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
