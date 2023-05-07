package paf.backend.Service;

import java.util.List;
import java.util.Optional;

import paf.backend.Models.UserEntity;

public interface UserService {
    public List<UserEntity> getUsers();

    public UserEntity getUserByUsername(String username);

    public UserEntity AddUser(UserEntity user);


    // public User saveUser(User user);
    
    public Optional<UserEntity> getUserById(String id);

    public UserEntity UpdateUser(UserEntity user, String id);

    public UserEntity deleteUser(String id);

    //follow request
    // public User followUser(String id, User user);

    // public User acceptFollowRequest(String id, User user);

    public UserEntity followUser(String requesterId, String followeeId);

    public UserEntity acceptFollowRequest(String requesterId, String followerId);

    public UserEntity unfollowUser(String requesterId, String followeeId);

    public List<UserEntity> getFollowers(String userId);

}
