import FeaturesHero from "../components/FeaturesHero";
import InteractiveFeatureShowcase from "../components/InteractiveFeatureShowcase";
import AllFeatures from "../components/AllFeatures";
import AdvancedAICapabilities from "../components/AdvancedAICapabilities";
import AdvancedTechnology from "../components/AdvancedTechnology";
import FeaturesCTA from "../components/FeaturesCTA";

export default function Features() {
  return (
    <main className="w-full">
      <FeaturesHero />
      <InteractiveFeatureShowcase />
      <AllFeatures />
      <AdvancedAICapabilities />
      <AdvancedTechnology />
      <FeaturesCTA />
    </main>
  );
}

