"use client";

export default function Hero() {
  return (
    <div className="min-h-screen bg-neutral-0">
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center bg-accent-yellow text-neutral-900 text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-yellow-glow">
                <span className="text-lg mr-2">🎯</span>Your Comprehensive IELTS
                Resource
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-neutral-900 mb-6 leading-tight">
                Master IELTS.
                <br />
                <span className="bg-gradient-to-r from-accent-yellow-dark to-accent-yellow bg-clip-text text-transparent">
                  Achieve Band 9.
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Access comprehensive study materials, proven strategies, and
                expert resources to maximize your IELTS score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
