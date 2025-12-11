"use client";

interface DownloadButtonProps {
  url: string;
  title: string;
}

export default function DownloadButton({ url, title }: DownloadButtonProps) {
  const handleDownload = () => {
    window.open(url, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="w-full bg-accent-yellow hover:bg-accent-yellow-dark text-neutral-900 font-bold py-3 px-6 rounded-2xl transition-colors text-sm flex items-center justify-center min-h-[48px] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow-dark shadow-yellow-glow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Download
    </button>
  );
}
