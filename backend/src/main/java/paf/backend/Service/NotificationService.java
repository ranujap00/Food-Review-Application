package paf.backend.Service;


import java.util.List;

import paf.backend.Models.Notification;


public interface NotificationService {
    public List<Notification> getNotificationByReceiver(String receiver_Id);

    public Notification deleteNotification(String not_id);

    public Notification addNotification(Notification notification);
}
