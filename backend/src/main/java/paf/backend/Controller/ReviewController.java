package paf.backend.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import paf.backend.Models.JwtRequest;
import paf.backend.Models.Review;
import paf.backend.Models.UserEntity;
// import paf.backend.Service.JwtService;
import paf.backend.Service.ReviewService;
import paf.backend.Service.SequenceGeneratorService;

@RestController
@RequestMapping("/api/reviews") // http://localhost:8080/api/reviews/insert
@CrossOrigin
public class ReviewController {

    // @Autowired
    // private JwtService jwtService;
    
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private SequenceGeneratorService service;

    @GetMapping("/all")
    public List<Review> getAllReviews(){
        // ResponseEntity<?> res = ResponseEntity.ok(user);
        // if(res.hasBody()){
            
        // }
        // else{
        //     return Collections.emptyList();
        // }
        return reviewService.getReviews();
    }

    @GetMapping("/welcome")
    public String welcome(){
        return "Welcome to the spring boot application";
    }

    @GetMapping("/getAllReviewsByUserId/{userId}")
    public List<Review> getReviewsByUserId(@PathVariable("userId") String userId){
        return reviewService.getAllReviewsByUserId(userId);
    }

    @GetMapping("/authorized")
    public String auth(){
        return "Only authorized personell can access this";
    }

    @GetMapping("/getReviewById/{id}")
    public Optional<Review> getReviewById(@PathVariable("id") int id){
        return reviewService.getReviewById(id);
    }

    @PostMapping("/insert")
    public Review insert(@RequestBody Review review){
        review.setId(service.getSequenceNumber(Review.SEQUENCE_NAME));
        return reviewService.addReview(review);
    }

    @PutMapping("/updateReviewById/{id}")
     public Review updateReview(@RequestBody Review review, @PathVariable("id") int id){
        return reviewService.updateReviewById(id, review);
    }

    @DeleteMapping("/delete/{review_Id}")
    public Review delete(@PathVariable int review_Id){
        return reviewService.deleteReview(review_Id);
    }

    @PutMapping("/update/{review_Id}")
    public Review update(@RequestBody Review review,@PathVariable int review_Id){
        return reviewService.updateReview(review_Id, review);
    }
}