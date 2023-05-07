package paf.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "db_sequence")
public class DbSequence {
    @Id
    private String id;
    private int seq;

    public int getSeq(){
        return this.seq;
    }
}


