// src/lib/fetchReviews.ts
export async function fetchReviews() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // uses env variable
  if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");

  const res = await fetch(`${baseUrl}/api/reviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}