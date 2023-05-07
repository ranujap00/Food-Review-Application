
package paf.backend.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paf.backend.Models.Review;
import paf.backend.Repositories.ReviewRepository;
import paf.backend.Service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private ReviewRepository repository;

    @Override
    public List<Review> getReviews() {
        return repository.findAll();
    }

    @Override
    public List<Review> getAllReviewsByUserId(String userId){
        return repository.getAllReviewsByUserId(userId);
    }

    @Override
    public Review addReview(Review review) {
        return repository.save(review);
    }

    @Override
    public Optional<Review> getReviewById(int id) {
        return repository.findById(id);
    }

    @Override
    public Review updateReviewById(int id, Review review) {
        Review reviewVar = repository.findById(id).get();
        reviewVar.setTitle(review.getTitle());
        reviewVar.setDescription(review.getDescription());
        reviewVar.setLocation(review.getLocation());
        reviewVar.setImages(review.getImages());
        reviewVar.setRating(review.getRating());
        reviewVar.setLikeCount(review.getLikeCount());
        repository.save(reviewVar);

        return reviewVar;
    }

    @Override
    public Review deleteReview(int review_id) {
        Review review = repository.findReviewById(review_id);
        repository.delete(review);
        return review;
    }

    @Override
    public Review updateReview(int review_id, Review review) {
        Review reviewVar = repository.findById(review_id).get();
        reviewVar.setTitle(review.getTitle());
        reviewVar.setDescription(review.getDescription());
        reviewVar.setLocation(review.getLocation());
        reviewVar.setRating(review.getRating());
        repository.save(reviewVar);
        return reviewVar;
    }
}