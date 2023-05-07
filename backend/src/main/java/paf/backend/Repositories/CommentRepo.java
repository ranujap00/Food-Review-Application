package paf.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import paf.backend.Models.Comment;

public interface CommentRepo extends MongoRepository<Comment,String>{
    @Query("{user_Id:'?0'}")
    List<Comment> findCommentByUserId(String userId);

    @Query("{'review_Id': ?0}")
    List<Comment> findCommentByReviewId(Integer reviewId);

    @Query("{_id:'?0'}")
    Comment findCommentById(String comment_Id);
} 
