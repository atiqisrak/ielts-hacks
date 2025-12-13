"use client";

import Link from "next/link";

export default function FeatureCards() {
  const features = [
    {
      title: "Study Materials",
      description:
        "Access curated books, guides, and practice papers to enhance your preparation.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-neutral-900"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
      href: "/materials",
      color: "bg-accent-yellow",
    },
    {
      title: "Band 9 Strategies",
      description:
        "Learn proven techniques and tips from experts to achieve your target band score.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-neutral-900"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      href: "/strategies",
      color: "bg-accent-yellow",
    },
    {
      title: "Resources",
      description:
        "Find additional learning tools, study schedules, and vocabulary lists.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-neutral-900"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      href: "/resources",
      color: "bg-accent-yellow",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded-3xl"
              >
                <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6 sm:p-8 hover:border-accent-yellow hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow-light rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-yellow transition-all shadow-yellow-glow`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-accent-yellow-dark font-semibold text-sm mt-2">
                      <span>Explore</span>
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
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
