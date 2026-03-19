import React from "react";
import Script from "next/script";

export default function StructuredData({ data }: { data: any }) {
  return (
    <Script
      type="application/ld+json"
      id="structured-data"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}