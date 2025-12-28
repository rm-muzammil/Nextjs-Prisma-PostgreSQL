"use client";
import React from "react";

function Navbar() {
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/auth/login";
  };
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl ">MyApp</div>
          <div className="">
            <a href="/" className="text-gray-300 hover:text-white mx-2">
              Home
            </a>
            <a href="/posts" className="text-gray-300 hover:text-white mx-2">
              Posts
            </a>
            <a href="/chat" className="text-gray-300 hover:text-white mx-2">
              Chat
            </a>
          </div>
          <button onClick={logout} className="text-white hover:text-gray-300">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
