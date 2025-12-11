"use client";

export default function Features() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Why Choose IELTS Hacks?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Everything you need to achieve Band 9 in one comprehensive
              platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              </div>
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Comprehensive Materials
              </h4>
              <p className="text-neutral-600">
                Access curated books, guides, and practice papers from trusted
                sources.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              </div>
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Proven Strategies
              </h4>
              <p className="text-neutral-600">
                Learn Band 9 techniques and tips from experienced IELTS
                instructors.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              </div>
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Multi-format Support
              </h4>
              <p className="text-neutral-600">
                Resources available in various formats - PDFs, documents, and
                more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
