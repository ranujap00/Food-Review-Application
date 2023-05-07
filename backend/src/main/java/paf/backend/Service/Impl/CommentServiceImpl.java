package paf.backend.Service.Impl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paf.backend.Models.Comment;
import paf.backend.Repositories.CommentRepo;
import paf.backend.Service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
    
    @Autowired
    private CommentRepo CommentRepo;

    @Override
    public List<Comment> getComments(){
        return CommentRepo.findAll();
    }

    @Override
    public List<Comment> getCommentsByUser(String user_Id){
        return CommentRepo.findCommentByUserId(user_Id);
    }

    @Override
    public List<Comment> getCommentsByReview(int review_Id){
        return CommentRepo.findCommentByReviewId(review_Id);
    }

    @Override
    public Comment addComment(Comment comment) {
        return CommentRepo.save(comment);
    }

    @Override
    public Comment deleteComment(String Comment_Id){
        Comment comment = CommentRepo.findCommentById(Comment_Id);
        CommentRepo.delete(comment);
        return comment;
    }

    @Override
    public Comment updateComment(String Comment_Id, Comment comment){
        Comment commentVar = CommentRepo.findById(Comment_Id).get();
       commentVar.setReview_Id(comment.getReview_Id());
       commentVar.setUser_Id(comment.getUser_Id());
       commentVar.setDescription(comment.getDescription());
       CommentRepo.save(commentVar);
       return commentVar;
    }
    
}  
