package com.company.journalApp.controller;

import com.company.journalApp.entity.User;
import com.company.journalApp.service.AdminService;
import com.company.journalApp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;

    AdminController(AdminService adminService, UserService userService){
        this.adminService = adminService;
        this.userService = userService;
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllUsers(){
        return adminService.getAllUsers();
    }

    @PostMapping("/create")
    public void createAdmin(User user){
         userService.saveNewAdminUser(user);
    }
}
