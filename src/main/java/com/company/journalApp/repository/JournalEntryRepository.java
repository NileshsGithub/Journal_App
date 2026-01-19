package com.company.journalApp.repository;

import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

    List<JournalEntry> findByUserIdAndIsDeletedFalse(Long id);

    JournalEntry findByIdAndUserId(Long id, Long userId);

}
