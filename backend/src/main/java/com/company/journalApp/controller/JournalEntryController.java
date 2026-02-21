package com.company.journalApp.controller;

import com.company.journalApp.DTO.ApiResponse;
import com.company.journalApp.DTO.JournalRequest;
import com.company.journalApp.DTO.JournalResponse;
import com.company.journalApp.service.JournalEntryService;
import com.company.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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


    @GetMapping("/all")
    public ResponseEntity<ApiResponse<JournalResponse>> getAllJournalsByUserId(@RequestParam(value = "userid",required = true) Long userId,
                                                                               @RequestParam(value = "page", defaultValue = "0") int page,
                                                                               @RequestParam(value = "pageSize", defaultValue = "100") int pageSize) {
        ApiResponse<JournalResponse> list = journalEntryService.getAllJournalsByUserId(userId, page, pageSize);
        return new ResponseEntity<ApiResponse<JournalResponse>>(list, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<JournalResponse>> getAllJournals(
            @RequestParam(value = "userId",required = false) Long userId,
            @RequestParam(value = "title",required = false) String  title,
            @RequestParam(value = "contentKeyword",required = false) String contentKeyword,
            @RequestParam(value = "startDate",required = false) String startDate,
            @RequestParam(value = "endDate",required = false) String endDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = "100") int pageSize) {
        ApiResponse<JournalResponse> response = journalEntryService.getAllJournals(userId, title, contentKeyword,startDate, endDate, page, pageSize);
        return new ResponseEntity<>(response, HttpStatus.OK);
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
