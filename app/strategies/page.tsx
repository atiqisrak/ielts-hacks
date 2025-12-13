import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StrategyCard from "@/components/StrategyCard";

async function getStrategies() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3999";
    const res = await fetch(`${baseUrl}/api/strategies`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { strategies: [] };
    }
    return res.json();
  } catch (error) {
    return { strategies: [] };
  }
}

export default async function StrategiesPage() {
  const data = await getStrategies();
  const strategies = data.strategies || [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: "Strategies" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Band 9 Strategies
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Learn proven techniques and tips from experts to achieve your target
            band score in all IELTS sections.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/strategies/reading"
              className="bg-accent-yellow text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-accent-yellow-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow-dark"
            >
              Reading
            </Link>
            <Link
              href="/strategies/writing"
              className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            >
              Writing
            </Link>
            <Link
              href="/strategies/listening"
              className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            >
              Listening
            </Link>
            <Link
              href="/strategies/speaking"
              className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            >
              Speaking
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy: any) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
