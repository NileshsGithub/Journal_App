package com.company.journalApp.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    private String userName;
    private String password;
    private String role;
}
