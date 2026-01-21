package com.company.journalApp.service;

import com.company.journalApp.DTO.JournalRequest;
import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.entity.JournalEntry;
import com.company.journalApp.entity.User;
import com.company.journalApp.exception.InvalidInputException;
import com.company.journalApp.exception.RecordNotFoundException;
import com.company.journalApp.repository.JournalEntryRepository;
import jakarta.validation.Valid;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JournalEntryService    {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private UserService userService;


    @Transactional
    public JournalResponse createJournalEntry(@Valid JournalRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName("testUser"); // testUser -> HardCoded user

        JournalEntry entry = new JournalEntry();
        entry.setDate(LocalDateTime.now());
        entry.setTitle(request.getTitle());
        entry.setContent(request.getContent());
        entry.setUserId(user.getUserId());
        entry.setDeleted(false);

        JournalEntry journal = journalEntryRepository.save(entry);
        return mapToJournalResponse(journal);
    }

    private JournalResponse mapToJournalResponse(JournalEntry journal) {
        JournalResponse response = new JournalResponse();
        response.setTitle(journal.getTitle());
        response.setContent(journal.getContent());
        response.setDate(String.valueOf(journal.getDate()));
        return response;
    }

    public List<JournalResponse> getAllJournalsByUserId(Long userId, int page, int size){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Pageable pageable = PageRequest.of(page,size);
        List<JournalEntry> journalResponses = journalEntryRepository.findByUserIdAndIsDeletedFalse(userId,pageable);
        return journalResponses.stream().map(this::mapToJournalResponse).collect(Collectors.toList());
    }

    public JournalResponse getJournalById(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName("testUser"); // testUser -> HardCoded user
        JournalEntry journalEntry = journalEntryRepository.findByIdAndUserId(id, user.getUserId());
        if(journalEntry == null){
            throw new RecordNotFoundException(String.format("Journal not found for id %d", id));
        }
        return mapToJournalResponse(journalEntry);
    }


    public JournalResponse updateJournalById(@Valid JournalRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName("testUser"); // testUser -> HardCoded user

        List<JournalEntry> list = journalEntryRepository.findByUserIdAndIsDeletedFalse(user.getUserId());
        Optional<JournalEntry> oldEntry = list.stream().
                filter(journal -> journal.getId().equals(request.getJournalId()))
                .findFirst();

        if(oldEntry.isPresent()){
            oldEntry.get().setTitle(request.getTitle());
            oldEntry.get().setContent(request.getContent());
            journalEntryRepository.save(oldEntry.get());
            return mapToJournalResponse(oldEntry.get());
        }else {
            throw new RecordNotFoundException(String.format("Journal not found for id %d", request.getJournalId()));
        }
    }

    public Long deleteJournalById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUserName("testUser"); // testUser -> HardCoded user
        List<JournalEntry> list = journalEntryRepository.findByUserIdAndIsDeletedFalse(user.getUserId());
        Optional<JournalEntry> oldEntry = list.stream().
                filter(journal -> journal.getId().equals(id))
                .findFirst();

        if(oldEntry.isPresent()){
           oldEntry.get().setDeleted(true);
           journalEntryRepository.save(oldEntry.get());
           return id;
        }else {
            throw new RecordNotFoundException(String.format("Journal not found for id %d", id));
        }
    }
}
