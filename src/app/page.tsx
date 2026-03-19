"use client";

import React, { useEffect, useState } from "react";
import StructuredData from "../components/seo/StructuredData";
import { supabase } from "../lib/supabaseClient";
import "./HomePage.css";

interface Review {
  id?: string;
  name: string;
  comment: string;
  rating: number;
  created_at?: string;
}

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setReviews(data || []);

    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => Math.floor(r.rating) === stars).length
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NiCol Technologies",
    aggregateRating: totalReviews > 0 ? {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    } : undefined,
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.created_at,
      reviewBody: r.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      
      {/* Add the wrapper class here */}
      <div className="home-page-wrapper">
        <div className="reviews-page">
          <div className="reviews-container">
            {/* Header Section */}
            <div className="reviews-header">
              <h1 className="reviews-title">Customer Reviews</h1>
              <p className="reviews-subtitle">
                See what our clients say about their experience working with us
              </p>
            </div>

            {/* Rating Summary Section */}
            {totalReviews > 0 && (
              <div className="rating-section">
                {/* Average Rating - Left Column on Desktop, Top on Mobile */}
                <div className="rating-average">
                  <div className="average-number">{avgRating}</div>
                  <div className="average-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= Number(avgRating) ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <div className="average-total">
                    Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                  </div>
                </div>

                {/* Rating Distribution - Right Column on Desktop, Bottom on Mobile */}
                <div className="rating-distribution">
                  {ratingCounts.map(({ stars, count }) => (
                    <div key={stars} className="distribution-item">
                      <span className="distribution-stars">{stars} ★</span>
                      <span className="distribution-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading reviews...</p>
              </div>
            )}

            {/* No Reviews State */}
            {!loading && totalReviews === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3 className="empty-title">No Reviews Yet</h3>
                <p className="empty-text">Be the first to share your experience with us!</p>
              </div>
            )}

            {/* Reviews Grid */}
            {!loading && totalReviews > 0 && (
              <div className="reviews-grid">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card-header">
                      <div className="reviewer-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="reviewer-info">
                        <h3 className="reviewer-name">{review.name}</h3>
                        <div className="reviewer-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`star ${star <= review.rating ? 'filled' : ''}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="review-comment">{review.comment}</p>
                    
                    {review.created_at && (
                      <div className="review-date">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}