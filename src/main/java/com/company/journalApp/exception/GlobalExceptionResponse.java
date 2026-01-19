package com.company.journalApp.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;


import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GlobalExceptionResponse {
    private String userMessage;
    private String errorCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy hh-mm-ss")
    private LocalDateTime timeStamp;
}
