import FeaturesHero from "../components/FeaturesHero";
import AllFeatures from "../components/AllFeatures";
import AdvancedAICapabilities from "../components/AdvancedAICapabilities";
import AdvancedTechnology from "../components/AdvancedTechnology";
import FeaturesCTA from "../components/FeaturesCTA";

export default function Features() {
  return (
    <main className="w-full">
      <FeaturesHero />
      <AllFeatures />
      <AdvancedAICapabilities />
      <AdvancedTechnology />
      <FeaturesCTA />
    </main>
  );
}
