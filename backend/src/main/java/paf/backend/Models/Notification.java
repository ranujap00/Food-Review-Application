package paf.backend.Models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection="notifications")

public class Notification {
    @Id
    private String notification_Id;
    private String content;
    private String to;
    private String from;
}
