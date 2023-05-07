package paf.backend.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paf.backend.Models.UserEntity;
import paf.backend.Repositories.LoginRepository;
import paf.backend.Service.LoginService;

@Service
public class LoginServiceImpl implements LoginService{
    @Autowired
    private LoginRepository repository;

    @Override
    public List<UserEntity> getUsers(){
        return repository.findAll();
    }

    @Override
    public UserEntity getUser(String username) {
        return repository.findUserByUsername(username);
    }

    @Override
    public UserEntity AddUser(UserEntity user) {
        return repository.save(user);
    }
    
}
