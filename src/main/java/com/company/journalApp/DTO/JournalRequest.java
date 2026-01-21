package com.company.journalApp.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalRequest {

    @NotNull(message = "Journal id cannot be null or empty")
    private Long journalId;

    @NotBlank(message = "Title cannot be null or empty")
    @Size(max = 100, message = "Title cannot be more than 100 characters")
    private String title;

    @NotBlank(message = "Content cannot be null or empty")
    @Size(max = 1000, message = "Content cannot be more than 1000 characters")
    private String content;
}
