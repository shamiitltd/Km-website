import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import farmBgLocal from "../assets/farm_bg.jpg";
import cta_plant from "../assets/cta_plant.png";
import { showComingSoon } from "../utils/comingSoon";

// ============================================================================
// PURE VECTOR SVG ICONS (NO EMOJIS ANYWHERE)
// ============================================================================

function SearchIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LandmarkIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7 12 2" />
    </svg>
  );
}

function IndianRupeeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3a4 4 0 0 0 0-8" />
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

function SunIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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

function FileTextIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function UsersIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

function BookmarkIcon({ className = "w-4 h-4", filled = false }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CopyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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

function CloseIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CalculatorIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
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

function SparklesIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  );
}

// ============================================================================
// AUTHENTIC INDIAN GOVERNMENT AGRICULTURE SCHEMES DATASET
// ============================================================================

const SCHEMES_DATA = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "dbt",
    categoryLabel: "Direct Benefit Transfer",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitHighlight: "₹6,000 / year Direct Cash Transfer",
    subsidyType: "100% Centrally Funded DBT",
    targetBeneficiary: "All Landholding Farmer Families",
    officialUrl: "https://pmkisan.gov.in/",
    helpline: "155261 / 011-24300606 / 1800-115-526",
    colorVariant: "emerald",
    badge: "Most Popular",
    description: "Financial income support of ₹6,000 per annum paid in three equal installments of ₹2,000 every 4 months directly into bank accounts via Aadhaar-seeded DBT to support farming input procurement and household needs.",
    keyHighlights: [
      "₹2,000 transferred every 4 months directly into beneficiary bank accounts",
      "Over 11 Crore+ farmers benefited across India",
      "Seamless e-KYC verification through OTP or Biometrics",
      "Available to all small, marginal, and landholding farmers"
    ],
    documentsRequired: [
      "Aadhaar Card linked with mobile number",
      "Land Record / Khatoni / Land Ownership Documents",
      "Active Bank Account Passbook (Aadhaar Seeded)",
      "Domicile Certificate"
    ],
    applicationSteps: [
      "Visit the official PM-KISAN portal (pmkisan.gov.in)",
      "Navigate to 'Farmers Corner' and click 'New Farmer Registration'",
      "Enter Aadhaar Number, select State, and verify with OTP",
      "Fill landholding details (Survey/Khata number, area in Hectares) and upload documents",
      "Submit application and note Registration Number for status tracking"
    ]
  },
  {
    id: "pmfby",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "insurance",
    categoryLabel: "Crop Insurance & Risk Coverage",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitHighlight: "Comprehensive Crop Loss Coverage up to 100%",
    subsidyType: "Subsidized Premium (1.5% to 5%)",
    targetBeneficiary: "All Farmers (Loanee & Non-Loanee)",
    officialUrl: "https://pmfby.gov.in/",
    helpline: "14447 / 1800-180-1551",
    colorVariant: "blue",
    badge: "High Risk Protection",
    description: "Affordable comprehensive crop insurance against unavoidable natural risks (drought, dry spells, floods, inundation, pests, diseases, landslides, hailstorms, cyclones, post-harvest losses) from sowing to post-harvest.",
    keyHighlights: [
      "Maximum farmer premium: 2% for Kharif crops, 1.5% for Rabi crops, 5% for Commercial/Horticulture",
      "Remaining premium subsidized 50:50 by Central and State Governments",
      "Direct claim settlement to bank account based on satellite & CCE crop cutting data",
      "Includes mid-season adversity and localized calamity coverage (within 72 hours reporting)"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Sowing Certificate / Patwari / Village Accountant Report",
      "Land Records (ROR / B-1 / Pahan) or Tenancy Agreement",
      "Bank Account details"
    ],
    applicationSteps: [
      "Open the PMFBY portal (pmfby.gov.in) or Farmer Crop Insurance App",
      "Click on 'Farmer Corner' and choose 'Apply for Crop Insurance by yourself'",
      "Select State, Season (Kharif/Rabi), Year, and Scheme",
      "Enter bank details, crop sown, land survey number and area",
      "Pay nominal farmer premium online and download insurance policy receipt"
    ]
  },
  {
    id: "pm-kusum",
    name: "PM-KUSUM (Solar Agriculture Pumps & Grid Feeding)",
    category: "solar",
    categoryLabel: "Solar Energy & Pumps",
    ministry: "Ministry of New and Renewable Energy (MNRE)",
    benefitHighlight: "Up to 60% Solar Pump Subsidy",
    subsidyType: "30% Central + 30% State Subsidy",
    targetBeneficiary: "Individual Farmers, Cooperatives & Panchayats",
    officialUrl: "https://pmkusum.mnre.gov.in/",
    helpline: "1800-180-3333",
    colorVariant: "amber",
    badge: "Clean Energy Grant",
    description: "Empowers farmers to replace diesel irrigation pumps with standalone solar water pumps (Component B) and solarize existing grid-connected agricultural pumps (Component C), plus earning income by selling surplus solar power back to the grid (Component A).",
    keyHighlights: [
      "60% combined capital subsidy (30% Center + 30% State) on solar pump setup",
      "30% bank loan available; farmer contributes only 10% upfront cost",
      "Zero recurring electricity or diesel costs for 25+ years",
      "Ensures reliable daytime irrigation without power cut interruptions"
    ],
    documentsRequired: [
      "Aadhaar Card & Photo ID",
      "Land Ownership Documents with irrigation source proof",
      "Bank Account details and cancelled cheque",
      "Electricity connection details (for pump solarization Component C)"
    ],
    applicationSteps: [
      "Visit the state renewable energy agency portal linked via pmkusum.mnre.gov.in",
      "Register with Mobile and Aadhaar number",
      "Select desired pump capacity (e.g. 3 HP, 5 HP, 7.5 HP Submersible/Surface)",
      "Pay 10% farmer share online or apply for linked NABARD/Bank loan",
      "Authorized agency completes on-site installation and inspection within 60-90 days"
    ]
  },
  {
    id: "kcc",
    name: "KCC (Kisan Credit Card Scheme)",
    category: "loans",
    categoryLabel: "Loans & Working Capital",
    ministry: "Department of Agriculture & Farmers Welfare / NABARD",
    benefitHighlight: "Loan up to ₹3 Lakh at 4% Interest Rate",
    subsidyType: "3% Prompt Repayment Subvention",
    targetBeneficiary: "All Farmers, Dairy & Fisheries Workers",
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    helpline: "1800-180-1551 / 1800-115-526",
    colorVariant: "indigo",
    badge: "Low Interest Credit",
    description: "Provides timely and flexible institutional credit for crop cultivation expenses, post-harvest expenses, farm asset maintenance, allied activities (dairy, poultry, fisheries), and domestic consumption needs with collateral-free limit up to ₹1.60 Lakh.",
    keyHighlights: [
      "Basic interest rate of 7%, reduced to 4% with prompt repayment incentive",
      "Collateral-free credit limit up to ₹1.60 Lakh (extended to ₹3 Lakh for registered FPOs)",
      "Simple single-page application for existing PM-KISAN beneficiaries",
      "Includes inbuilt personal accidental insurance up to ₹50,000"
    ],
    documentsRequired: [
      "Duly filled KCC Application Form",
      "Identity Proof (Aadhaar / Voter ID / PAN)",
      "Address Proof",
      "Land Revenue Records showing crop cultivation details"
    ],
    applicationSteps: [
      "Download standard one-page KCC form from PM-KISAN portal or visit your local bank branch",
      "Fill personal details, PM-KISAN ID, crop area, and loan requirement",
      "Attach land records (Khasra/Khatauni) certified by Revenue authority",
      "Submit at the nearest Commercial, Regional Rural, or Cooperative Bank branch",
      "Bank issues Kisan Credit Card and sanction limit within 14 working days"
    ]
  },
  {
    id: "smam",
    name: "SMAM (Sub-Mission on Agricultural Mechanization)",
    category: "machinery",
    categoryLabel: "Farm Machinery & Drones",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitHighlight: "40% to 50% Subsidy on Tractors & Implements",
    subsidyType: "Up to 80% for Custom Hiring Centers & Drones",
    targetBeneficiary: "Small/Marginal, Women Farmers & CHC Groups",
    officialUrl: "https://agrimachinery.nic.in/",
    helpline: "1800-180-1551",
    colorVariant: "purple",
    badge: "High Subsidy",
    description: "Promotes modern farm mechanization by providing financial assistance for procurement of agricultural equipment (tractors, power tillers, rotavators, seed drills, combine harvesters, laser land levelers, and agriculture spraying drones) and establishing Custom Hiring Centers (CHCs).",
    keyHighlights: [
      "40% to 50% subsidy for individual small, marginal, SC/ST, and women farmers",
      "Up to 80% financial assistance for setting up Custom Hiring Centers (CHCs)",
      "Special subsidy on Agricultural Drones for precision spraying and soil monitoring",
      "Direct Dealer-to-Farmer verification through digital portal"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Records (Khatauni) or CHC Registration Certificate",
      "Bank Account Details (Aadhaar linked)",
      "Quotation / Invoice from authorized machinery dealer",
      "Caste Certificate (for SC/ST higher subsidy quota)"
    ],
    applicationSteps: [
      "Log in to agrimachinery.nic.in using Aadhaar and mobile OTP",
      "Select Scheme Category (Individual Farmer or Custom Hiring Center)",
      "Choose equipment type, brand, and registered authorized dealer",
      "Upload land record and quotation documents",
      "Receive sanction order and purchase machinery with direct DBT subsidy credit"
    ]
  },
  {
    id: "pmksy-pdmc",
    name: "PMKSY - Per Drop More Crop (Micro Irrigation)",
    category: "irrigation",
    categoryLabel: "Irrigation & Water Conservation",
    ministry: "Department of Agriculture & Farmers Welfare",
    benefitHighlight: "55% Subsidy on Drip & Sprinkler Systems",
    subsidyType: "55% (Small/Marginal) & 45% (Others)",
    targetBeneficiary: "All Farmers with Irrigation Source",
    officialUrl: "https://perdropmorecrop.gov.in/",
    helpline: "011-23382012 / 1800-180-1551",
    colorVariant: "teal",
    badge: "Water Saving",
    description: "Focuses on maximizing water use efficiency at the farm level through Micro Irrigation technologies (Drip and Sprinkler systems), saving 40-50% water, reducing fertilizer cost through fertigation, and boosting crop yields by 30-40%.",
    keyHighlights: [
      "55% subsidy for Small & Marginal farmers; 45% subsidy for other farmers",
      "Includes mini-sprinklers, portable sprinklers, and inline/online drip sets",
      "Compatible with all field crops, orchards, vegetables, sugarcane, and cotton",
      "Significantly reduces weed growth and power consumption"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Record Documents showing ownership or registered lease",
      "Electricity Bill / Solar pump connection proof",
      "Field layout map and bank account details"
    ],
    applicationSteps: [
      "Register on your state horticulture / agriculture department micro-irrigation portal",
      "Select micro irrigation type (Drip / Sprinkler / Rain Gun)",
      "Choose empaneled manufacturer / vendor for field survey and GPS mapping",
      "Department approves subsidized estimate; pay only beneficiary share",
      "Physical verification conducted post-installation for subsidy release"
    ]
  },
  {
    id: "soil-health-card",
    name: "Soil Health Card Scheme (SHC)",
    category: "inputs",
    categoryLabel: "Soil Testing & Nutrition",
    ministry: "Department of Agriculture & Farmers Welfare",
    benefitHighlight: "100% Free 12-Parameter Soil Health Testing",
    subsidyType: "Free Govt Diagnostic Service",
    targetBeneficiary: "All Farmers across India",
    officialUrl: "https://soilhealth.dac.gov.in/",
    helpline: "011-23381012",
    colorVariant: "amber",
    badge: "Free Diagnostic",
    description: "Issues customized Soil Health Cards to all farmers once every 2-3 years, detailing the status of 12 vital soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) and recommending balanced crop-specific fertilizer and micronutrient dosages to restore soil fertility.",
    keyHighlights: [
      "Analyzes macro-nutrients, micro-nutrients, and physical soil health markers",
      "Recommends crop-wise organic and inorganic fertilizer dosages",
      "Reduces chemical fertilizer costs by 15-25% while increasing yield",
      "Includes soil sample tracking from field collection to lab report generation"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Identification (Khasra/Khatauni Number)",
      "Mobile number"
    ],
    applicationSteps: [
      "Contact local Agriculture Extension Officer (Gram Sevak) or Krishi Vigyan Kendra (KVK)",
      "Soil sample collected scientifically from GPS-tagged grid points in your field",
      "Sample analyzed at accredited district Soil Testing Laboratory",
      "Soil Health Card generated with customized nutrient prescription",
      "Download digital Soil Health Card anytime from soilhealth.dac.gov.in"
    ]
  },
  {
    id: "aif",
    name: "AIF (Agriculture Infrastructure Fund)",
    category: "loans",
    categoryLabel: "Agri-Infrastructure & Post-Harvest",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitHighlight: "₹2 Crore Loan with 3% Interest Subvention",
    subsidyType: "3% Interest Subvention + CGTMSE Guarantee",
    targetBeneficiary: "Farmers, FPOs, PACS, Startups & Agri-preneurs",
    officialUrl: "https://agriinfra.dac.gov.in/",
    helpline: "1800-180-1551",
    colorVariant: "indigo",
    badge: "Large Infrastructure",
    description: "A ₹1 Lakh Crore medium-to-long term debt financing facility for building post-harvest management infrastructure and community farming assets like cold chains, warehouses, silos, sorting/grading units, packhouses, and primary processing centers.",
    keyHighlights: [
      "3% per annum interest subvention on loans up to ₹2 Crore for up to 7 years",
      "Credit guarantee coverage under CGTMSE fee paid by Government for loans up to ₹2 Crore",
      "Multiple projects eligible for FPOs and Cooperatives",
      "Moratorium period up to 2 years for project completion"
    ],
    documentsRequired: [
      "Detailed Project Report (DPR)",
      "Land title / lease deed (minimum 10 years)",
      "KYC documents and Bank statement",
      "Registration certificate (for FPOs/Cooperatives)"
    ],
    applicationSteps: [
      "Register on AIF portal (agriinfra.dac.gov.in)",
      "Fill online project application and upload Detailed Project Report (DPR)",
      "Ministry evaluates and approves for interest subvention within 10 days",
      "Application forwarded to selected partner bank for credit sanction",
      "Loan disbursed with automatic 3% interest relief applied"
    ]
  },
  {
    id: "pkvy",
    name: "PKVY & Jaivik Kheti (Paramparagat Krishi Vikas Yojana)",
    category: "organic",
    categoryLabel: "Organic & Natural Farming",
    ministry: "Ministry of Agriculture & Farmers Welfare (NMSA)",
    benefitHighlight: "₹50,000 / Hectare Financial Assistance",
    subsidyType: "₹31,000 Direct Cash for Bio-Inputs",
    targetBeneficiary: "Farmer Clusters (50+ Acres) & Individuals",
    officialUrl: "https://www.jaivikkheti.in/",
    helpline: "1800-180-1551",
    colorVariant: "emerald",
    badge: "Eco-Friendly Grant",
    description: "Promotes chemical-free organic farming through cluster approach with Participatory Guarantee System (PGS) India certification, providing financial aid for organic inputs (bio-fertilizers, vermicompost, botanical extracts), soil health management, and premium market linkages.",
    keyHighlights: [
      "₹50,000 per hectare support for 3 years",
      "₹31,000 transferred directly to farmers through DBT for organic inputs and seeds",
      "Free PGS-India organic certification without expensive third-party fees",
      "Direct selling support on JaivikKheti.in national organic e-commerce portal"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land records",
      "Cluster membership enrollment form",
      "Bank account details"
    ],
    applicationSteps: [
      "Form a farmer cluster of 20-50 farmers (minimum 50 acres total land)",
      "Submit cluster registration to District Agriculture Officer or Regional Agency",
      "Undergo PGS-India green conversion inspection and organic training",
      "Receive DBT subsidy installments for bio-inputs and certification",
      "Sell certified chemical-free organic produce at premium prices"
    ]
  },
  {
    id: "enam",
    name: "e-NAM (National Agriculture Market)",
    category: "marketing",
    categoryLabel: "Mandi Trading & Market Linkage",
    ministry: "Ministry of Agriculture & Farmers Welfare / SFAC",
    benefitHighlight: "Pan-India Direct Trading with 1,360+ Mandis",
    subsidyType: "Zero Middlemen Brokerage Exploitation",
    targetBeneficiary: "All Farmers, Traders & FPOs",
    officialUrl: "https://enam.gov.in/",
    helpline: "1800-270-0224",
    colorVariant: "blue",
    badge: "Better Prices",
    description: "An innovative pan-India electronic trading portal integrating 1,360+ wholesale APMC mandis to create a unified national market for agricultural commodities with transparent online competitive bidding, computerized weighing, quality assaying, and instant direct payments.",
    keyHighlights: [
      "Access to pan-India buyers resulting in 10-15% higher real price discovery",
      "Free scientific quality assaying and grading at mandi e-NAM gate",
      "Guaranteed electronic settlement directly into bank account on same day",
      "Logistics integration with online truck booking and warehouse receipt financing"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Bank Passbook / Cancelled Cheque",
      "Mobile number linked to bank"
    ],
    applicationSteps: [
      "Register on enam.gov.in or download e-NAM Mobile App",
      "Bring farm produce to any integrated e-NAM APMC mandi gate",
      "Get lot gate-entry receipt and electronic quality assaying report",
      "Traders bid competitively online during open bidding window",
      "Accept highest transparent bid and receive money directly in bank account"
    ]
  },
  {
    id: "fpo-scheme",
    name: "Formation & Promotion of 10,000 FPOs",
    category: "marketing",
    categoryLabel: "Farmer Producer Organizations",
    ministry: "Ministry of Agriculture & Farmers Welfare / SFAC / NABARD",
    benefitHighlight: "Up to ₹18 Lakh Grant + ₹15 Lakh Equity Match",
    subsidyType: "₹2 Crore Credit Guarantee Cover",
    targetBeneficiary: "Farmer Producer Groups & Collectives",
    officialUrl: "https://sfacindia.com/FPOS.aspx",
    helpline: "1800-180-1551",
    colorVariant: "purple",
    badge: "Collective Power",
    description: "Central Sector Scheme supporting the formation of 10,000 farmer producer companies with end-to-end handholding for 5 years to enable economies of scale, direct retail linkages, bulk procurement of inputs at wholesale discounts, and high-value agro-processing.",
    keyHighlights: [
      "Management and handholding grant up to ₹18 Lakh per FPO for 3 years",
      "Matching equity grant up to ₹15 Lakh (₹2,000 per member)",
      "Credit guarantee cover up to ₹2 Crore per FPO for collateral-free bank loans",
      "Dedicated Cluster-Based Business Organizations (CBBOs) for technical support"
    ],
    documentsRequired: [
      "Company Registration (ROC / Producer Company Act)",
      "List of minimum 300 member farmers (100 in hilly regions)",
      "FPO Bank Account details and PAN Card",
      "Business Plan and Board of Directors Resolution"
    ],
    applicationSteps: [
      "Mobilize local farmers to form a core steering group with Cluster Business Organization",
      "Incorporate company under Companies Act as Producer Organization",
      "Apply on SFAC/NABARD FPO management portal for equity grant matching",
      "Access institutional bank loan under Credit Guarantee Scheme",
      "Set up input distribution center and output aggregation hub"
    ]
  },
  {
    id: "pmmsy",
    name: "PMMSY (Pradhan Mantri Matsya Sampada Yojana)",
    category: "allied",
    categoryLabel: "Fisheries & Aquaculture",
    ministry: "Department of Fisheries (DAHD)",
    benefitHighlight: "40% to 60% Subsidy on Fish Ponds & Biofloc",
    subsidyType: "40% (General) & 60% (Women/SC/ST)",
    targetBeneficiary: "Fish Farmers, Coastal Communities & SHGs",
    officialUrl: "https://pmmsy.dof.gov.in/",
    helpline: "1800-423-1653",
    colorVariant: "cyan",
    badge: "Aquaculture Grant",
    description: "A flagship ₹20,050 Crore investment scheme to drive the Blue Revolution, offering substantial capital subsidies for construction of new fish ponds, biofloc units, Recirculatory Aquaculture Systems (RAS), feed mills, and refrigerated fish transport vans.",
    keyHighlights: [
      "40% financial assistance for General category beneficiaries",
      "60% financial assistance for Women, SC, ST, and Cooperative societies",
      "Covers freshwater aquaculture, brackish water shrimp, and ornamental fisheries",
      "Includes cold chain infrastructure and modern fish retail kiosk subsidies"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land ownership or registered lease agreement for water body / land",
      "Detailed project estimate approved by District Fisheries Officer",
      "Bank Account details"
    ],
    applicationSteps: [
      "Register on state fisheries department portal or pmmsy.dof.gov.in",
      "Choose aquaculture project activity (New Pond / Biofloc / RAS / Feed Unit)",
      "Submit Detailed Project Report (DPR) with land proof",
      "District Level Committee reviews and sanctions project",
      "Subsidy released in stages matching project civil construction milestones"
    ]
  },
  {
    id: "ahidf",
    name: "AHIDF & NLM (Animal Husbandry & Livestock Mission)",
    category: "allied",
    categoryLabel: "Dairy & Livestock Development",
    ministry: "Department of Animal Husbandry & Dairying",
    benefitHighlight: "3% Interest Subvention + Up to 50% Capital Subsidy",
    subsidyType: "Up to ₹50 Lakh Capital Subsidy for Breeding",
    targetBeneficiary: "Dairy Farmers, Livestock Breeders & Startups",
    officialUrl: "https://ahidf.udyamimitra.in/",
    helpline: "011-23384192",
    colorVariant: "amber",
    badge: "Dairy & Livestock",
    description: "Provides financial aid, capital subsidies up to 50%, and 3% interest subvention for establishing modern dairy processing units, cattle/buffalo breeding farms, goat/sheep rearing units, poultry hatcheries, and cattle feed manufacturing plants.",
    keyHighlights: [
      "3% interest subvention on bank loans with 2-year moratorium period",
      "50% capital subsidy (up to ₹50 Lakh) for commercial sheep, goat, and poultry breeding",
      "25% credit guarantee coverage for eligible borrowing entities",
      "Promotes indigenous cattle breed improvement and modern milk chilling chains"
    ],
    documentsRequired: [
      "Aadhaar Card and Business Entity Registration",
      "Detailed Project Report (DPR)",
      "Land Ownership / Long-term Lease Agreement",
      "Bank account statements and Credit Score report"
    ],
    applicationSteps: [
      "Visit ahidf.udyamimitra.in portal",
      "Register and fill out the online Animal Husbandry Loan application",
      "Upload Detailed Project Report (DPR) and land documentation",
      "Selected partner bank verifies project and issues sanction letter",
      "Interest subvention and credit guarantee activated automatically upon disbursement"
    ]
  },
  {
    id: "midh",
    name: "MIDH (Mission for Integrated Development of Horticulture)",
    category: "horticulture",
    categoryLabel: "Horticulture & Greenhouses",
    ministry: "Ministry of Agriculture & Farmers Welfare (NHB)",
    benefitHighlight: "50% Subsidy on Polyhouses & High-Density Orchards",
    subsidyType: "50% Capital Grant on Greenhouse Setup",
    targetBeneficiary: "Horticulture Growers & Nursery Operators",
    officialUrl: "https://midh.gov.in/",
    helpline: "0124-2342992 / 1800-180-1551",
    colorVariant: "emerald",
    badge: "High Value Crops",
    description: "Holistic growth mission for fruits, vegetables, root and tuber crops, mushrooms, spices, flowers, and aromatic plants, providing heavy subsidies for polyhouses, shade nets, high-density fruit orchards, cold storages, and tissue culture laboratories.",
    keyHighlights: [
      "50% subsidy for naturally ventilated polyhouses, shade net structures, and plastic mulching",
      "Assistance for high-density fruit orchards (Apple, Mango, Guava, Dragon Fruit, Citrus)",
      "Subsidy on mushroom spawn production and high-tech nursery infrastructure",
      "Subsidies on pack-houses, pre-cooling units, and reefer transport vans"
    ],
    documentsRequired: [
      "Aadhaar Card & Photo",
      "Land records (7/12, Khatauni) with assured water source certificate",
      "Technical layout blueprint & quotation from empaneled greenhouse vendor",
      "Bank account details"
    ],
    applicationSteps: [
      "Apply through National Horticulture Board (nhb.gov.in) or state horticulture portal",
      "Submit application with farm map and crop selection plan",
      "Technical team conducts joint inspection of the proposed field site",
      "In-principle approval issued to commence polyhouse / orchard construction",
      "Final subsidy released directly to bank account upon geo-tagged physical inspection"
    ]
  },
  {
    id: "pm-pranam",
    name: "PM-PRANAM (Alternative Nutrients & Soil Revival)",
    category: "inputs",
    categoryLabel: "Bio-Fertilizers & Green Inputs",
    ministry: "Ministry of Chemicals & Fertilizers",
    benefitHighlight: "50% Subsidy Savings for Bio-Fertilizer Grants",
    subsidyType: "Govt Direct Input Incentives",
    targetBeneficiary: "Farmers adopting balanced & nano nutrition",
    officialUrl: "https://fert.gov.in/",
    helpline: "1800-116-300",
    colorVariant: "teal",
    badge: "Eco Nutrition",
    description: "Incentivizes states and farmers to reduce chemical fertilizer consumption and adopt balanced plant nutrition, Nano Urea, Nano DAP, bio-stimulants, and organic manures to prevent soil degradation and groundwater contamination.",
    keyHighlights: [
      "50% of fertilizer subsidy saved by states redirected into direct farmer grants",
      "Promotes high-efficiency Nano Urea & Nano DAP liquid fertilization",
      "Improves crop nitrogen use efficiency from 30% to over 80%",
      "Subsidies on village-level bio-compost and city-compost units"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "PM-KISAN registration ID / Farmer ID",
      "Mobile number"
    ],
    applicationSteps: [
      "Purchase Nano Urea and Bio-fertilizers at subsidized rates via registered PACS / IFFCO outlets",
      "Participate in state-led soil revitalization demo plots via local KVK",
      "Access integrated nutrient management advice via Kisan Mitra advisory",
      "Avail linked financial incentives through state organic & natural farming schemes"
    ]
  },
  {
    id: "rkvy-raftaar",
    name: "RKVY-RAFTAAR (Agri-Business Incubator & Innovation)",
    category: "marketing",
    categoryLabel: "Agri-Startups & Value Addition",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitHighlight: "Up to ₹25 Lakh Seed Grant for Agri Innovation",
    subsidyType: "100% Grant-in-Aid (No Equity/No Repayment)",
    targetBeneficiary: "Agri-Entrepreneurs, Youth, Farmer Startups",
    officialUrl: "https://rkvy.nic.in/",
    helpline: "1800-180-1551",
    colorVariant: "indigo",
    badge: "Innovation Seed Grant",
    description: "Catalyzes agribusiness entrepreneurship and value addition by offering up to ₹5 Lakh idea-stage grants and up to ₹25 Lakh seed-stage grants to farmers, agri-graduates, and innovators creating food processing units, farm tech tools, and cold storage innovations.",
    keyHighlights: [
      "Idea Stage: ₹5 Lakh grant with 2-month paid incubation training stipend",
      "Seed Stage: ₹25 Lakh grant-in-aid (85% grant, 15% founder contribution)",
      "Supported by 29+ Knowledge Partners and Agribusiness Incubators across India (IARI, CCSHAU, MANAGE)",
      "Focus on farmer-led value addition, processing, packaging, and smart farming tools"
    ],
    documentsRequired: [
      "Aadhaar Card and Founder Profile",
      "Innovative Agri-Business Pitch Deck / Prototype Description",
      "Entity Registration (Proprietorship / LLP / Private Limited / Farmer Group)",
      "Bank Account details"
    ],
    applicationSteps: [
      "Visit rkvy.nic.in or selected Knowledge Partner incubator website (e.g. PUSA Krishi)",
      "Apply during open cohorts for 'ANUVESHA' (Idea) or 'ARISE' (Seed Stage)",
      "Present innovative pitch deck before Expert Evaluation Committee",
      "Complete 2-month incubation program and refine business prototype",
      "Grant disbursed directly in milestone tranches to scale agri business"
    ]
  }
];

