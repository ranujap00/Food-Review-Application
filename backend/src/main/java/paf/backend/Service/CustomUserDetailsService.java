package paf.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import paf.backend.Models.UserEntity;
import paf.backend.Repositories.LoginRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private LoginRepository repository;

    @Override
    public UserEntity loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findUserByUsername(username);
    }

    public UserEntity findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
    }
    
}
