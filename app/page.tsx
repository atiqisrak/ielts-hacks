import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <Hero />
      <FeatureCards />
      <Features />
      <Footer />
    </main>
  );
}
