package com.company.journalApp.controller;

import com.company.journalApp.entity.User;
import com.company.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("/health-check")
    public String HeathCheck(){
        return "Ok";
    }

    @PostMapping("/create-user")
    public  void createUser(@RequestBody User user){
        userService.saveEntry(user);
    }
}
