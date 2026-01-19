package com.company.journalApp.controller;

import com.company.journalApp.DTO.JournalRequest;
import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.service.JournalEntryService;
import com.company.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {

    @Autowired
    private JournalEntryService journalEntryService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<JournalResponse> createJournalEntry(@RequestBody JournalRequest myEntry) {
        JournalResponse response =journalEntryService.createJournalEntry(myEntry);
        return new  ResponseEntity<JournalResponse>(response, HttpStatus.CREATED);
    }


    @GetMapping("userid/{userId}")
    public ResponseEntity<List<JournalResponse>> getAllJournalsByUserId(@PathVariable Long userId) {
        List<JournalResponse> list = journalEntryService.getAllJournalsByUserId(userId);
        return new ResponseEntity<List<JournalResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("id/{id}")
    public ResponseEntity<JournalResponse> getJournalsId(@PathVariable Long id) {
        JournalResponse list = journalEntryService.getJournalById(id);
        return new ResponseEntity<JournalResponse>(list, HttpStatus.OK);
    }


    @DeleteMapping("id/{journalId}")
    public ResponseEntity<?> deleteJournalById(@PathVariable Long journalId) throws Exception {
        return new ResponseEntity<>(journalEntryService.deleteJournalById(journalId),HttpStatus.OK);
    }


    @PutMapping
    public ResponseEntity<JournalResponse> updateJournalById(@RequestBody JournalRequest request) throws Exception {
        JournalResponse response =journalEntryService.updateJournalById(request);
        return new  ResponseEntity<JournalResponse>(response,HttpStatus.OK);
    }
}