const CATEGORIES = [
  { id: "all", label: "All Schemes", count: 16 },
  { id: "dbt", label: "Direct Benefit Transfer (DBT)", count: 2 },
  { id: "insurance", label: "Crop Insurance & Risk", count: 1 },
  { id: "solar", label: "Solar & Renewable", count: 1 },
  { id: "loans", label: "Loans & Credit", count: 2 },
  { id: "machinery", label: "Machinery & Drones", count: 1 },
  { id: "irrigation", label: "Micro Irrigation", count: 1 },
  { id: "inputs", label: "Soil & Nutrients", count: 2 },
  { id: "organic", label: "Organic Farming", count: 1 },
  { id: "marketing", label: "Market & FPO Grants", count: 3 },
  { id: "allied", label: "Dairy & Fisheries", count: 2 },
  { id: "horticulture", label: "Horticulture", count: 1 }
];

const HELPLINES = [
  {
    name: "Kisan Call Center (KCC)",
    number: "1800-180-1551",
    timing: "6:00 AM - 10:00 PM (All 7 Days)",
    desc: "Toll-free agricultural technical queries in 22 local Indian languages."
  },
  {
    name: "PM-KISAN Samman Nidhi Helpdesk",
    number: "155261 / 011-24300606",
    timing: "9:30 AM - 6:00 PM (Mon - Sat)",
    desc: "Direct assistance for payment installment status, e-KYC, and land seeding."
  },
  {
    name: "PMFBY Crop Insurance Support",
    number: "14447 / 1800-180-1551",
    timing: "24/7 Helpline",
    desc: "Report crop damage within 72 hours and track insurance claim progress."
  },
  {
    name: "e-NAM National Mandi Helpdesk",
    number: "1800-270-0224",
    timing: "9:00 AM - 8:00 PM",
    desc: "Support for online commodity bidding, registration, and payment settlement."
  }
];

