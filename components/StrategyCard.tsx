"use client";

interface Strategy {
  id: string;
  title: string;
  content: string;
  section: "reading" | "writing" | "listening" | "speaking";
  bandLevel: "7" | "8" | "9";
  tags: string[];
}

interface StrategyCardProps {
  strategy: Strategy;
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6 hover:border-accent-yellow hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="bg-accent-yellow text-neutral-900 text-xs font-bold px-3 py-1 rounded-full">
          Band {strategy.bandLevel}
        </span>
        <span className="text-xs text-neutral-500 capitalize">
          {strategy.section}
        </span>
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">
        {strategy.title}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
        {strategy.content}
      </p>
      <div className="flex flex-wrap gap-2">
        {strategy.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
