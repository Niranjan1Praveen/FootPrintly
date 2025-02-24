import ToolsDesc from "@/components/toolsDesc";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import Seo from "@/components/ui/seo";
export default function Home() {
  return (
    <section className="flex flex-col">
      <Header/>
      <Hero/>
      <ToolsDesc/>
      <Seo/>
    </section>
  );
}
