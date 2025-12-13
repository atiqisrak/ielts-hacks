import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaterialGrid from "@/components/MaterialGrid";

async function getMaterials() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3999";
    const res = await fetch(`${baseUrl}/api/materials`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { materials: [] };
    }
    return res.json();
  } catch (error) {
    return { materials: [] };
  }
}

export default async function MaterialsPage() {
  const data = await getMaterials();
  const materials = data.materials || [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: "Study Materials" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Study Materials
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Access comprehensive study materials including books, guides, and
            practice papers to enhance your IELTS preparation.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/materials/books"
              className="bg-accent-yellow text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-accent-yellow-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow-dark"
            >
              Books
            </Link>
            <Link
              href="/materials/guides"
              className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            >
              Guides
            </Link>
            <Link
              href="/materials/practice-papers"
              className="bg-neutral-200 text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            >
              Practice Papers
            </Link>
          </div>
          <MaterialGrid materials={materials} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
