"use client";

import DownloadButton from "./DownloadButton";

interface Material {
  id: string;
  title: string;
  description: string;
  category: "book" | "guide" | "practice-paper";
  format: "pdf" | "doc" | "zip";
  cloudUrl: string;
  size: string;
  tags: string[];
}

interface MaterialCardProps {
  material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const categoryLabels: Record<string, string> = {
    book: "Book",
    guide: "Guide",
    "practice-paper": "Practice Paper",
  };

  return (
    <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6 hover:border-accent-yellow hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="bg-accent-yellow-light text-neutral-900 text-xs font-bold px-3 py-1 rounded-full">
            {categoryLabels[material.category]}
          </span>
          <span className="text-xs text-neutral-500">{material.size}</span>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          {material.title}
        </h3>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          {material.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {material.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <DownloadButton url={material.cloudUrl} title={material.title} />
    </div>
  );
}
