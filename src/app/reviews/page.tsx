"use client";

import React, { useEffect, useState } from "react";
import StructuredData from "../../components/seo/StructuredData";
import { getReviews, Review } from "../../lib/fetchReviews"; // ✅ updated import
import Card from "../../components/ui/Card";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  // 🔄 Load reviews
  async function loadReviews() {
    try {
      const data = await getReviews(); // ✅ use getReviews
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  // 🚀 Submit via API
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('idle');

    if (!form.name.trim() || !form.comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setFormStatus('success');
      setForm({ name: "", comment: "", rating: 5 });
      await loadReviews();
      
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  // Filter reviews by rating
  const filteredReviews = activeFilter 
    ? reviews.filter(r => Math.floor(r.rating) === activeFilter)
    : reviews;

  // 📊 Calculate statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";
  
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => Math.floor(r.rating) === stars).length,
    percentage: totalReviews > 0 
      ? (reviews.filter(r => Math.floor(r.rating) === stars).length / totalReviews) * 100 
      : 0
  }));

  // SEO data
  const reviewsData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NiCol Technologies",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
      datePublished: r.created_at,
    })),
  };
  return (
    <>
      <StructuredData data={reviewsData} />
      
      <div className="reviews-page">
        {/* Floating Background Icons - Matching other components */}
        <div className="reviews-floating-icons">
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-message"></i>
          <i className="fa-regular fa-thumbs-up"></i>
          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-comment"></i>
          <i className="fa-regular fa-user"></i>
        </div>

        {/* Hero Section with iOS 16 Glass */}
        <section className="reviews-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-star">✦</span>
                Customer Reviews
                <span className="badge-star">✦</span>
              </div>
              <h1 className="hero-title">
                What Our <span className="gradient-text">Clients</span> Say
              </h1>
              <p className="hero-subtitle">
                Join 50+ satisfied businesses that have transformed their digital presence with us
              </p>
            </div>
            
            {/* iOS 16 Glass Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-value">{avgRating}</div>
                <div className="stat-label">Average Rating</div>
                <div className="stat-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= Number(avgRating) ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <div className="stat-trend">Based on {totalReviews} reviews</div>
              </div>
              
              <div className="stat-card glass-card">
                <div className="stat-value">{totalReviews}</div>
                <div className="stat-label">Total Reviews</div>
                <div className="stat-icon-group">
                  <i className="fa-regular fa-message"></i>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <div className="stat-trend positive">↑ 20% this month</div>
              </div>
              
              <div className="stat-card glass-card">
                <div className="stat-value">98%</div>
                <div className="stat-label">Satisfaction Rate</div>
                <div className="stat-icon-group">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-regular fa-face-smile"></i>
                </div>
                <div className="stat-trend positive">↑ 12% vs last month</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="reviews-main">
          <div className="container">
            <div className="reviews-layout">
              {/* Left Column - Review Form & Distribution */}
              <div className="reviews-form-column">
                {/* iOS 16 Glass Form Card */}
                <div className="form-card glass-card">
                  <h2 className="form-title">Write a Review</h2>
                  <p className="form-subtitle">Share your experience with our community</p>
                  
                  <form onSubmit={handleSubmit} className="review-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <i className="fa-regular fa-user"></i>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rating" className="form-label">
                        <i className="fa-regular fa-star"></i>
                        Rating
                      </label>
                      <div className="rating-selector">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setForm({ ...form, rating })}
                            onMouseEnter={() => setHoveredRating(rating)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className={`rating-star ${(hoveredRating || form.rating) >= rating ? 'active' : ''}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="comment" className="form-label">
                        <i className="fa-regular fa-message"></i>
                        Your Review
                      </label>
                      <textarea
                        id="comment"
                        placeholder="Tell us about your experience..."
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                        className="form-textarea"
                        rows={5}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="submit-button"
                    >
                      {submitting ? (
                        <>
                          <span className="spinner"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-paper-plane"></i>
                          Submit Review
                        </>
                      )}
                    </button>

                    {formStatus === 'success' && (
                      <div className="success-message">
                        <i className="fa-regular fa-circle-check"></i>
                        Thank you for your review!
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="error-message">
                        <i className="fa-regular fa-circle-exclamation"></i>
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </form>
                </div>

                {/* Rating Distribution Card */}
                {totalReviews > 0 && (
                  <div className="distribution-card glass-card">
                    <h3 className="distribution-title">
                      <i className="fa-regular fa-chart-bar"></i>
                      Rating Distribution
                    </h3>
                    <div className="distribution-bars">
                      {ratingCounts.map(({ stars, count, percentage }) => (
                        <div 
                          key={stars} 
                          className={`distribution-row ${activeFilter === stars ? 'active' : ''}`}
                          onClick={() => setActiveFilter(activeFilter === stars ? null : stars)}
                        >
                          <span className="stars-label">{stars} ★</span>
                          <div className="progress-bar-container">
                            <div 
                              className="progress-bar" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="count-label">{count}</span>
                        </div>
                      ))}
                    </div>
                    {activeFilter && (
                      <button 
                        className="clear-filter"
                        onClick={() => setActiveFilter(null)}
                      >
                        <i className="fa-regular fa-xmark"></i>
                        Clear filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column - Reviews List */}
              <div className="reviews-list-column">
                <div className="reviews-header">
                  <h2 className="reviews-title">
                    <i className="fa-regular fa-comments"></i>
                    Customer Reviews
                  </h2>
                  <span className="reviews-count">
                    {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>

                {loading ? (
                  <div className="loading-state glass-card">
                    <div className="spinner"></div>
                    <p>Loading reviews...</p>
                  </div>
                ) : filteredReviews.length === 0 ? (
                  <div className="empty-state glass-card">
                    <div className="empty-icon">
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <h3 className="empty-title">
                      {activeFilter ? `No ${activeFilter}-star reviews yet` : 'No Reviews Yet'}
                    </h3>
                    <p className="empty-description">
                      {activeFilter 
                        ? `Be the first to leave a ${activeFilter}-star review!`
                        : 'Be the first to share your experience with us!'}
                    </p>
                    {activeFilter && (
                      <button 
                        className="empty-action"
                        onClick={() => setActiveFilter(null)}
                      >
                        View all reviews
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="reviews-grid">
                    {filteredReviews.map((review) => (
                      <div key={review.id} className="review-card-wrapper">
                        <Card>
                          <div className="review-header">
                            <div className="reviewer-info">
                              <div className="reviewer-avatar">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="reviewer-name">{review.name}</h3>
                                <div className="review-rating">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span 
                                      key={star} 
                                      className={`star ${star <= review.rating ? 'filled' : ''}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {review.created_at && (
                              <span className="review-date">
                                <i className="fa-regular fa-calendar"></i>
                                {new Date(review.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                          <p className="review-comment">{review.comment}</p>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="trust-badges">
          <div className="container">
            <div className="badges-grid">
              <div className="badge-item">
                <i className="fa-regular fa-shield badge-icon"></i>
                <span className="badge-text">Verified Reviews</span>
              </div>
              <div className="badge-item">
                <i className="fa-regular fa-lock badge-icon"></i>
                <span className="badge-text">Secure & Private</span>
              </div>
              <div className="badge-item">
                <i className="fa-regular fa-clock badge-icon"></i>
                <span className="badge-text">Real Customer Feedback</span>
              </div>
              <div className="badge-item">
                <i className="fa-regular fa-circle-check badge-icon"></i>
                <span className="badge-text">Authentic Experiences</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}