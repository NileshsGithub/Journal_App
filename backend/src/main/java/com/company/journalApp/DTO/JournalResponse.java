package com.company.journalApp.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalResponse {
    private Long id;
    private String title;
    private String content;
    private String date;
}
