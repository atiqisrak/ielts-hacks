"use client";

import { useState } from "react";

interface PasswordModalProps {
  backendUrl: string;
  onVerify: () => void;
}

export default function PasswordModal({
  backendUrl,
  onVerify,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/admin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid password");
      }

      // Store authorization with expiration (1 hour)
      const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem("admin_auth", expirationTime.toString());
      setPassword("");
      onVerify();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-0 rounded-2xl p-6 max-w-md w-full border-2 border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Admin Access Required
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Please enter the admin password to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            placeholder="Enter password"
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl mb-4 focus:outline-none focus:border-accent-yellow"
            autoFocus
            disabled={loading}
          />
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full px-4 py-2 bg-accent-yellow text-neutral-900 font-bold rounded-xl hover:bg-accent-yellow-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
