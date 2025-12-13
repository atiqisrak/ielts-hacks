"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FileUpload from "@/components/admin/FileUpload";
import FileGrid from "@/components/admin/FileGrid";
import FolderNavigation from "@/components/admin/FolderNavigation";
import PasswordModal from "@/components/admin/PasswordModal";

interface FileItem {
  name: string;
  filename?: string;
  type: "file" | "folder";
  size?: number;
  uploadedAt: string;
  modifiedAt: string;
  path: string;
  folderPath?: string;
}

export default function AdminPage() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);
  const [availableFolders, setAvailableFolders] = useState<FileItem[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  // Check authorization status
  const checkAuthorization = () => {
    if (typeof window === "undefined") return false;

    const authExpiration = localStorage.getItem("admin_auth");
    if (!authExpiration) {
      return false;
    }

    const expirationTime = parseInt(authExpiration, 10);
    const now = Date.now();

    if (now >= expirationTime) {
      localStorage.removeItem("admin_auth");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const authorized = checkAuthorization();
    setIsAuthorized(authorized);
    setShowPasswordModal(!authorized);

    // Check authorization every minute
    const interval = setInterval(() => {
      const stillAuthorized = checkAuthorization();
      if (!stillAuthorized) {
        setIsAuthorized(false);
        setShowPasswordModal(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const fetchItems = async (folderPath: string = currentFolder) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${backendUrl}/api/files?folderPath=${encodeURIComponent(folderPath)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      const itemsWithFolderPath = (data.items || []).map((item: FileItem) => ({
        ...item,
        folderPath:
          item.type === "folder" ? folderPath : item.folderPath || folderPath,
      }));
      setItems(itemsWithFolderPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFolders = async (
    folderPath: string = "root",
    allFolders: FileItem[] = []
  ): Promise<FileItem[]> => {
    try {
      const response = await fetch(
        `${backendUrl}/api/files?folderPath=${encodeURIComponent(folderPath)}`
      );
      if (response.ok) {
        const data = await response.json();
        const folders = data.items.filter(
          (item: FileItem) => item.type === "folder"
        );
        allFolders.push(...folders);

        // Recursively fetch subfolders
        for (const folder of folders) {
          await fetchAllFolders(folder.path, allFolders);
        }
      }
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
    return allFolders;
  };

  const loadAllFolders = async () => {
    const folders = await fetchAllFolders();
    setAvailableFolders(folders);
  };

  useEffect(() => {
    fetchItems(currentFolder);
  }, [currentFolder]);

  const handleFileUploaded = () => {
    fetchItems(currentFolder);
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setCurrentFolder(item.path);
    }
  };

  const handleDelete = async (item: FileItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/files/${encodeURIComponent(
          item.name
        )}?folderPath=${encodeURIComponent(item.folderPath || currentFolder)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
      }

      fetchItems(currentFolder);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete item");
    }
  };

  const handleCopyLink = async (item: FileItem) => {
    if (item.type === "file") {
      const fullUrl = `${backendUrl}${item.path}`;
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Link copied to clipboard!");
      }
    }
  };

  const handleMoveClick = (item: FileItem) => {
    setSelectedItem(item);
    setShowMoveDialog(true);
    loadAllFolders();
  };

  const handleCopyClick = (item: FileItem) => {
    setSelectedItem(item);
    setShowCopyDialog(true);
    loadAllFolders();
  };

  const handleMove = async (destinationPath: string) => {
    if (!selectedItem) return;

    try {
      const response = await fetch(`${backendUrl}/api/files/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedItem.name,
          sourcePath: selectedItem.folderPath || currentFolder,
          destinationPath: destinationPath,
          type: selectedItem.type,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Move failed");
      }

      setShowMoveDialog(false);
      setSelectedItem(null);
      fetchItems(currentFolder);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to move item");
    }
  };

  const handleCopy = async (destinationPath: string) => {
    if (!selectedItem) return;

    try {
      const response = await fetch(`${backendUrl}/api/files/copy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedItem.name,
          sourcePath: selectedItem.folderPath || currentFolder,
          destinationPath: destinationPath,
          type: selectedItem.type,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Copy failed");
      }

      setShowCopyDialog(false);
      setSelectedItem(null);
      fetchItems(currentFolder);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to copy item");
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert("Please enter a folder name");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderName: newFolderName.trim(),
          parentPath: currentFolder,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create folder");
      }

      setShowCreateFolder(false);
      setNewFolderName("");
      fetchItems(currentFolder);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create folder");
    }
  };

  const handleNavigate = (folderPath: string) => {
    setCurrentFolder(folderPath);
  };

  const handlePasswordVerified = () => {
    setIsAuthorized(true);
    setShowPasswordModal(false);
  };

  // Don't render admin content until authorization is checked (client-side only)
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (!isAuthorized) {
    return (
      <>
        {showPasswordModal && (
          <PasswordModal
            backendUrl={backendUrl}
            onVerify={handlePasswordVerified}
          />
        )}
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-neutral-600">
                Please enter the admin password to continue.
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            File Management
          </h1>
          <p className="text-neutral-600">
            Upload, view, and manage files and assets
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <FileUpload
            backendUrl={backendUrl}
            folderPath={currentFolder}
            onUploadSuccess={handleFileUploaded}
          />

          <FolderNavigation
            currentFolder={currentFolder}
            onNavigate={handleNavigate}
            onCreateFolder={() => setShowCreateFolder(true)}
          />

          <FileGrid
            items={items}
            loading={loading}
            backendUrl={backendUrl}
            currentFolder={currentFolder}
            onItemClick={handleItemClick}
            onDelete={handleDelete}
            onCopyLink={handleCopyLink}
            onMove={handleMoveClick}
            onCopy={handleCopyClick}
          />
        </div>
      </main>
      <Footer />

      {/* Create Folder Dialog */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-0 rounded-2xl p-6 max-w-md w-full border-2 border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Create New Folder
            </h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl mb-4 focus:outline-none focus:border-accent-yellow"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateFolder();
                }
              }}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCreateFolder}
                className="flex-1 px-4 py-2 bg-accent-yellow text-neutral-900 font-bold rounded-xl hover:bg-accent-yellow-dark transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName("");
                }}
                className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move Dialog */}
      {showMoveDialog && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-0 rounded-2xl p-6 max-w-md w-full border-2 border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Move "{selectedItem.name}"
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {selectedItem?.type !== "folder" ||
              selectedItem?.path !== "root" ? (
                <button
                  onClick={() => handleMove("root")}
                  className="w-full text-left px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  Root
                </button>
              ) : null}
              {availableFolders
                .filter(
                  (folder) =>
                    selectedItem?.type !== "folder" ||
                    (folder.path !== selectedItem.path &&
                      !folder.path.startsWith(`${selectedItem.path}/`))
                )
                .map((folder) => (
                  <button
                    key={folder.path}
                    onClick={() => handleMove(folder.path)}
                    className="w-full text-left px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                  >
                    {folder.path}
                  </button>
                ))}
            </div>
            <button
              onClick={() => {
                setShowMoveDialog(false);
                setSelectedItem(null);
              }}
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Copy Dialog */}
      {showCopyDialog && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-0 rounded-2xl p-6 max-w-md w-full border-2 border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Copy "{selectedItem.name}"
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {selectedItem?.type !== "folder" ||
              selectedItem?.path !== "root" ? (
                <button
                  onClick={() => handleCopy("root")}
                  className="w-full text-left px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  Root
                </button>
              ) : null}
              {availableFolders
                .filter(
                  (folder) =>
                    selectedItem?.type !== "folder" ||
                    (folder.path !== selectedItem.path &&
                      !folder.path.startsWith(`${selectedItem.path}/`))
                )
                .map((folder) => (
                  <button
                    key={folder.path}
                    onClick={() => handleCopy(folder.path)}
                    className="w-full text-left px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                  >
                    {folder.path}
                  </button>
                ))}
            </div>
            <button
              onClick={() => {
                setShowCopyDialog(false);
                setSelectedItem(null);
              }}
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Password Modal - shown when authorization expires */}
      {showPasswordModal && (
        <PasswordModal
          backendUrl={backendUrl}
          onVerify={handlePasswordVerified}
        />
      )}
    </div>
  );
}
