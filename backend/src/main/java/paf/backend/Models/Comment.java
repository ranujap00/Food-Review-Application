package paf.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection="comments")

public class Comment{
    @Id
    private String comment_Id;
    private String description;
    private int review_Id;
    private String user_Id;
    private String date;
    
    public String getComment_Id(){
        return comment_Id;
    }

    public String getUser_Id(){
        return user_Id;
    }

    public int getReview_Id(){
        return review_Id;
    }

    public String getDescription(){
        return description;
    }

    public String getDate(){
        return date;
    }
}