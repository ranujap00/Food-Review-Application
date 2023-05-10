package paf.backend.Controller;

import java.util.List;
import java.util.Optional;

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

import paf.backend.Models.UserEntity;
import paf.backend.Service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserProfController {
  @Autowired
  private UserService userService;

  @PostMapping("/insert")
  public UserEntity insert(@RequestBody UserEntity user) {
    // user.setId(service.getSequenceNumber(User.SEQUENCE_NAME));
    return userService.AddUser(user);
  }

  @GetMapping("/getUserById/{id}")
  public Optional<UserEntity> getUserById(@PathVariable("id") String id) {
    return userService.getUserById(id);
  }

  @GetMapping("/getUserByUsername/{username}")
  public UserEntity getUserDetails(@PathVariable("username") String username) {
    return userService.getUserByUsername(username);
  }

  @GetMapping("/all")
  public List<UserEntity> getAllUsers() {
    return userService.getUsers();
  }

  @PutMapping("/updateUser/{id}")
  public UserEntity update(@RequestBody UserEntity user, @PathVariable("id") String id) {
    return userService.UpdateUser(user, id);
  }

  @DeleteMapping("/delete/{id}")
  public UserEntity delete(@PathVariable("id") String id) {
    return userService.deleteUser(id);
  }

  // @PutMapping("/{id}/follow")
  // public User FollowUSer(@PathVariable("id") String id, @RequestBody User
  // user){
  // return userService.followUser(id, user);
  // }

  @PutMapping("/{requesterId}/follow/{followeeId}")
  public UserEntity followUser(@PathVariable String requesterId, @PathVariable String followeeId) {
    return userService.followUser(requesterId, followeeId);
  }

  @PutMapping("/{requesterId}/accept/{followerId}")
  public UserEntity acceptFollowRequest(@PathVariable String requesterId, @PathVariable String followerId) {
    return userService.acceptFollowRequest(requesterId, followerId);
  }

  @PutMapping("/{requesterId}/decilne/{followerId}")
  public UserEntity declineFollowRequest(@PathVariable String requesterId, @PathVariable String followerId) {
    return userService.declineFollowRequest(requesterId, followerId);
  }

  @PutMapping("/{requesterId}/unfollow/{followeeId}")
  public UserEntity unfollowUser(@PathVariable String requesterId, @PathVariable String followeeId) {
    return userService.unfollowUser(requesterId, followeeId);
  }

  @GetMapping("/{userId}/allFollowers")
  public List<UserEntity> getFollowers(@PathVariable String userId) {
    return userService.getFollowers(userId);
  }

  @GetMapping("/{userId}/pendingRequests")
  public List<UserEntity> getPendings (@PathVariable String userId){
    return userService.getPendings(userId);
  }
}