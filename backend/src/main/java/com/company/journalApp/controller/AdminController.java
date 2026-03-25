package com.company.journalApp.controller;

import com.company.journalApp.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllUsers(){
        return adminService.getAllUsers();
    }

}
