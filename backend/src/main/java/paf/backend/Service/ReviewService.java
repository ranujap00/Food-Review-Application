package paf.backend.Service;

import java.util.List;
import java.util.Optional;

import paf.backend.Models.Review;

public interface ReviewService {
    public List<Review> getReviews();

    public Review addReview(Review review);

    public Optional<Review> getReviewById(int id);

    public Review updateReviewById(int id, Review review);

    public List<Review> getAllReviewsByUserId(String userId);

    public Review deleteReview(int review_id);

    public Review updateReview(int review_id, Review review);
}