import HowItWorksHero from "../components/HowItWorksHero";
import FiveStepProcess from "../components/FiveStepProcess";
import InteractiveWorkflowSimulator from "../components/InteractiveWorkflowSimulator";
import WhyFarmersLove from "../components/WhyFarmersLove";
import HowItWorksCTA from "../components/HowItWorksCTA";

export default function HowItWorks() {
    return (
        <main className="w-full">
            <HowItWorksHero />
            <FiveStepProcess />
            <InteractiveWorkflowSimulator />
            <WhyFarmersLove />
            <HowItWorksCTA />
        </main>
    );
}