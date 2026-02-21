package com.company.journalApp.repository;

import com.company.journalApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AdminRepository extends JpaRepository<User, Long> {


}
