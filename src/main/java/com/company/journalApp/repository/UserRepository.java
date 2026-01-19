package com.company.journalApp.repository;

import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);

    void deleteByUserName(String userName);

}
