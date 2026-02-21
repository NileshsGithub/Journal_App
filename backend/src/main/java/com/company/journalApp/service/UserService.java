package com.company.journalApp.service;

import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.DTO.UserRequest;
import com.company.journalApp.DTO.UserResponse;
import com.company.journalApp.entity.JournalEntry;
import com.company.journalApp.entity.User;
import com.company.journalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserRequest user) throws Exception {
        if((user.getRole() != null && !user.getRole().isEmpty()) && user.getRole().equals("ADMIN")){
            user.setRole("ADMIN");
        }else {
            user.setRole("USER");
        }
        User existingName = findByUserName(user.getUserName());
        if(existingName != null){
            throw new Exception("username already exist");
        }
        User response = new User();
        response.setUserName(user.getUserName());
        response.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(response);
        return mapToUser(response);
    }

    public UserResponse mapToUser(User user){
        UserResponse response = new UserResponse();
        response.setUserName(user.getUserName());
        return response;
    }

    public void saveUser(User user){
        userRepository.save(user);
    }


    public  List<User> getAll(){
        return userRepository.findAll();
    }



    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    public User findByUserName(String userName){
        return userRepository.findByUserName(userName);
    }
}
