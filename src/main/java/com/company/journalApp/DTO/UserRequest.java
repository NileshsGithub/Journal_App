package com.company.journalApp.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank(message = "User name cannot be null or empty")
    @Size(max = 40, message = "User name be more than 40 characters")
    private String userName;

    @NotBlank(message = "Password cannot be null or empty")
    @Size(max = 20, message = "Password cannot be more than 20 characters")
    private String password;

    private String role;
}
