"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import "./AdminPage.css";

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  handled: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return alert("You must be logged in to access admin.");
      setUser(data.session.user);
    });
  }, []);

  async function loadData() {
    setLoading(true);
    const { data: revData } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(revData || []);

    const { data: msgData } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(msgData || []);

    setLoading(false);
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  async function deleteReview(id: string) {
    await supabase.from("reviews").delete().eq("id", id);
    loadData();
  }

  async function handleMessage(id: string) {
    await supabase
      .from("contact_messages")
      .update({ handled: true })
      .eq("id", id);
    loadData();
  }

  if (!user) return <p className="admin-loading">Checking authentication...</p>;
  if (loading) return <p className="admin-loading">Loading admin data...</p>;

  return (
    <section className="admin-section">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-table-wrapper">
        <h2 className="admin-subtitle">Customer Reviews</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.comment}</td>
                <td>{r.rating}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => deleteReview(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-table-wrapper">
        <h2 className="admin-subtitle">Contact Messages</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Handled</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.message}</td>
                <td>{m.handled ? "✅" : "❌"}</td>
                <td>{new Date(m.created_at).toLocaleDateString()}</td>
                <td>
                  {!m.handled && (
                    <button
                      className="btn-handle"
                      onClick={() => handleMessage(m.id)}
                    >
                      Mark Handled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}