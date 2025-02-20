import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import Seo from "@/components/ui/seo";
export default function Home() {
  return (
    <section className="flex flex-col bg-gradient-to-b from-black to-black/80">
      <Header/>
      <Hero/>
      <Seo/>
    </section>
  );
}
