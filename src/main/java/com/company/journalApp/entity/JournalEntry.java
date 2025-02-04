package com.company.journalApp.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document (collection = "journal_entries")
public class JournalEntry {

    @Id
    private String id;

    private String title;

    public Date getDate() {  
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    private Date date;

    public void setContent(String content) {
        this.content = content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String  content;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }
}
