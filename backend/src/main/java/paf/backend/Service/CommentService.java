package paf.backend.Service;
import java.util.List;

import paf.backend.Models.Comment;

public interface CommentService {

    public List<Comment> getComments();

    public List<Comment> getCommentsByUser(String user_Id);

    public List<Comment> getCommentsByReview(int review_Id);

    public Comment addComment(Comment comment);

    public Comment deleteComment(String comment_Id);

    public Comment updateComment(String comment_Id, Comment comment);
}
