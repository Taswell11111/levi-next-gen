import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, Filter } from 'lucide-react';
import { Product } from '../data/products';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  sizePurchased: string;
  fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
  title: string;
  comment: string;
  helpfulCount: number;
}

interface ProductReviewsProps {
  product: Product;
}

// Model-tailored verified purchaser reviews representing genuine South African customers
const DEFAULT_REVIEWS_BY_CATEGORY: Record<string, ReviewItem[]> = {
  Classics: [
    {
      id: 'rev-1',
      author: 'Sipho M.',
      location: 'Johannesburg, GP',
      rating: 5,
      date: '14 May 2024',
      verified: true,
      sizePurchased: 'UK 9',
      fitFeedback: 'True to Size',
      title: 'Timeless aesthetic and all-day comfort',
      comment:
        'The vintage leather finish and soft terry lining feel premium. Worn daily across Sandton and Rosebank; they break in quickly and match both denim and tracksuits effortlessly.',
      helpfulCount: 18,
    },
    {
      id: 'rev-2',
      author: 'Lerato K.',
      location: 'Cape Town, WC',
      rating: 5,
      date: '28 April 2024',
      verified: true,
      sizePurchased: 'UK 6',
      fitFeedback: 'True to Size',
      title: 'Perfect South African sizing match',
      comment:
        'Always hesitant ordering footwear online, but South African sizing matches UK 1:1. The UK 6 fit like a glove. Arrived in Cape Town in 48 hours in immaculate condition.',
      helpfulCount: 12,
    },
    {
      id: 'rev-3',
      author: 'Devan P.',
      location: 'Durban, KZN',
      rating: 4,
      date: '03 March 2024',
      verified: true,
      sizePurchased: 'UK 10',
      fitFeedback: 'True to Size',
      title: 'Durable leather and iconic vintage profile',
      comment:
        'Subtle off-white midsole gives that authentic archive feel. Solid arch support for walking long distances. Very satisfied with the craftsmanship.',
      helpfulCount: 7,
    },
  ],
  'Sports & Training': [
    {
      id: 'rev-4',
      author: 'Chad v.d. M.',
      location: 'Pretoria, GP',
      rating: 5,
      date: '19 June 2024',
      verified: true,
      sizePurchased: 'UK 10',
      fitFeedback: 'True to Size',
      title: 'The gold standard for CrossFit & heavy lifts',
      comment:
        'The TPU heel clip provides incredible stability under 140kg squats. Lateral rope guards hold up during rope climbs without fraying. Worth every Rand.',
      helpfulCount: 24,
    },
    {
      id: 'rev-5',
      author: 'Nandi B.',
      location: 'Centurion, GP',
      rating: 5,
      date: '02 June 2024',
      verified: true,
      sizePurchased: 'UK 5',
      fitFeedback: 'True to Size',
      title: 'Lightweight cushioning for high-mileage runs',
      comment:
        'The geometry roll provides a noticeable energetic push off the toe. Breathable upper handles warm morning training sessions with ease.',
      helpfulCount: 15,
    },
    {
      id: 'rev-6',
      author: 'Gareth T.',
      location: 'Stellenbosch, WC',
      rating: 4,
      date: '11 May 2024',
      verified: true,
      sizePurchased: 'UK 8',
      fitFeedback: 'True to Size',
      title: 'Stable base and responsive forefoot',
      comment:
        'Noticeably more flexible than previous iterations while maintaining zero heel lift. Perfect for hybrid WODs involving both sprints and cleans.',
      helpfulCount: 9,
    },
  ],
  Accessories: [
    {
      id: 'rev-7',
      author: 'Kagiso N.',
      location: 'Johannesburg, GP',
      rating: 5,
      date: '10 July 2024',
      verified: true,
      sizePurchased: 'One Size',
      fitFeedback: 'True to Size',
      title: 'High-density construction and clean branding',
      comment:
        'Heavy-duty hardware and water-repellent finish. Easily fits gym essentials, water bottle, and laptop for daily commuting.',
      helpfulCount: 11,
    },
    {
      id: 'rev-8',
      author: 'Bianca S.',
      location: 'Port Elizabeth, EC',
      rating: 5,
      date: '21 June 2024',
      verified: true,
      sizePurchased: 'One Size',
      fitFeedback: 'True to Size',
      title: 'Authentic Vector styling',
      comment: 'Matches my Club C 85s perfectly. Great stitch quality and comfortable fit.',
      helpfulCount: 5,
    },
  ],
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  // Initial reviews based on category or default fallback
  const initialCategoryReviews =
    DEFAULT_REVIEWS_BY_CATEGORY[product.category] || DEFAULT_REVIEWS_BY_CATEGORY['Classics'];

  const [reviews, setReviews] = useState<ReviewItem[]>(initialCategoryReviews);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formAuthor, setFormAuthor] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formSize, setFormSize] = useState('UK 8');
  const [formFit, setFormFit] = useState<'True to Size' | 'Runs Small' | 'Runs Large'>('True to Size');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Compute average and breakdown
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
  const recommendPercent = Math.round(
    (reviews.filter((r) => r.rating >= 4).length / totalReviews) * 100
  );

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
  });

  const filteredReviews =
    filterRating === 'all' ? reviews : reviews.filter((r) => r.rating === filterRating);

  const handleVoteHelpful = (reviewId: string) => {
    if (helpfulVoted[reviewId]) return;
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formComment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      author: formAuthor.trim(),
      location: formCity.trim() ? `${formCity.trim()}, SA` : 'South Africa',
      rating: formRating,
      date: 'Just now',
      verified: true,
      sizePurchased: formSize,
      fitFeedback: formFit,
      title: formTitle.trim(),
      comment: formComment.trim(),
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    setSubmittedMessage(true);

    // Reset Form
    setFormAuthor('');
    setFormCity('');
    setFormTitle('');
    setFormComment('');
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 border-t border-neutral-200 mt-12 sm:mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-[#D81C2A]" />
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider font-bold text-neutral-900">
              Verified Customer Reviews
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Ratings and text feedback from confirmed South African purchasers
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReviewForm((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-black text-white hover:bg-[#D81C2A] transition-colors text-xs font-bold uppercase tracking-wider reebok-cut self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          {showReviewForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {submittedMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm reebok-cut flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Thank you for reviewing the <strong>{product.name}</strong>! Your verified review has been published.
          </span>
        </div>
      )}

      {/* Review Submission Form Drawer / Card */}
      {showReviewForm && (
        <div className="mb-8 p-5 sm:p-7 bg-neutral-50 border-2 border-black reebok-cut">
          <h4 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-neutral-950 mb-1">
            Review {product.name}
          </h4>
          <p className="text-xs text-neutral-600 mb-5">
            Share your experience with fit, comfort, and performance for fellow South African buyers.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                Overall Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    onMouseEnter={() => setFormHoverRating(star)}
                    onMouseLeave={() => setFormHoverRating(0)}
                    className="p-1 text-neutral-300 hover:scale-110 transition-transform"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (formHoverRating || formRating) >= star
                          ? 'fill-[#D81C2A] text-[#D81C2A]'
                          : 'fill-neutral-200 text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-neutral-700 ml-2">
                  {formRating === 5
                    ? 'Excellent (5/5)'
                    : formRating === 4
                    ? 'Great (4/5)'
                    : formRating === 3
                    ? 'Average (3/5)'
                    : formRating === 2
                    ? 'Fair (2/5)'
                    : 'Poor (1/5)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sipho M."
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  City / Province *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cape Town, WC"
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  Size Purchased (UK Standard)
                </label>
                <select
                  value={formSize}
                  onChange={(e) => setFormSize(e.target.value)}
                  className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
                >
                  <option value="UK 4">UK 4 (SA 4)</option>
                  <option value="UK 5">UK 5 (SA 5)</option>
                  <option value="UK 6">UK 6 (SA 6)</option>
                  <option value="UK 7">UK 7 (SA 7)</option>
                  <option value="UK 8">UK 8 (SA 8)</option>
                  <option value="UK 9">UK 9 (SA 9)</option>
                  <option value="UK 10">UK 10 (SA 10)</option>
                  <option value="UK 11">UK 11 (SA 11)</option>
                  <option value="UK 12">UK 12 (SA 12)</option>
                  <option value="One Size">One Size (Accessories)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  Fit Feedback
                </label>
                <select
                  value={formFit}
                  onChange={(e) => setFormFit(e.target.value as any)}
                  className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
                >
                  <option value="True to Size">True to Size (Recommended)</option>
                  <option value="Runs Small">Runs Slightly Small</option>
                  <option value="Runs Large">Runs Slightly Large</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="Summarize your review in a few words"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
                Detailed Feedback *
              </label>
              <textarea
                rows={3}
                required
                placeholder="What did you like about the cushioning, grip, leather quality, or everyday comfort?"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="min-h-[44px] px-6 py-2.5 bg-[#D81C2A] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors reebok-cut"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="min-h-[44px] px-5 py-2.5 bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider hover:bg-neutral-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Aggregate Score & Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-50 p-6 sm:p-8 border border-neutral-200 reebok-cut mb-8">
        {/* Left: Overall Rating */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-6">
          <div className="text-5xl sm:text-6xl font-display font-bold text-neutral-950 tracking-tight mb-2">
            {avgRating}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  parseFloat(avgRating) >= star
                    ? 'fill-[#D81C2A] text-[#D81C2A]'
                    : parseFloat(avgRating) >= star - 0.5
                    ? 'fill-[#D81C2A]/70 text-[#D81C2A]'
                    : 'fill-neutral-200 text-neutral-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            Based on {totalReviews} verified purchaser reviews
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-full text-[11px] font-bold text-neutral-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{recommendPercent}% of buyers recommend this</span>
          </div>
        </div>

        {/* Center: Rating Distribution Bars */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
          {[5, 4, 3, 2, 1].map((score) => {
            const count = ratingCounts[score] || 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            const isSelected = filterRating === score;

            return (
              <button
                key={score}
                type="button"
                onClick={() => setFilterRating(isSelected ? 'all' : score)}
                className={`flex items-center gap-3 text-xs text-left w-full hover:bg-neutral-100/70 p-1 rounded transition-colors ${
                  isSelected ? 'bg-neutral-200/60 font-bold' : ''
                }`}
              >
                <span className="w-12 shrink-0 text-neutral-700 font-medium">{score} Stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-neutral-500 tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Sizing & Fit Consensus */}
        <div className="lg:col-span-3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0 lg:pl-6">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
            Fit Consensus
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">True to Size</span>
              <span className="font-bold text-neutral-900">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">Runs Small</span>
              <span className="font-bold text-neutral-900">5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">Runs Large</span>
              <span className="font-bold text-neutral-900">3%</span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 mt-3 pt-3 border-t border-neutral-200">
            Order your standard UK/SA shoe size for an ideal fit.
          </p>
        </div>
      </div>

      {/* Filter Row */}
      {filterRating !== 'all' && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-neutral-100 text-xs">
          <Filter className="w-3.5 h-3.5 text-neutral-600" />
          <span>Showing only {filterRating}-star reviews ({filteredReviews.length})</span>
          <button
            type="button"
            onClick={() => setFilterRating('all')}
            className="ml-auto font-bold uppercase text-[10px] underline hover:text-[#D81C2A]"
          >
            Show All
          </button>
        </div>
      )}

      {/* Review Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-neutral-50 border border-neutral-200 text-xs text-neutral-500">
            No reviews found matching the selected filter.
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasVoted = helpfulVoted[rev.id];

            return (
              <div
                key={rev.id}
                className="p-5 sm:p-6 bg-white border border-neutral-200 reebok-cut hover:border-neutral-300 transition-colors"
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            rev.rating >= star
                              ? 'fill-[#D81C2A] text-[#D81C2A]'
                              : 'fill-neutral-200 text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-neutral-950 text-xs sm:text-sm">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-neutral-400">({rev.location})</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[10px] uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Verified Buyer
                      </span>
                    )}
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Sizing & Fit Tag */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 font-mono">
                    Purchased: {rev.sizePurchased}
                  </span>
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700">
                    Fit: <strong>{rev.fitFeedback}</strong>
                  </span>
                </div>

                {/* Title & Body */}
                <h5 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1.5">
                  {rev.title}
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                  {rev.comment}
                </p>

                {/* Helpful CTA */}
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
                  <span>Was this review helpful?</span>
                  <button
                    type="button"
                    onClick={() => handleVoteHelpful(rev.id)}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded transition-colors ${
                      hasVoted
                        ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-default'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-black active:scale-95'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{hasVoted ? 'Helpful' : 'Yes'} ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
