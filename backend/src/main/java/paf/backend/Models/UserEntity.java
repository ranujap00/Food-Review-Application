package paf.backend.Models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Document(collection = "users")
@Getter
@Setter
public class UserEntity implements UserDetails{
    @Id
    private String id;
    @Indexed(unique = true)
    @NonNull
    private String username;
    @JsonIgnore
    @NonNull
    private String password;

    private String email;

    private List<Integer> likeArray;

    private Map<String, String> followArray;

    public UserEntity(String username, String password, String email, List<Integer> likeArray, Map<String, String> followArray){
        this.username = username;
        this.password = password;
        this.email = email;
        this.likeArray = likeArray;
        this.followArray = followArray;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }

    public String getUserId(){
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.EMPTY_LIST;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    // From Nuwani

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
