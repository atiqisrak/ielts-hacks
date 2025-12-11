import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ResourcesPage() {
  const resources = [
    {
      title: "IELTS Official Website",
      description:
        "Official IELTS website with test information, dates, and registration.",
      url: "https://www.ielts.org",
      category: "Official",
    },
    {
      title: "British Council IELTS",
      description:
        "British Council's IELTS preparation resources and test booking.",
      url: "https://www.britishcouncil.org/exam/ielts",
      category: "Official",
    },
    {
      title: "IDP IELTS",
      description:
        "IDP Education's IELTS test booking and preparation materials.",
      url: "https://www.idp.com/global/ielts/",
      category: "Official",
    },
    {
      title: "IELTS Liz",
      description:
        "Free IELTS lessons, tips, and practice materials from an experienced teacher.",
      url: "https://ieltsliz.com",
      category: "Learning",
    },
    {
      title: "IELTS Simon",
      description:
        "Daily IELTS lessons and tips from former IELTS examiner Simon.",
      url: "https://ielts-simon.com",
      category: "Learning",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: "Resources" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Additional Resources
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            Useful links, tools, and external resources to support your IELTS
            preparation journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6 hover:border-accent-yellow hover:shadow-2xl transition-all duration-300 h-full flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-accent-yellow-light text-neutral-900 text-xs font-bold px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center text-accent-yellow-dark font-semibold text-sm">
                  <span>Visit Site</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
