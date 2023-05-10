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
    public List<Review> getAllReviews(@AuthenticationPrincipal UserEntity user){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.getReviews();
        }
        else{
            System.out.println("No body");
            return Collections.emptyList();
        }
        // return reviewService.getReviews();
        
    }

    @GetMapping("/welcome")
    public String welcome(){
        return "Welcome to the spring boot application";
    }

    @GetMapping("/getAllReviewsByUserId/{userId}")
    public List<Review> getReviewsByUserId(@AuthenticationPrincipal UserEntity user, @PathVariable("userId") String userId){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.getAllReviewsByUserId(userId);
        }
        else{
            System.out.println("No body");
            return Collections.emptyList();
        }
        
    }

    @GetMapping("/authorized")
    public String auth(){
        return "Only authorized personell can access this";
    }

    @GetMapping("/getReviewById/{id}")
    public Optional<Review> getReviewById(@AuthenticationPrincipal UserEntity user, @PathVariable("id") int id){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.getReviewById(id);
        }
        else{
            System.out.println("No body");
            return null;
        }
        
    }

    @PostMapping("/insert")
    public Review insert(@AuthenticationPrincipal UserEntity user, @RequestBody Review review){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            review.setId(service.getSequenceNumber(Review.SEQUENCE_NAME));
        return reviewService.addReview(review);
        }
        else{
            System.out.println("No body");
            return null;
        }
        
    }

    @PutMapping("/updateReviewById/{id}")
     public Review updateReview(@AuthenticationPrincipal UserEntity user, @RequestBody Review review, @PathVariable("id") int id){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.updateReviewById(id, review);
        }
        else{
            System.out.println("No body");
            return null;
        }
        
    }

    @DeleteMapping("/delete/{review_Id}")
    public Review delete(@AuthenticationPrincipal UserEntity user, @PathVariable int review_Id){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.deleteReview(review_Id);
        }
        else{
            System.out.println("No body");
            return null;
        }
        
    }

    @PutMapping("/update/{review_Id}")
    public Review update(@AuthenticationPrincipal UserEntity user, @RequestBody Review review,@PathVariable int review_Id){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            System.out.println("Has body");
            return reviewService.updateReview(review_Id, review);
        }
        else{
            System.out.println("No body");
            return null;
        }
        
    }
}