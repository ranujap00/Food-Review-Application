package paf.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import paf.backend.Models.Notification;
import paf.backend.Service.NotificationService;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin   
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/getNotification/{receiver_Id}")
    public List<Notification>getNotificationByReceiver(@PathVariable String receiver_Id){
        return notificationService.getNotificationByReceiver(receiver_Id);
    }
    
    @DeleteMapping("/deleteNotification/{notification_Id}")
    public Notification delete(@PathVariable String notification_Id){
        return notificationService.deleteNotification(notification_Id);
    }

    @PostMapping("/insertNotification")
    public Notification insert(@RequestBody Notification notification){
        return notificationService.addNotification(notification);
    }
}
