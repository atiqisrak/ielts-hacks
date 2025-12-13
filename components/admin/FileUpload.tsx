"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
  backendUrl: string;
  folderPath: string;
  onUploadSuccess: () => void;
}

export default function FileUpload({
  backendUrl,
  folderPath,
  onUploadSuccess,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(null);

    try {
      if (files.length === 1) {
        await uploadSingleFile(files[0]);
      } else {
        await uploadMultipleFiles(files);
      }
      onUploadSuccess();
      setUploadProgress("Upload successful!");
      setTimeout(() => setUploadProgress(null), 3000);
    } catch (error) {
      setUploadProgress(
        error instanceof Error ? error.message : "Upload failed"
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const uploadSingleFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", folderPath);

    const response = await fetch(`${backendUrl}/api/files/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    return response.json();
  };

  const uploadMultipleFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("folderPath", folderPath);

    const response = await fetch(`${backendUrl}/api/files/upload-multiple`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    return response.json();
  };

  return (
    <div className="bg-neutral-0 border-2 border-neutral-200 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-4">
        Upload Files
      </h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging
            ? "border-accent-yellow bg-accent-yellow-light"
            : "border-neutral-300 hover:border-neutral-400"
        } ${uploading ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-accent-yellow-light rounded-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-yellow-dark"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>

          <div>
            <p className="text-lg font-bold text-neutral-900 mb-1">
              {isDragging
                ? "Drop files here"
                : uploading
                  ? "Uploading..."
                  : "Drag & drop files here"}
            </p>
            <p className="text-sm text-neutral-600">
              or click to browse files
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              Supports PDF, DOC, images, and more (Max 500MB per file)
            </p>
          </div>
        </div>
      </div>

      {uploadProgress && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm font-medium ${
            uploadProgress.includes("successful")
              ? "bg-green-50 text-green-700 border-2 border-green-200"
              : "bg-red-50 text-red-700 border-2 border-red-200"
          }`}
        >
          {uploadProgress}
        </div>
      )}
    </div>
  );
}

