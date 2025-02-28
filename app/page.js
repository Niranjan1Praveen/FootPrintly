import Flowchart from "@/components/flowchart";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Seo from "@/components/seo";
export default function Home() {
  return (
    <section className="flex flex-col">
      <Header/>
      <Hero/>
      <Flowchart/>
      <Seo/>
    </section>
  );
}
