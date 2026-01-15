package com.company.journalApp.repository;

import com.company.journalApp.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

}
