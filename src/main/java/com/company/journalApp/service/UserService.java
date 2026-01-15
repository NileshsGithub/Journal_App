package com.company.journalApp.service;

import com.company.journalApp.entity.User;
import com.company.journalApp.repository.UserRepository;
import com.sun.jdi.request.DuplicateRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveNewUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER"));
        User existingName = findByUserName(user.getUserName());
        if(existingName != null){
            throw new DuplicateRequestException(String.format("username %s already exist",user.getUserName()));
        }
        User savedUser = userRepository.save(user);
        savedUser = mapToUser(savedUser);
        return savedUser;
    }

    User mapToUser(User user){
        User savedUser = new User();
        savedUser.setUserName(user.getUserName());
        savedUser.setUserId(user.getUserId());
        return savedUser;
    }

    public void saveNewAdminUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER","ADMIN"));
        userRepository.save(user);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }


    public  List<User> getAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id){
    return userRepository.findById(id);
    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    public User findByUserName(String userName){
        return userRepository.findByUserName(userName);
    }
}
