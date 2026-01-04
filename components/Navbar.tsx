"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/auth/login";
  };

  return (
    <nav className="bg-gray-900 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white tracking-wide">
          Superblog
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/articles"
            className="text-gray-300 hover:text-white transition"
          >
            Articles
          </Link>

          <Link
            href="/articles/new"
            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition"
          >
            Write
          </Link>

          <button
            onClick={logout}
            className="text-sm text-red-400 hover:text-red-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
