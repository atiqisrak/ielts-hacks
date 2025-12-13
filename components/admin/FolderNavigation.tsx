"use client";

interface FolderNavigationProps {
  currentFolder: string;
  onNavigate: (folderPath: string) => void;
  onCreateFolder: () => void;
}

export default function FolderNavigation({
  currentFolder,
  onNavigate,
  onCreateFolder,
}: FolderNavigationProps) {
  const folders = currentFolder === "root" ? [] : currentFolder.split("/");

  return (
    <div className="flex items-center space-x-2 mb-4 flex-wrap gap-2">
      <button
        onClick={() => onNavigate("root")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          currentFolder === "root"
            ? "bg-accent-yellow text-neutral-900"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
        }`}
      >
        Root
      </button>

      {folders.map((folder, index) => {
        const path = folders.slice(0, index + 1).join("/");
        return (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-neutral-400">/</span>
            <button
              onClick={() => onNavigate(path)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentFolder === path
                  ? "bg-accent-yellow text-neutral-900"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {folder}
            </button>
          </div>
        );
      })}

      <button
        onClick={onCreateFolder}
        className="ml-auto px-4 py-1.5 rounded-lg bg-accent-yellow text-neutral-900 text-sm font-bold hover:bg-accent-yellow-dark transition-colors flex items-center space-x-2"
      >
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
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>New Folder</span>
      </button>
    </div>
  );
}

