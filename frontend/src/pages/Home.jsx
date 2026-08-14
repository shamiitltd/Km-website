import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ChallengesSolutions from "../components/ChallengesSolutions";
import AppPreview from "../components/AppPreview";
import TestimonialsStats from "../components/TestimonialsStats";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features />
      <HowItWorks />
      <ChallengesSolutions />
      <AppPreview />
      <TestimonialsStats />
      <CTA />
    </main>
  );
}