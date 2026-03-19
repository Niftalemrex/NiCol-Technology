import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StructuredData from "../components/seo/StructuredData";

// Import external CSS
import "./RootLayout.css";

export const metadata = {
  title: "NiCol Technologies | AI, Web & Mobile Solutions",
  description:
    "NiCol Technologies provides AI, Web, and Mobile solutions in Ethiopia. Check our services, reviews, and contact information.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Structured data for SEO
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NiCol Technologies",
    url: "https://www.nicol.com",
    logo: "https://www.nicol.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/nicoltech",
      "https://www.linkedin.com/company/nicoltech",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+251-911-123456",
        contactType: "customer service",
        areaServed: "ET",
        availableLanguage: ["English", "Amharic"],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationData} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
      </head>
      <body>
        <Header />
        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}