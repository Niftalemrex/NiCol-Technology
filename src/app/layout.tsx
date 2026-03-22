// src/app/layout.tsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StructuredData from "../components/seo/StructuredData";
import { getReviews, Review } from "../lib/fetchReviews"; // ✅ updated

// Metadata for the page
export const metadata = {
  title: "NiCol Technologies | AI, Web & Mobile Solutions",
  description:
    "NiCol Technologies provides AI, Web, and Mobile solutions in Ethiopia. Check our services, reviews, and contact information.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side fetch reviews
  let reviews: Review[] = [];
  try {
    reviews = await getReviews(); // ✅ updated function
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
  }

  const totalReviews = reviews.length;

  // Properly typed reduce function
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "5.0";

  // Structured Data for SEO (LocalBusiness + Reviews)
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NiCol Technologies",
    image: [
      "https://www.nicol.com/images/photo1.jpg",
      "https://www.nicol.com/images/photo2.jpg",
      "https://www.nicol.com/images/photo3.jpg",
    ],
    url: "https://nicol-technology.vercel.app",
    telephone: "+251-939-193603",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Getu Commercial Center, Bole",
      addressLocality: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
    priceRange: "ETB 53,151",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.facebook.com/nicoltech",
      "https://www.linkedin.com/company/nicoltech",
      "https://twitter.com/nicoltech",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r: Review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
      reviewBody: r.comment,
      datePublished: r.created_at,
    })),
  };

  return (
    <html lang="en">
      <head>
        <StructuredData data={localBusinessData} />
        <meta
          name="google-site-verification"
          content="RFZMKVAHZrhhNWLMbceVlARwcs7Rj3Z2kE-dTCTP0Vw"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}