package paf.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import paf.backend.Models.Notification;

public interface NotificationRepository extends MongoRepository<Notification,String>{
    @Query("{to:'?0'}")
    List<Notification> getNotificationByReceiver(String receiverId);

    @Query("{_id:'?0'}")
    Notification findNotificationById(String not_id);
}   
