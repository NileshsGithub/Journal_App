package com.company.journalApp.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalRequest {
    private Long journalId;
    private String title;
    private String content;
}
