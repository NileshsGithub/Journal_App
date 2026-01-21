package com.company.journalApp.exception;

public enum CustomExceptionCodes {

    RECORD_NOT_FOUND("404"), BAD_REQUEST("400"),
    INTERNAL_ERROR("502"), DATABASE_ERROR(""), SERVICE_UNAVAILABLE("");

    public final String code;

    CustomExceptionCodes(String code){
        this.code= code;
    }

    public String getCode(){
        return code;
    }
}

