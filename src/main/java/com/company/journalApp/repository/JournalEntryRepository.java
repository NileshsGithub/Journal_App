package com.company.journalApp.repository;

import com.company.journalApp.entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JournalEntryRepository extends MongoRepository<JournalEntry, ObjectId>{

}
