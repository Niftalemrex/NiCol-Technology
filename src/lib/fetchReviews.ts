export async function fetchReviews() {
  const res = await fetch("/api/reviews");

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}