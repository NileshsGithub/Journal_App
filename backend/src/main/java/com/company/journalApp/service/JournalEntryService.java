package com.company.journalApp.service;

import com.company.journalApp.DTO.ApiResponse;
import com.company.journalApp.DTO.JournalRequest;
import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.entity.JournalEntry;
import com.company.journalApp.entity.User;
import com.company.journalApp.exception.RecordNotFoundException;
import com.company.journalApp.repository.JournalEntryRepository;
import com.company.journalApp.repository.specification.JournalEntrySpecification;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JournalEntryService    {

    private final JournalEntryRepository journalEntryRepository;

    private final UserService userService;


    public JournalEntryService(JournalEntryRepository journalEntryRepository, UserService userService) {
        this.journalEntryRepository = journalEntryRepository;
        this.userService = userService;
    }


    public JournalResponse mapToJournalResponse(JournalEntry journal) {
        JournalResponse response = new JournalResponse();
        response.setId(journal.getId());
        response.setTitle(journal.getTitle());
        response.setContent(journal.getContent());
        response.setDate(String.valueOf(journal.getDate()));
        return response;
    }

    public ApiResponse<JournalResponse> getAllJournalsByUserId(int page, int size){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUserName(authentication.getName());

        Pageable pageable = PageRequest.of(page,size);
        Page<JournalEntry> response = journalEntryRepository.findByUserIdAndIsDeletedFalse(user.getUserId(), pageable);
        List<JournalResponse> responseData = response.stream().map(this::mapToJournalResponse).collect(Collectors.toList());
        return new ApiResponse<>(response.getTotalPages(), response.getTotalElements(), response.getNumber(), response.getSize(), responseData);
    }

    public ApiResponse<JournalResponse> getAllJournals(String title, String content, String startDate, String endDate, int page, int pageSize){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUserName(authentication.getName());

        Page<JournalEntry> journalsPage = journalEntryRepository.findAll(JournalEntrySpecification.getJournalEnrtySpecification(user.getUserId(), title, content, startDate, endDate), PageRequest.of(page, pageSize, Sort.by("id")));
        List<JournalResponse> responses = journalsPage.stream().map(this::mapToJournalResponse).collect(Collectors.toList());
        return new ApiResponse<>(journalsPage.getTotalPages(), journalsPage.getTotalElements(), journalsPage.getNumber(), journalsPage.getSize(), responses);
    }

    public JournalResponse getJournalById(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        JournalEntry journalEntry = journalEntryRepository.findByIdAndUserId(id, user.getUserId());
        if(journalEntry == null || journalEntry.isDeleted()){
            throw new RecordNotFoundException(String.format("Journal not found for id %d", id));
        }
        return mapToJournalResponse(journalEntry);
    }


    public JournalResponse updateJournalById(@Valid JournalRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);

        JournalEntry oldEntry = journalEntryRepository.findByIdAndUserId(request.getJournalId(), user.getUserId());

        if(oldEntry != null && !oldEntry.isDeleted()){
            oldEntry.setTitle(request.getTitle());
            oldEntry.setContent(request.getContent());
            journalEntryRepository.save(oldEntry);
            return mapToJournalResponse(oldEntry);
        } else {
            throw new RecordNotFoundException(String.format("Journal not found for id %d", request.getJournalId()));
        }
    }

    public Long deleteJournalById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        JournalEntry oldEntry = journalEntryRepository.findByIdAndUserId(id, user.getUserId());

        if(oldEntry != null && !oldEntry.isDeleted()){
           oldEntry.setDeleted(true);
           journalEntryRepository.save(oldEntry);
           return id;
        } else {
            throw new RecordNotFoundException(String.format("Journal not found for id %d", id));
        }
    }

    @Transactional
    public JournalResponse createJournalEntry(JournalRequest journalRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);

        JournalEntry entry = new JournalEntry();
        entry.setDate(LocalDateTime.now());
        entry.setTitle(journalRequest.getTitle());
        entry.setContent(journalRequest.getContent());
        entry.setUserId(user.getUserId());
        entry.setDeleted(false);

        JournalEntry journal = journalEntryRepository.save(entry);
        return mapToJournalResponse(journal);
    }
}
