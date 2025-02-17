package com.company.journalApp.repository;

import com.company.journalApp.entity.JournalEntry;
import com.company.journalApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>{
    User findByUserName(String userName);

}
