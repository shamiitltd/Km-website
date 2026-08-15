import AboutUsHero from "../components/AboutUsHero";
import AboutCompany from "../components/AboutCompany";
import AboutStatus from "../components/AboutStatus";
import AboutMission from "../components/AboutMission";
import AboutWhy from "../components/AboutWhy";
import AboutUsCTA from "../components/AboutUsCTA";

export default function AboutUs() {
    return (
        <main className="w-full">
            <AboutUsHero />
            <AboutMission />
            <AboutCompany />
            <AboutStatus />
            <AboutWhy />
            <AboutUsCTA />
        </main>
    )
}