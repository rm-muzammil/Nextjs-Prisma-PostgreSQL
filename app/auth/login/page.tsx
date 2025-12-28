"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/chat");
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
