package paf.backend.Jwt;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import paf.backend.Models.UserEntity;

@Component
public class JwtHelper {
    static final String issuer = "MyApp";
    private int accessTokenExpirationMs = 10 * 60 * 1000;
    private long refreshTokenExpirationMs;

    private Algorithm accessTokenAlgorithm;
    private Algorithm refreshTokenAlgorithm;
    private JWTVerifier accessTokenVerifier;
    private JWTVerifier refreshTokenVerifier;

    public JwtHelper(@Value("${accessTokenSecret}") String accessTokenSecret, @Value("${refreshTokenSecret}") String refreshTokenSecret){
        refreshTokenExpirationMs = (long) 30 * 24 * 60 * 60 * 1000;
        accessTokenAlgorithm = Algorithm.HMAC512(accessTokenSecret);
        refreshTokenAlgorithm = Algorithm.HMAC512(refreshTokenSecret);
        accessTokenVerifier = JWT.require(accessTokenAlgorithm)
        .withIssuer(issuer)
        .build();

        refreshTokenVerifier = JWT.require(refreshTokenAlgorithm)
        .withIssuer(issuer)
        .build();
    }

    public String generateAccessToken(UserEntity user){
        return JWT.create()
            .withIssuer(issuer)
            .withSubject(user.getId())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(new Date().getTime() + accessTokenExpirationMs))
            .sign(accessTokenAlgorithm);
    }

    public String generateRefreshToken(UserEntity user, String tokenId){
        return JWT.create()
            .withIssuer(issuer)
            .withSubject(user.getId())
            .withClaim("tokenId", tokenId)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(new Date().getTime() + refreshTokenExpirationMs))
            .sign(refreshTokenAlgorithm);
    }

    private Optional<DecodedJWT> decodeAccessToken(String token){
        try{
            return Optional.of(accessTokenVerifier.verify(token));
        } catch(JWTVerificationException e){
            System.out.println("Invalid access token" + e);
        }
        return Optional.empty();
    }

    private Optional<DecodedJWT> decodeRefreshToken(String token){
        try{
            return Optional.of(refreshTokenVerifier.verify(token));
        } catch(JWTVerificationException e){
            System.out.println("Invalid refresh token" + e);
        }
        return Optional.empty();
    }

    public boolean validateAccessToken(String token){
        return decodeAccessToken(token).isPresent();
    }

    public boolean validateRefreshToken(String token){
        return decodeRefreshToken(token).isPresent();
    }

    public String getUserIdFromAccessToken(String token){
        return decodeAccessToken(token).get().getSubject();
    }

    public String getUserIdFromRefreshToken(String token){
        return decodeRefreshToken(token).get().getSubject();
    }

    public String getTokenIdFromRefreshToken(String token){
        return decodeRefreshToken(token).get().getClaim("tokenId").asString();
    }


}
