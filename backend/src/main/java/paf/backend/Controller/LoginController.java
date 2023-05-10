package paf.backend.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;

import paf.backend.Jwt.JwtHelper;
import paf.backend.Models.LoginDTO;
import paf.backend.Models.RefreshToken;
import paf.backend.Models.SignUpDTO;
import paf.backend.Models.TokenDTO;
import paf.backend.Models.UserEntity;
import paf.backend.Service.CustomUserDetailsService;
import paf.backend.Repositories.LoginRepository;
import paf.backend.Repositories.RefreshTokenRepository;
import paf.backend.Service.LoginService;
import paf.backend.Service.UserService;

@RestController
@RequestMapping("/api/login") 
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CustomUserDetailsService CustomUserDetailsService;

    @Autowired
    private UserService userService;

    @GetMapping("/getUserDetails/{username}")
    public UserEntity getUserDetails(@PathVariable("username") String username){
        UserEntity u = loginService.getUser(username);
        if(u == null){
            System.out.println("INVALID DETAILS");
            return null;
        }
        else{
            return u;
        }
    }

    // @PostMapping("/loginUser")
    // public ResponseEntity<String> login(@RequestBody UserEntity user){
    //     Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
    //     SecurityContextHolder.getContext().setAuthentication(authentication);

    //     return new ResponseEntity<>("User signed success", HttpStatus.OK);
    // }

    @PostMapping("/loginUser")
    @Transactional // any DB operation is reverted if an exception occurs
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO){
        System.out.println("EXECUTINGGG....");
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
        System.out.println("Authentication: " + authentication);
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserEntity user = (UserEntity) authentication.getPrincipal();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setOwner(user);
        refreshTokenRepository.save(refreshToken);

        String accessToken = jwtHelper.generateAccessToken(user);
        String refreshTokeString = jwtHelper.generateRefreshToken(user, refreshToken.getId());

        return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokeString));
    }

    @PostMapping("/signUp")
    @Transactional
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpDTO signUpdtO){
        String uName = signUpdtO.getEmail().split("@", 2)[0];
        UserEntity user = new UserEntity(uName, passwordEncoder.encode(signUpdtO.getPassword()), signUpdtO.getEmail(), uName, Collections.EMPTY_LIST, Collections.EMPTY_MAP);
        userService.AddUser(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setOwner(user);
        refreshTokenRepository.save(refreshToken);

        String accessToken = jwtHelper.generateAccessToken(user);
        String refreshTokeString = jwtHelper.generateRefreshToken(user, refreshToken.getId());

        return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokeString));
    }

    @PostMapping("/logOut")
    public ResponseEntity<?> logout(@RequestBody TokenDTO dto){
        String refreshTokenString = dto.getRefreshToken();
        System.out.println("RefreshToken: " + refreshTokenString);
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }

    @PostMapping("/logoutAll")
    public ResponseEntity<?> logoutAll(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db

            refreshTokenRepository.deleteByOwner_Id(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }

    // Used to access protected endpoints 
    // Same refresh token but different access token
    // Supplying a long lives refresh token to get a short lived access token
    @PostMapping("/access-token")
    public ResponseEntity<?> accessToken(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db

            UserEntity user = CustomUserDetailsService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            String accessToken = jwtHelper.generateAccessToken(user);

            return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
        }

        throw new BadCredentialsException("invalid token");
    }

    // New refresh token and a new access token
    // previous refresh token gets deleted
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db

            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));

            UserEntity user = CustomUserDetailsService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));

            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setOwner(user);
            refreshTokenRepository.save(refreshToken);

            String accessToken = jwtHelper.generateAccessToken(user);
            String newRefreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken.getId());

            return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, newRefreshTokenString));
        }

        throw new BadCredentialsException("invalid token");
    }


    @PostMapping("/insertUser")
    public UserEntity insert(@RequestBody UserEntity user){
        return loginService.AddUser(user);
    }
}
