package paf.backend.Models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "users_nuwani")
@AllArgsConstructor
public class User {
  
    // public static final String SEQUENCE_NAME ="user_sequence";

    @Id
    private String userId;
    private String name;
    private String password;
    private String email;
    // private String gender;
    private String proPic;
    private List<String> likeArray;
    // private ArrayList<String> followArray;
    private Map<String, String> followArray;

    
    // public User(String name, String password, String email,  String proPic, List<String> likeArray){
    //     this.name = name;
    //     this.email = email;
    //     this.password =password;
    //     // this.gender = gender;
    //     this.proPic = proPic;
    //     this.likeArray = likeArray;
    // }

    public String getUserId(){
        return userId;
    }

    // public String getName(){
    //     return name;
    // }

    // public String getEmail(){
    //     return email;
    // }

    // public String getPassword(){
    //     return password;
    // }
    
    // public String getGender(){
    //     return gender;
    // }

    // public String getProPic(){
    //     return proPic;
    // }

    // public List<String> LikeArray(){
    //     return likeArray;
    // }

    public Map<String, String> getFollowArray() {
        return followArray;
    }

    public boolean isFollowed(String requesterId) {
        return (followArray.containsKey(requesterId) && followArray.get(requesterId).equals("accepted"));
    }

    // public boolean isFollowed(String userId) {
    //     return (followArray.get(userId).equals("accepted"));
    // }

    // public boolean isFollowRequestPending(String userId) {
    //     return followArray.get(userId).equals("pending");
    // }

    public boolean isFollowRequestPending(String requesterId) {
        return (followArray.containsKey(requesterId) && followArray.get(requesterId).equals("pending"));
    }

    public void followUser(String requesterId) {
        if (!isFollowed(requesterId)) {
            followArray.put(requesterId, "pending");
        }
    }

    public void acceptFollowRequest(String requesterId) {
        if (isFollowRequestPending(requesterId)) {
            followArray.put(requesterId, "accepted");
        }
    }

    public void unfollowUser(String requesterId) {
        followArray.remove(requesterId);
    }

    public void removeFollowRequests(String requesterId) {
        List<String> keysToRemove = new ArrayList<>();
        for (Map.Entry<String, String> entry : followArray.entrySet()) {
            if (entry.getKey().equals(requesterId) && entry.getValue().equals("pending")) {
                keysToRemove.add(entry.getKey());
            }
        }
        for (String key : keysToRemove) {
            followArray.remove(key);
        }
    }

    // public void followUser(String userId) {
    //     if (!isFollowed(userId)) {
    //         followArray.put(userId, "pending");
    //     }
    // }

    // public void acceptFollowRequest(String userId) {
    //     if (isFollowRequestPending(userId)) {
    //         followArray.put(userId, "accepted");
    //     }
    // }

    // public void unfollowUser(String userId) {
    //     followArray.remove(userId);
    // }


}