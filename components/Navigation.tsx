"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      href: "/materials",
      label: "Materials",
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
          className="h-4 w-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      href: "/strategies",
      label: "Strategies",
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
          className="h-4 w-4"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      href: "/resources",
      label: "Resources",
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
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
    },
  ];

  return (
    <nav className="bg-neutral-0 border-b-2 border-neutral-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow rounded-lg"
          >
            <div className="w-12 h-12 bg-accent-yellow rounded-2xl flex items-center justify-center shadow-yellow-glow group-hover:shadow-yellow-glow-lg transition-all group-hover:animate-owl-bounce">
              <span className="text-2xl">🦉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                IELTS Hacks
              </h1>
              <p className="text-xs text-neutral-600 hidden sm:block font-medium">
                Your Comprehensive IELTS Resource
              </p>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow-dark ${
                    active
                      ? "bg-accent-yellow text-neutral-900 shadow-yellow-glow"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
          >
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
