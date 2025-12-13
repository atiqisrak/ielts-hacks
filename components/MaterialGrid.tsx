"use client";

import MaterialCard from "./MaterialCard";

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

interface MaterialGridProps {
  materials: Material[];
}

export default function MaterialGrid({ materials }: MaterialGridProps) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">No materials found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