const FAQS = [
  {
    q: "How can I check if my name is on the PM-KISAN beneficiary list?",
    a: "Visit the official PM-KISAN portal (pmkisan.gov.in), go to 'Farmers Corner', click on 'Beneficiary List', select your State, District, Sub-District, Block, and Village, then click 'Get Report'. Your village's complete approved beneficiary list will appear."
  },
  {
    q: "What is mandatory to receive PM-KISAN installment payments?",
    a: "Three steps are mandatory: 1) Complete e-KYC verification using Aadhaar OTP or Biometrics at any CSC, 2) Link your active Bank Account with Aadhaar (DBT enabled), and 3) Land record details (Khatoni/Khasra) seeded by your local state revenue department."
  },
  {
    q: "How much subsidy is provided under the PM-KUSUM Solar Pump scheme?",
    a: "Under PM-KUSUM Component B, farmers receive up to 60% capital subsidy (30% from Central Government + 30% from State Government). Additionally, 30% can be financed via bank loan, meaning the farmer has to pay only 10% of the total installation cost."
  },
  {
    q: "How to report crop damage under PMFBY to claim insurance?",
    a: "In case of localized natural calamities (hailstorm, cloudburst, inundation, landslide), farmers must report the damage within 72 hours via the 'Crop Insurance App', call toll-free helpline 14447, or notify the nearest Agriculture Office / Bank Branch."
  },
  {
    q: "Can tenant farmers or sharecroppers apply for government agriculture schemes?",
    a: "Yes. Schemes like PMFBY (Crop Insurance), Kisan Credit Card (KCC), and e-NAM explicitly cover tenant farmers and oral lessees upon providing an agreement letter or local revenue verification of cultivation."
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GovernmentSchemes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("km_bookmarked_schemes");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Storage access failed:", e);
      return [];
    }
  });
  const [copyToast, setCopyToast] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Calculator State
  const [calcCategory, setCalcCategory] = useState("small");
  const [calcLandSize, setCalcLandSize] = useState("2");
  const [calcInterest, setCalcInterest] = useState("solar");
  const [calcResult, setCalcResult] = useState(null);

  // Lock body scrolling while preserving exact scroll position
  useEffect(() => {
    if (selectedSchemeDetail) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [selectedSchemeDetail]);

  const toggleBookmark = (id) => {
    let next;
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter(b => b !== id);
    } else {
      next = [...bookmarkedIds, id];
    }
    setBookmarkedIds(next);
    try {
      localStorage.setItem("km_bookmarked_schemes", JSON.stringify(next));
    } catch (e) {
      console.warn("Storage update failed:", e);
    }
  };

  const handleCopyLink = (url, name) => {
    navigator.clipboard?.writeText(url);
    setCopyToast(`Copied official link for ${name}`);
    setTimeout(() => setCopyToast(""), 3000);
  };

  // Filter & Search Logic
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter(scheme => {
      // Category Filter
      if (selectedCategory !== "all" && scheme.category !== selectedCategory) {
        return false;
      }
      // Beneficiary Filter
      if (selectedBeneficiary !== "all") {
        if (selectedBeneficiary === "small" && !scheme.targetBeneficiary.toLowerCase().includes("small") && !scheme.targetBeneficiary.toLowerCase().includes("all")) {
          return false;
        }
        if (selectedBeneficiary === "women" && !scheme.targetBeneficiary.toLowerCase().includes("women") && !scheme.targetBeneficiary.toLowerCase().includes("all")) {
          return false;
        }
        if (selectedBeneficiary === "fpo" && !scheme.targetBeneficiary.toLowerCase().includes("fpo") && !scheme.targetBeneficiary.toLowerCase().includes("cooperative") && !scheme.targetBeneficiary.toLowerCase().includes("group")) {
          return false;
        }
      }
      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = scheme.name.toLowerCase().includes(q);
        const matchDesc = scheme.description.toLowerCase().includes(q);
        const matchMinistry = scheme.ministry.toLowerCase().includes(q);
        const matchBenefit = scheme.benefitHighlight.toLowerCase().includes(q);
        const matchCategory = scheme.categoryLabel.toLowerCase().includes(q);
        return matchName || matchDesc || matchMinistry || matchBenefit || matchCategory;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "benefit") {
        return b.subsidyType.localeCompare(a.subsidyType);
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // default: popular order
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedBeneficiary, sortBy]);

  // Eligibility Calculator logic
  const handleCalculate = (e) => {
    e?.preventDefault();
    const land = parseFloat(calcLandSize) || 0;
    let recommended;
    let estimatedBenefit;
    let keyTip;

    if (calcInterest === "solar") {
      recommended = ["pm-kusum"];
      estimatedBenefit = "60% Capital Subsidy (30% Center + 30% State)";
      keyTip = land < 3 ? "Recommended 3 HP Solar Pump setup (approx. ₹18,000 farmer share)" : "Recommended 5 HP - 7.5 HP High Capacity Solar Pump (Daytime Solar Grid Irrigation)";
    } else if (calcInterest === "machinery") {
      recommended = ["smam"];
      estimatedBenefit = calcCategory === "small" || calcCategory === "women" ? "50% Direct Machinery Subsidy" : "40% Direct Machinery Subsidy";
      keyTip = "Eligible for Tractors, Rotavators, Power Tillers, and Agriculture Drones through registered dealers.";
    } else if (calcInterest === "irrigation") {
      recommended = ["pmksy-pdmc"];
      estimatedBenefit = calcCategory === "small" || calcCategory === "women" ? "55% Drip / Sprinkler Subsidy" : "45% Micro-Irrigation Subsidy";
      keyTip = "Reduces water consumption by 45% and boosts productivity by 35% through precision fertigation.";
    } else if (calcInterest === "loans") {
      recommended = ["kcc", "aif"];
      estimatedBenefit = "Crop Loan up to ₹3 Lakh at 4% Interest";
      keyTip = "Collateral-free limit up to ₹1.60 Lakh. 3% interest rebate on prompt annual repayment.";
    } else if (calcInterest === "organic") {
      recommended = ["pkvy", "soil-health-card"];
      estimatedBenefit = "₹50,000 / Hectare (₹31,000 DBT for Bio-Inputs)";
      keyTip = "Includes free PGS-India organic certification and direct selling on JaivikKheti.in.";
    } else {
      recommended = ["pm-kisan", "pmfby"];
      estimatedBenefit = "₹6,000 / Year DBT + Comprehensive Crop Insurance";
      keyTip = "Guaranteed financial safety net with 100% natural calamity risk coverage.";
    }

    setCalcResult({
      recommendedSchemes: SCHEMES_DATA.filter(s => recommended.includes(s.id)),
      estimatedBenefit,
      keyTip,
      land,
      category: calcCategory
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-[#2C8C44] selection:text-white">
      
      {/* Toast Notification for Link Copy */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-semibold animate-bounce border border-slate-700">
          <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH SEAMLESS FARMLAND GRADIENT BACKGROUND                */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden border-b border-gray-200 bg-white">
        {/* Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={farmBgLocal}
            alt="Lush green agricultural farmland landscape"
            className="w-full h-full object-cover object-[center_right]"
          />
        </div>

        {/* Seamless Multi-Stop Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #ffffff 0%, #ffffff 52%, rgba(255, 255, 255, 0.96) 58%, rgba(255, 255, 255, 0.72) 70%, rgba(255, 255, 255, 0.25) 84%, transparent 100%)"
          }}
        />

        {/* Hero Content Container */}
        <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 xl:col-span-7 max-w-[46rem]">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <p className="text-[#2C8C44] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                  CENTRAL & STATE WELFARE SCHEMES
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                  <LandmarkIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>100% Verified Official Portals</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.14] mb-5">
                Government Schemes <br />
                <span className="text-[#2C8C44]">& Agricultural Subsidies</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-[20px] mb-6 max-w-xl leading-relaxed">
                Empowering Indian farmers with financial income support, solar pump grants, crop insurance, and machinery subsidies with direct links to official government application portals.
              </p>

              {/* Decorative Accent Divider */}
              <div className="w-14 h-1.5 bg-[#2C8C44] mb-8 rounded-full" />

              {/* 4 Feature Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 font-bold">
                    <IndianRupeeIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">16+ Authentic Schemes</span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5 font-bold">
                    <SunIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">Up to 80% Subsidy</span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5 font-bold">
                    <ExternalLinkIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">Direct Redirection</span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-1.5 font-bold">
                    <ShieldCheckIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">100% Gov. Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quick Eligibility & Subsidy Finder Card (5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <CalculatorIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-none">
                      Subsidy & Scheme Calculator
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Instant personalized scheme recommendations</span>
                  </div>
                </div>

                <form onSubmit={handleCalculate} noValidate className="space-y-3.5 mt-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Farmer Category
                    </label>
                    <select
                      value={calcCategory}
                      onChange={(e) => setCalcCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#2C8C44] focus:outline-none font-medium cursor-pointer"
                    >
                      <option value="small">Small & Marginal Farmer (&lt; 2 Hectares)</option>
                      <option value="medium">Medium & Large Farmer (&gt; 2 Hectares)</option>
                      <option value="women">Woman Farmer / SHG Member</option>
                      <option value="scst">SC / ST Farmer</option>
                      <option value="fpo">Farmer Producer Organization (FPO)</option>
                    </select>
                  </div>

                  {/* Land Area */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Cultivable Land (Acres)
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={calcLandSize}
                        onChange={(e) => setCalcLandSize(e.target.value)}
                        placeholder="e.g. 2.5"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#2C8C44] focus:outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Requirement
                      </label>
                      <select
                        value={calcInterest}
                        onChange={(e) => setCalcInterest(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#2C8C44] focus:outline-none font-medium cursor-pointer"
                      >
                        <option value="solar">Solar Water Pump</option>
                        <option value="machinery">Tractor & Implements</option>
                        <option value="irrigation">Drip / Sprinkler</option>
                        <option value="loans">Low-Interest Loan</option>
                        <option value="organic">Organic Farming</option>
                        <option value="income">Income Support & Insurance</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1e5631] hover:bg-[#164426] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <SparklesIcon className="w-4 h-4 text-amber-300" />
                    <span>Calculate Eligible Subsidies</span>
                  </button>
                </form>

                {/* Calculation Result Preview Box */}
                {calcResult && (
                  <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-950 text-sm">
                        {calcResult.estimatedBenefit}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 font-bold text-[10px]">
                        Recommended
                      </span>
                    </div>
                    <p className="text-slate-700 leading-snug mb-2 font-medium">
                      {calcResult.keyTip}
                    </p>
                    <div className="pt-2 border-t border-emerald-200/70 flex items-center justify-between">
                      <span className="text-slate-600 font-medium">
                        {calcResult.recommendedSchemes.length} Eligible Scheme(s)
                      </span>
                      <button
                        onClick={() => {
                          const first = calcResult.recommendedSchemes[0];
                          if (first) setSelectedSchemeDetail(first);
                        }}
                        className="text-emerald-800 font-bold hover:underline cursor-pointer"
                      >
                        View Full Application Guide →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN SCHEMES EXPLORER SECTION (SEARCH, FILTERS, CARDS)                 */}
      {/* ========================================================================= */}
      <section id="schemes-explorer" className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 py-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C8C44]" />
              <span className="text-xs md:text-sm font-bold text-[#2C8C44] uppercase tracking-wider">
                Government Welfare Catalog
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore Verified Agricultural Schemes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Click on any scheme card to view full documentation requirements or redirect to the authorized government portal.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-slate-900 font-bold">{filteredSchemes.length}</strong> of {SCHEMES_DATA.length} schemes
            </span>
          </div>
        </div>

        {/* Quick Jump Popular Scheme Chips */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs md:text-sm font-bold text-slate-500 mr-1">Popular:</span>
          {[
            { id: "dbt", label: "₹6,000 PM-KISAN" },
            { id: "solar", label: "Solar Pump (KUSUM)" },
            { id: "insurance", label: "Fasal Bima (PMFBY)" },
            { id: "loans", label: "Kisan Credit Card (4%)" },
            { id: "machinery", label: "Tractor Subsidy" }
          ].map(chip => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setSelectedCategory(chip.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === chip.id
                  ? "bg-[#1e5631] text-white shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs"
              }`}
            >
              {chip.label}
            </button>
          ))}
          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="text-xs font-semibold text-emerald-800 hover:underline ml-2 cursor-pointer"
            >
              Clear filter ✕
            </button>
          )}
        </div>

        {/* Search & Multi-Filter Control Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input (6 Cols) */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scheme name, keyword (e.g., tractor, solar, 6000, insurance, organic)..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#2C8C44] focus:outline-none font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Target Beneficiary Filter (3 Cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedBeneficiary}
                onChange={(e) => setSelectedBeneficiary(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#2C8C44] focus:outline-none cursor-pointer"
              >
                <option value="all">All Beneficiary Types</option>
                <option value="small">Small & Marginal Farmers</option>
                <option value="women">Women Farmers / SHGs</option>
                <option value="fpo">FPOs & Cooperatives</option>
              </select>
            </div>

            {/* Sort Dropdown (3 Cols) */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#2C8C44] focus:outline-none cursor-pointer"
              >
                <option value="popular">Sort: Most Popular First</option>
                <option value="benefit">Sort: Highest Subsidy Amount</option>
                <option value="name">Sort: Alphabetical (A to Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Scrollable horizontally on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <FilterIcon className="w-3.5 h-3.5" /> Category:
            </span>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#1e5631] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Schemes Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map(scheme => {
              const isBookmarked = bookmarkedIds.includes(scheme.id);
              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#2C8C44]/50"
                >
                  {/* Card Header & Ministry */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                        {scheme.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleBookmark(scheme.id)}
                          title={isBookmarked ? "Remove from saved" : "Save scheme"}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked
                              ? "bg-amber-50 border-amber-300 text-amber-600"
                              : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700"
                          }`}
                        >
                          <BookmarkIcon className="w-4 h-4" filled={isBookmarked} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyLink(scheme.officialUrl, scheme.name)}
                          title="Copy official link"
                          className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1e5631] transition-colors leading-snug mb-1.5">
                      {scheme.name}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-1 flex items-center gap-1.5">
                      <LandmarkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{scheme.ministry}</span>
                    </p>

                    {/* Benefit Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 mb-4">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                        FINANCIAL BENEFIT / SUBSIDY
                      </span>
                      <div className="text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                        <IndianRupeeIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{scheme.benefitHighlight}</span>
                      </div>
                    </div>

                    {/* Brief Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {scheme.description}
                    </p>

                    {/* Key Highlights Bullet points */}
                    <ul className="space-y-1.5 text-xs text-slate-700 mb-4">
                      {scheme.keyHighlights.slice(0, 2).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Target Beneficiary Pill */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <UsersIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">For: <strong>{scheme.targetBeneficiary}</strong></span>
                    </div>
                  </div>

                  {/* Card Footer: View Details Modal + Direct Official Portal Redirection Button */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedSchemeDetail(scheme)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold text-xs transition-colors cursor-pointer text-center"
                    >
                      Scheme Guide
                    </button>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#1e5631] hover:bg-[#164426] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer text-center"
                    >
                      <span>Apply Online</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">No government schemes found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your keyword search or clear the category filters to view all 16+ verified agriculture schemes.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedBeneficiary("all");
              }}
              className="px-4 py-2 bg-[#1e5631] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 3. STEP-BY-STEP APPLICATION FLOW & COMMON DOCUMENTS GUIDE                 */}
      {/* ========================================================================= */}
      <section className="bg-emerald-900 text-white py-14 px-6 md:px-12 lg:px-24">
        <div className="max-w-[95rem] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block mb-2">
              SEAMLESS 4-STEP PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              How to Apply for Agricultural Schemes Online
            </h2>
            <p className="text-emerald-100 text-sm mt-2">
              Follow these standard government verification steps to ensure fast approval and direct subsidy transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 relative">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-black text-sm flex items-center justify-center mb-4 shadow-md">
                1
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Check Eligibility
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Review scheme guidelines, landholding limits, crop category, and targeted beneficiary criteria (Small/Marginal, Women, SC/ST).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 relative">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-black text-sm flex items-center justify-center mb-4 shadow-md">
                2
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Prepare Documents
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Keep your Aadhaar, mobile-linked OTP, verified Land Records (Khatauni/Khasra), and active Bank Passbook ready.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 relative">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-black text-sm flex items-center justify-center mb-4 shadow-md">
                3
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Apply on Official Portal
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Click on the verified official portal link or visit your local Common Service Center (CSC) / Agriculture Extension Office.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 relative">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-black text-sm flex items-center justify-center mb-4 shadow-md">
                4
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Track & Receive DBT
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Track your application reference number online. Subsidies are credited directly into your Aadhaar-seeded bank account.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OFFICIAL TOLL-FREE HELPLINES & ASSISTANCE DIRECTORY                    */}
      {/* ========================================================================= */}
      <section className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#2C8C44] font-bold text-xs uppercase tracking-widest block mb-1">
            DIRECT FARMER SUPPORT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Official National Agriculture Helplines
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Need assistance with registration or pending installments? Call these toll-free government desks directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HELPLINES.map((hl, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <PhoneCallIcon className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                {hl.name}
              </h4>
              <a
                href={`tel:${hl.number.replace(/[^0-9]/g, "")}`}
                className="text-base font-extrabold text-[#1e5631] hover:underline block mb-1.5"
              >
                {hl.number}
              </a>
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                {hl.timing}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {hl.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (ACCORDION)                                 */}
      {/* ========================================================================= */}
      <section className="bg-slate-100/70 border-t border-slate-200 py-14 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#2C8C44] font-bold text-xs uppercase tracking-widest block mb-1">
              ANSWERS TO COMMON QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "border-emerald-300 ring-2 ring-emerald-100/70 shadow-sm" : "border-slate-200 shadow-2xs hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className={isOpen ? "text-[#1e5631]" : "text-slate-900"}>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isOpen ? "rotate-180 bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"
                    }`}>
                      <ChevronDownIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3.5 bg-slate-50/30">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION SECTION (MATCHING OTHER PAGES)                          */}
      {/* ========================================================================= */}
      <section className="w-full py-6 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[85rem] mx-auto bg-[#0F392B] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
          
          {/* Left Side: Plant Logo & Text */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 text-center md:text-left">
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
                Receive instant notifications on new subsidy openings, PM-KISAN installment dates, and crop advisory on the Kisan Mitra App.
              </p>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0">
            <button
              onClick={() => showComingSoon('app', 'KisanMitra Government Schemes Alerts', 'Get instant notifications on PM-KISAN, state subsidies, and crop insurance.', 'schemes_app')}
              className="w-full sm:w-auto bg-[#6CB937] hover:bg-[#5ca62b] text-white px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg text-sm md:text-[15px] cursor-pointer"
            >
              Download App
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
            
            <Link
              to="/features"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-colors text-sm md:text-[15px] text-center"
            >
              All Features
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DETAILED SCHEME MODAL POPUP                                            */}
      {/* ========================================================================= */}
      {selectedSchemeDetail && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedSchemeDetail(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-1.5 inline-block">
                  {selectedSchemeDetail.categoryLabel}
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                  {selectedSchemeDetail.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {selectedSchemeDetail.ministry}
                </span>
              </div>
              <button
                onClick={() => setSelectedSchemeDetail(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Subsidy Highlight */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Financial Benefit / Subsidy Amount
                  </span>
                  <span className="text-base sm:text-lg font-black text-emerald-950">
                    {selectedSchemeDetail.benefitHighlight}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">
                  {selectedSchemeDetail.subsidyType}
                </span>
              </div>

              {/* Overview */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-[#2C8C44]" />
                  Scheme Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedSchemeDetail.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#2C8C44]" />
                  Key Highlights & Benefits
                </h4>
                <div className="space-y-1.5">
                  {selectedSchemeDetail.keyHighlights.map((kh, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C8C44] mt-2 shrink-0" />
                      <span>{kh}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Required */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-2 flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-slate-600" />
                  Mandatory Documents Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSchemeDetail.documentsRequired.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Application Instructions */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2.5 flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-[#2C8C44]" />
                  Step-by-Step Application Process
                </h4>
                <div className="space-y-2">
                  {selectedSchemeDetail.applicationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Helpline */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-medium text-amber-900">
                  <PhoneCallIcon className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Helpline: <strong>{selectedSchemeDetail.helpline}</strong></span>
                </div>
                <a
                  href={`tel:${selectedSchemeDetail.helpline.split("/")[0].replace(/[^0-9]/g, "")}`}
                  className="font-bold text-amber-800 hover:underline cursor-pointer"
                >
                  Call Now →
                </a>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedSchemeDetail(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Close
              </button>

              <a
                href={selectedSchemeDetail.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-[#1e5631] hover:bg-[#164426] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Go to Official Government Portal</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
