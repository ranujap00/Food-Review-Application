package paf.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import paf.backend.Models.Review;

public interface ReviewRepository extends MongoRepository<Review, Integer>{
    @Query("{userId:'?0'}")
    List<Review> getAllReviewsByUserId(String userId);

    @Query("{'id': ?0}")
    Review findReviewById(Integer reviewId);
}
