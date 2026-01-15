package com.company.journalApp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Table(name = "journal_entries")
@Data
@NoArgsConstructor
@Entity
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private LocalDateTime date;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}


