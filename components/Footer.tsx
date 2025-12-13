"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t-2 border-neutral-800">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-yellow rounded-xl flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-0">IELTS Hacks</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Your comprehensive resource for achieving Band 9 in IELTS.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-0 mb-4">
              Materials
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/materials"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  All Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/books"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/guides"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/practice-papers"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Practice Papers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-0 mb-4">
              Strategies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/strategies"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  All Strategies
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/reading"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Reading
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/writing"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/listening"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Listening
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/speaking"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Speaking
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-0 mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent-yellow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} IELTS Hacks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
