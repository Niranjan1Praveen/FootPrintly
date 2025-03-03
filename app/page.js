import Flowchart from "@/components/flowchart";
import Header from "@/components/header";
import Hero from "@/components/hero";
import LandingParticles from "@/components/landingParticles";
import Seo from "@/components/seo";
export default function Home() {
  return (
    <section className="flex flex-col">
      <LandingParticles />
      <Header />
      <Hero />
      <Flowchart />
      <Seo />
    </section>
  );
}
