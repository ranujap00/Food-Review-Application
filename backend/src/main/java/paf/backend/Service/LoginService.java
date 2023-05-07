package paf.backend.Service;


import java.util.List;

import paf.backend.Models.UserEntity;

public interface LoginService {
    public List<UserEntity> getUsers();

    public UserEntity getUser(String username);

    public UserEntity AddUser(UserEntity user);
}
