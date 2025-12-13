"use client";

import { useState } from "react";

interface FileInfo {
  filename: string;
  size: number;
  uploadedAt: string;
  modifiedAt: string;
  path: string;
}

interface FileListProps {
  files: FileInfo[];
  loading: boolean;
  backendUrl: string;
  onDeleteSuccess: () => void;
}

export default function FileList({
  files,
  loading,
  backendUrl,
  onDeleteSuccess,
}: FileListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
      zip: "📦",
      rar: "📦",
      txt: "📋",
    };
    return iconMap[ext || ""] || "📎";
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    setDeleting(filename);
    try {
      const response = await fetch(`${backendUrl}/api/files/${filename}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
      }

      onDeleteSuccess();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete file");
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (filename: string) => {
    window.open(`${backendUrl}/uploads/${filename}`, "_blank");
  };

  if (loading) {
    return (
      <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Files</h2>
        <div className="text-center py-8 text-neutral-600">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-neutral-900">Files</h2>
        <span className="text-sm text-neutral-600 font-medium">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-12 text-neutral-600">
          <p className="text-lg mb-2">No files uploaded yet</p>
          <p className="text-sm">Upload files using the form above</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.filename}
              className="flex items-center justify-between p-4 border-2 border-neutral-200 rounded-xl hover:border-accent-yellow hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="text-3xl flex-shrink-0">
                  {getFileIcon(file.filename)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-900 truncate">
                    {file.filename}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-600">
                    <span>{formatFileSize(file.size)}</span>
                    <span>•</span>
                    <span>{formatDate(file.uploadedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleDownload(file.filename)}
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
                  title="Download"
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
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(file.filename)}
                  disabled={deleting === file.filename}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  title="Delete"
                >
                  {deleting === file.filename ? (
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
                      className="animate-spin"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  ) : (
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
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

