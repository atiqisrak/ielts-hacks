import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StrategyCard from "@/components/StrategyCard";

async function getStrategiesBySection(section: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3999";
    const res = await fetch(`${baseUrl}/api/strategies/${section}`, {
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

const sectionLabels: Record<string, string> = {
  reading: "Reading",
  writing: "Writing",
  listening: "Listening",
  speaking: "Speaking",
};

export default async function StrategySectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const data = await getStrategiesBySection(section);
  const strategies = data.strategies || [];
  const sectionLabel = sectionLabels[section] || section;

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Strategies", href: "/strategies" },
              { label: sectionLabel },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            {sectionLabel} Strategies
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Proven techniques and tips to excel in the IELTS{" "}
            {sectionLabel.toLowerCase()} section.
          </p>
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
