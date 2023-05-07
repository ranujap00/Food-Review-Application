package paf.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import paf.backend.Models.UserEntity;
import paf.backend.Repositories.LoginRepository;
import paf.backend.Service.LoginService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    
    @Autowired
    LoginRepository loginRepository;

    @Autowired
    private LoginService loginService;

    @GetMapping("/all")
    public List<UserEntity>getUsers(){
        return loginService.getUsers();
    }

    @GetMapping("/me")
    public String me(@AuthenticationPrincipal UserEntity user){
        ResponseEntity<?> res = ResponseEntity.ok(user);
        if(res.hasBody()){
            return "Hello world";
        }
        else{
            return null;
        }
        // return ResponseEntity.ok(user);
    }

    @GetMapping("/getUserById/{id}")
    @PreAuthorize("#user.id == #id") // use can only get his profile
    public ResponseEntity<?> me(@AuthenticationPrincipal UserEntity user, @PathVariable String id){
        return ResponseEntity.ok(loginRepository.findById(id));
    }
}

