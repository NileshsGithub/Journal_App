package com.company.journalApp.service;

import com.company.journalApp.entity.JournalEntry;
import com.company.journalApp.entity.User;
import com.company.journalApp.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JournalEntryService    {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private UserService userService;


    @Transactional
    public void createJournalEntry(JournalEntry journalEntry, String userName){
        try {
            User user = userService.findByUserName(userName);
            journalEntry.setDate(LocalDateTime.now());
            journalEntry.setUser(user);
            JournalEntry saved = journalEntryRepository.save(journalEntry);
            user.getJournalEntries().add(saved);
            userService.saveUser(user);
        }
        catch (Exception e){
            System.out.println(e);
            throw new RuntimeException("An error occurred while saving the entry");
        }
    }

    public void createJournalEntry(JournalEntry journalEntry){
        journalEntryRepository.save(journalEntry);
    }

    public List<JournalEntry> getAll(){
        return journalEntryRepository.findAll();
    }

    public Optional<JournalEntry> findById(Long id){
    return journalEntryRepository.findById(id);
    }

    @Transactional
    public boolean deleteById(Long id, String userName){
        boolean removed = false;
        try {
            User user = userService.findByUserName(userName);
            removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));
            if(removed){
                userService.saveUser(user);
                journalEntryRepository.deleteById(id);
            }
        } catch (Exception e){
            System.out.println(e);
            throw new RuntimeException("An error occurred while deleting the entry", e);
        }
        return removed;
    }
}
