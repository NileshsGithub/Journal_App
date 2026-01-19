package com.company.journalApp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<GlobalExceptionResponse> handleRecordNotFoundException(RecordNotFoundException exception) {
            GlobalExceptionResponse error = buildErrorDetails(CustomExceptionCodes.RECORD_NOT_FOUND.getCode(), exception.getMessage());
            return buildResponseEntity(error, HttpStatus.CONFLICT);
    }

    public GlobalExceptionResponse buildErrorDetails(String errorCode, String errorMessage){
        return GlobalExceptionResponse.builder().errorCode(errorCode).userMessage(errorMessage).timeStamp(LocalDateTime.now()).build();
    }

    public ResponseEntity<GlobalExceptionResponse> buildResponseEntity(GlobalExceptionResponse error, HttpStatus status){
        return new ResponseEntity<>(error, status);
    }
}

