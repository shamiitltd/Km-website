import React from 'react';
import PricingHero from '../components/PricingHero';
import PricingCards from '../components/PricingCards';
import PricingCompare from '../components/PricingCompare';
import PricingCTA from '../components/PricingCTA';

export default function Pricing() {
    return (
        <main className="w-full">
            <PricingHero />
            <PricingCards />
            <PricingCompare />
            <PricingCTA />
        </main>
    )
}