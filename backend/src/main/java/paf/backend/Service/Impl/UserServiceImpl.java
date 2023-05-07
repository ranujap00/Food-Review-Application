package paf.backend.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paf.backend.Models.User;
import paf.backend.Models.UserEntity;
import paf.backend.Repositories.UserRepository;
import paf.backend.Service.UserService;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public UserEntity AddUser(UserEntity user) {
        return userRepository.save(user);
    }

    // @Override
    // public User saveUser(User user){
    //     return userRepository.save(user);
    // }

    @Override
    public Optional<UserEntity> getUserById(String id){
        return userRepository.findById(id);
    }

    @Override
    public UserEntity UpdateUser(UserEntity user, String id){
        UserEntity userVar = userRepository.findById(id).get();
       userVar.setId(user.getId());
       userVar.setUsername(user.getUsername());
       userVar.setEmail(user.getEmail());
    //    userVar.setGender(user.getGender());
       userVar.setLikeArray(user.getLikeArray());
       userVar.setFollowArray(user.getFollowArray());
       userRepository.save(userVar);
       return userVar;
    }

    @Override
    public UserEntity deleteUser(String id){
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete(user);
        return user;
    }

    // public User followUser(String id, User user){
    //     User existingUser = userRepository.findById(id).orElse(null);
    //     if (existingUser != null) {
    //         existingUser.followUser(user.getUserId());
    //         userRepository.save(existingUser);
    //     }
    //     return existingUser;
    // }
    // public void acceptFollowRequest(String id, User user){

    // }

    @Override
    public UserEntity followUser(String requesterId, String followeeId) {
        UserEntity requester = userRepository.findById(requesterId).orElse(null);
        UserEntity followee = userRepository.findById(followeeId).orElse(null);

        if (requester == null || followee == null) {
            return null;
        }

        followee.followUser(requesterId);
        userRepository.save(followee);
        return followee;
    }

    @Override
    public UserEntity acceptFollowRequest(String requesterId, String followerId) {
        UserEntity requester = userRepository.findById(requesterId).orElse(null);
        UserEntity follower = userRepository.findById(followerId).orElse(null);

        if (requester == null || follower == null) {
            return null;
        }

        requester.acceptFollowRequest(followerId);
        follower.followUser(requesterId);
        userRepository.save(requester);
        userRepository.save(follower);
        return follower;
    }

    @Override
    public UserEntity unfollowUser(String requesterId, String followeeId) {
        UserEntity requester = userRepository.findById(requesterId).orElse(null);
        UserEntity followee = userRepository.findById(followeeId).orElse(null);

        if (requester == null || followee == null) {
            return null;
        }

        followee.unfollowUser(requesterId);
        userRepository.save(followee);
        return followee;
    }

    public List<UserEntity> getFollowers(String userId) {
        List<UserEntity> followers = new ArrayList<>();
        for (UserEntity user : userRepository.findAll()) {
            if (user.getFollowArray() != null && user.getFollowArray().containsKey(userId) && user.getFollowArray().get(userId).equals("accepted")) {
                followers.add(user);
            }
        }
        return followers;
    }
    

}