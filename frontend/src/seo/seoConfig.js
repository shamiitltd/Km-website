/**
 * Production SEO & Structured Data Configuration for KisanMitra
 */

export const DEFAULT_CANONICAL_DOMAIN = 'https://kisanmitra.in';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KisanMitra',
  legalName: 'KisanMitra Technologies',
  url: DEFAULT_CANONICAL_DOMAIN,
  logo: `${DEFAULT_CANONICAL_DOMAIN}/assets/hero-D2VKPB0P.png`,
  description: 'AI-Powered Smart Farming Companion empowering Indian farmers with crop diagnostics, weather alerts, and APMC mandi market prices.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dayanatpur Jewar',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '203135',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919548450539',
    contactType: 'Customer Support',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Marathi']
  },
  sameAs: [
    'https://twitter.com/kisanmitra',
    'https://facebook.com/kisanmitra',
    'https://youtube.com/@kisanmitra'
  ]
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KisanMitra',
  url: DEFAULT_CANONICAL_DOMAIN,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${DEFAULT_CANONICAL_DOMAIN}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

/**
 * Generate BreadcrumbList Schema.org item
 */
export function buildBreadcrumbsSchema(domain, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${domain}${item.path}`
    }))
  };
}

/**
 * Static Public Pages Inventory
 */
export const STATIC_PAGE_METADATA = {
  '/': {
    title: 'KisanMitra - AI-Powered Smart Farming Companion',
    description: 'Empowering farmers across India with AI-driven crop diagnostics, real-time weather alerts, APMC mandi market prices, and precision agricultural guidance.',
    keywords: 'AI farming, smart agriculture, crop disease detection, mandi bhav, weather alerts, kisan mitra, precision farming India',
    canonicalPath: '/',
    ogType: 'website',
    schemas: [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]
  },
  '/features': {
    title: 'AI Agricultural Features & Smart Farming Tools | KisanMitra',
    description: 'Explore KisanMitra\'s AI-driven smart crop advisory, instant disease diagnosis from leaf photos, local hyper-local weather alerts, and government schemes.',
    keywords: 'crop disease scanner, soil health diagnosis, mandi price tracker, weather forecast farmers, agritech features',
    canonicalPath: '/features',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Features', path: '/features' }
    ]
  },
  '/how-it-works': {
    title: 'How KisanMitra Works - 5-Step AI Farming Guide | KisanMitra',
    description: 'Learn how KisanMitra empowers farmers through simple 5-step photo diagnostics, soil analysis, tailored advisory, and real-time mandi connections.',
    keywords: 'how kisanmitra works, farm diagnosis step by step, smart farming workflow, agri app tutorial',
    canonicalPath: '/how-it-works',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'How It Works', path: '/how-it-works' }
    ]
  },
  '/pricing': {
    title: 'Transparent & Affordable Farming Plans | KisanMitra Pricing',
    description: 'Affordable, value-packed plans tailored for smallholder farmers, cooperative groups, and agri-enterprises with 100% fair pricing guarantees.',
    keywords: 'kisanmitra pricing, agritech subscription plans, farm advisory pricing, affordable farmer tools',
    canonicalPath: '/pricing',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' }
    ]
  },
  '/about': {
    title: 'About Us - Mission to Empower Indian Agriculture | KisanMitra',
    description: 'Discover KisanMitra\'s mission, our team, and our commitment to bringing cutting-edge AI technology to grassroots Indian farmers.',
    keywords: 'about kisanmitra, agritech founders, Indian agriculture technology, sustainable farming mission',
    canonicalPath: '/about',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' }
    ],
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About KisanMitra',
        url: `${DEFAULT_CANONICAL_DOMAIN}/about`,
        description: 'KisanMitra is built to empower Indian farmers through state-of-the-art AI diagnostics and fair market access.'
      }
    ]
  },
  '/blog': {
    title: 'AgriTech & Sustainable Farming Blog | KisanMitra Research',
    description: 'Expert agricultural insights, organic farming techniques, soil health advice, and crop management strategies for Indian farmers.',
    keywords: 'farming blog, agritech news, sustainable agriculture, soil nutrition tips, pest management, kisan mitra articles',
    canonicalPath: '/blog',
    ogType: 'blog',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' }
    ]
  },
  '/weather': {
    title: 'Accurate Agricultural Weather Forecast & Crop Insights | KisanMitra',
    description: 'Real-time weather updates, 7-day hyper-local forecasts, severe weather alerts, and AI-powered agricultural spraying and irrigation recommendations.',
    keywords: 'agricultural weather, farming weather forecast, mandi weather, rain alert farmers, spraying window, irrigation planner India',
    canonicalPath: '/weather',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Weather Updates', path: '/weather' }
    ]
  },
  '/weather-updates': {
    title: 'Accurate Agricultural Weather Forecast & Crop Insights | KisanMitra',
    description: 'Real-time weather updates, 7-day hyper-local forecasts, severe weather alerts, and AI-powered agricultural spraying and irrigation recommendations.',
    canonicalPath: '/weather',
    ogType: 'website'
  },
  '/crop-advisory': {
    title: 'ICAR Crop Cultivation Advisory & Pest Diagnosis | KisanMitra',
    description: 'All-India ICAR-standard crop cultivation guide, regional variety recommendations, authentic pest & disease management, and fertilizer dosage calculator for 26+ crops.',
    keywords: 'crop advisory, ICAR package of practices, pest control guide, crop disease identification, fertilizer calculator, Indian farming guide, wheat advisory, rice cultivation',
    canonicalPath: '/crop-advisory',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Crop Advisory', path: '/crop-advisory' }
    ]
  },
  '/advisory': {
    title: 'ICAR Crop Cultivation Advisory & Pest Diagnosis | KisanMitra',
    description: 'All-India ICAR-standard crop cultivation guide, regional variety recommendations, authentic pest & disease management, and fertilizer dosage calculator for 26+ crops.',
    canonicalPath: '/crop-advisory',
    ogType: 'website'
  },
  '/market-prices': {
    title: 'Live APMC Mandi Bhav & Agricultural Commodity Rates | KisanMitra',
    description: 'Real-time APMC Mandi prices, daily modal rates, MSP benchmarks, and arrival telemetry across 165+ agricultural wholesale markets in India.',
    keywords: 'mandi bhav, APMC market rates, live crop prices, agmarknet data, commodity price today, wheat mandi rate, onion price',
    canonicalPath: '/market-prices',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Market Prices', path: '/market-prices' }
    ]
  },
  '/mandi-prices': {
    title: 'Live APMC Mandi Bhav & Agricultural Commodity Rates | KisanMitra',
    description: 'Real-time APMC Mandi prices, daily modal rates, MSP benchmarks, and arrival telemetry across 165+ agricultural wholesale markets in India.',
    canonicalPath: '/market-prices',
    ogType: 'website'
  },
  '/marketplace': {
    title: 'Live APMC Mandi Bhav & Agricultural Commodity Rates | KisanMitra',
    description: 'Real-time APMC Mandi prices, daily modal rates, MSP benchmarks, and arrival telemetry across 165+ agricultural wholesale markets in India.',
    canonicalPath: '/market-prices',
    ogType: 'website'
  },
  '/market': {
    title: 'Live APMC Mandi Bhav & Agricultural Commodity Rates | KisanMitra',
    description: 'Real-time APMC Mandi prices, daily modal rates, MSP benchmarks, and arrival telemetry across 165+ agricultural wholesale markets in India.',
    canonicalPath: '/market-prices',
    ogType: 'website'
  },
  '/contact': {
    title: 'Contact KisanMitra Support & Advisory Team | KisanMitra',
    description: 'Get in touch with the KisanMitra team for technical assistance, partnership inquiries, or agricultural consultations.',
    keywords: 'contact kisanmitra, farmer helpline, agritech support, crop doctor consultation',
    canonicalPath: '/contact',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' }
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact KisanMitra',
        url: `${DEFAULT_CANONICAL_DOMAIN}/contact`,
        mainEntity: ORGANIZATION_SCHEMA
      }
    ]
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions & User Privacy | KisanMitra',
    description: 'Review the official terms of service, acceptable use policies, and privacy guidelines governing the KisanMitra platform.',
    canonicalPath: '/terms-and-conditions',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms and Conditions', path: '/terms-and-conditions' }
    ]
  },
  '/terms': {
    title: 'Terms and Conditions & User Privacy | KisanMitra',
    description: 'Review the official terms of service, acceptable use policies, and privacy guidelines governing the KisanMitra platform.',
    canonicalPath: '/terms-and-conditions', // Canonicalized to canonical URL to avoid duplicate content
    ogType: 'website'
  },
  '/careers': {
    title: 'Careers at KisanMitra - Join Our AgriTech Mission | KisanMitra',
    description: 'Help build the future of Indian agriculture. Explore open roles across AI engineering, agronomy, and community outreach.',
    canonicalPath: '/careers',
    ogType: 'website'
  },
  '/refund-policy': {
    title: 'Refund Policy & Fair Pricing Guarantee | KisanMitra',
    description: 'Read KisanMitra\'s customer-first refund policy and subscription cancellation guidelines.',
    canonicalPath: '/refund-policy',
    ogType: 'website'
  },
  '/government-schemes': {
    title: 'Government Agriculture Schemes & Subsidies | KisanMitra',
    description: 'Explore 16+ verified Indian Central & State Government agriculture schemes, PM-KISAN ₹6,000 DBT, PM-KUSUM solar pump subsidy, PMFBY crop insurance, and Kisan Credit Card (KCC).',
    keywords: 'government agriculture schemes, PM-KISAN, PM-KUSUM solar pump, PMFBY crop insurance, Kisan Credit Card, tractor subsidy, SMAM, drip irrigation subsidy, Jaivik Kheti, farming subsidies India',
    canonicalPath: '/government-schemes',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Government Schemes', path: '/government-schemes' }
    ]
  },
  '/schemes': {
    title: 'Government Agriculture Schemes & Subsidies | KisanMitra',
    description: 'Explore 16+ verified Indian Central & State Government agriculture schemes, PM-KISAN ₹6,000 DBT, PM-KUSUM solar pump subsidy, PMFBY crop insurance, and Kisan Credit Card (KCC).',
    canonicalPath: '/government-schemes',
    ogType: 'website'
  },
  '/gov-schemes': {
    title: 'Government Agriculture Schemes & Subsidies | KisanMitra',
    description: 'Explore 16+ verified Indian Central & State Government agriculture schemes, PM-KISAN ₹6,000 DBT, PM-KUSUM solar pump subsidy, PMFBY crop insurance, and Kisan Credit Card (KCC).',
    canonicalPath: '/government-schemes',
    ogType: 'website'
  },
  '/agriculture-schemes': {
    title: 'Government Agriculture Schemes & Subsidies | KisanMitra',
    description: 'Explore 16+ verified Indian Central & State Government agriculture schemes, PM-KISAN ₹6,000 DBT, PM-KUSUM solar pump subsidy, PMFBY crop insurance, and Kisan Credit Card (KCC).',
    canonicalPath: '/government-schemes',
    ogType: 'website'
  }
};
