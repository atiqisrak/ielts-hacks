import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaterialGrid from "@/components/MaterialGrid";

async function getBooks() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3999";
    const res = await fetch(`${baseUrl}/api/materials/books`, {
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

export default async function BooksPage() {
  const data = await getBooks();
  const materials = data.materials || [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Study Materials", href: "/materials" },
              { label: "Books" },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            IELTS Books
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Official and recommended IELTS preparation books to help you achieve
            your target band score.
          </p>
          <MaterialGrid materials={materials} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
