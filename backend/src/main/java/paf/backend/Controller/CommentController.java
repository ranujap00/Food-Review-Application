package paf.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import paf.backend.Service.CommentService;

import paf.backend.Models.Comment;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin

public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/all")
    public List<Comment>getComments(){
        return commentService.getComments();
    }

    @GetMapping("/getCommentByUserId/{user_Id}")
    public List<Comment>getCommentByUserId(@PathVariable String user_Id){
        return commentService.getCommentsByUser(user_Id);
    }

    @GetMapping("/getCommentByReviewId/{review_Id}")
    public List<Comment>getCommentByReviewId(@PathVariable int review_Id){
        return commentService.getCommentsByReview(review_Id);
    }

    @PostMapping("/insert")
    public Comment insert(@RequestBody Comment comment){
        return commentService.addComment(comment);
    }

    @PutMapping("/update/{comment_Id}")
    public Comment update(@RequestBody Comment comment,@PathVariable String comment_Id){
        return commentService.updateComment(comment_Id, comment);
    }
    
    @DeleteMapping("/delete/{comment_Id}")
    public Comment delete(@PathVariable String comment_Id){
        return commentService.deleteComment(comment_Id);
    }
}
