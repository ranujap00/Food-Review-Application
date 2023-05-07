package paf.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import paf.backend.Models.UserEntity;
public interface UserRepository extends MongoRepository<UserEntity, String>{
    @Query("{username:'?0'}")
    UserEntity findUserByUsername(String username);
}