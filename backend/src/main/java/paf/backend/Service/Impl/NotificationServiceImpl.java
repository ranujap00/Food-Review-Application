package paf.backend.Service.Impl;
import java.util.Collections;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paf.backend.Models.Notification;
import paf.backend.Repositories.NotificationRepository;
import paf.backend.Service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository repository;

    @Override
    public List<Notification> getNotificationByReceiver(String receiver_Id) {
        return repository.getNotificationByReceiver(receiver_Id);
    }

    @Override
    public Notification deleteNotification(String not_id) {
        Notification notification = repository.findNotificationById(not_id);
        repository.delete(notification);
        return notification;
    }

    @Override
    public Notification addNotification(Notification notification) {
        return repository.save(notification);
    }
}  
