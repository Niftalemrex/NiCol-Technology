"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StructuredData from "../components/seo/StructuredData";
import { fetchReviews } from "../lib/fetchReviews"; // your existing reviews API
import "./RootLayout.css";

export const metadata = {
  title: "NiCol Technologies | AI, Web & Mobile Solutions",
  description:
    "NiCol Technologies provides AI, Web, and Mobile solutions in Ethiopia. Check our services, reviews, and contact information.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Load reviews from API
  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await fetchReviews();
        setReviews(data || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  // 📊 Compute ratings
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  // 🌐 Structured Data for SEO (LocalBusiness + AggregateRating + Reviews + Contact)
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NiCol Technologies",
    url: "https://nicol-technology.vercel.app",
    logo: "https://www.nicol.com/images/logo.png",
    telephone: "+251-911-123456",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Getu Commercial Center, Bole",
      addressLocality: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.facebook.com/nicoltech",
      "https://www.linkedin.com/company/nicoltech",
    ],
    aggregateRating: totalReviews > 0 ? {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1"
    } : undefined,
    review: reviews.map(r => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5"
      },
      reviewBody: r.comment,
      datePublished: r.created_at
    }))
  };

  return (
    <html lang="en">
      <head>
        {/* SEO structured data */}
        <StructuredData data={localBusinessData} />

        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="RFZMKVAHZrhhNWLMbceVlARwcs7Rj3Z2kE-dTCTP0Vw"
        />

        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Font Awesome CDN */}
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