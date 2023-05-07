package paf.backend.Models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "reviews")
public class Review {
    @Transient
    public static final String SEQUENCE_NAME="review_sequence";

    @Id
    private int id;
    private List<String> images;
    private String title;
    private String description;
    private String location;
    private int rating;
    private int likeCount;
    private String userId;
    private String date;

    public Review(List<String> images, String title, String description, String location, int rating, int like, String userId, String date){
        this.images = images;
        this.title = title;
        this.description = description;
        this.location = location;
        this.rating = rating;
        this.likeCount = like;
        this.userId = userId;
        this.date = date;
    }

    public String getDate(){
        return date;
    }

    public int getId(){
        return id;
    }

    public List<String> getName(){
        return images;
    }

    public String getTitle(){
        return title;
    }

    public String getDescription(){
        return description;
    }

    public String getLocation(){
        return location;
    }

    public int getRating(){
        return rating;
    }

    public int getLikeCount(){
        return likeCount;
    }

    public String getUserId(){
        return userId;
    }
}