// lib/fetchReviews.ts
import { supabase } from "./supabaseClient";

// ✅ Type for a review row
export type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
};

// ✅ Fetch reviews
export async function getReviews(): Promise<Review[]> {
  try {
    // First type arg: table name as string literal
    // Second type arg: row type
    const { data, error } = await supabase
      .from("reviews")  // ✅ only table name here
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching reviews:", error.message);
      return [];
    }

    return (data as Review[]) || [];
  } catch (err) {
    console.error("Unexpected error fetching reviews:", err);
    return [];
  }
}