"use client";

import React, { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";
import "./AdminAuth.css";

export default function AdminAuthPage() {
  const [email, setEmail] = useState("");          // Admin email
  const [password, setPassword] = useState("");    // Admin password
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Only login (no signup)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      // Successful login → redirect to admin dashboard
      router.push("/admin");
    }
  };

  return (
    <section className="admin-auth-section">
      <h1 className="admin-auth-title">Admin Login</h1>

      <form onSubmit={handleLogin} className="admin-auth-form">
        <input
          type="email"
          placeholder="Admin Email"
          className="admin-auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="admin-auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="admin-auth-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}