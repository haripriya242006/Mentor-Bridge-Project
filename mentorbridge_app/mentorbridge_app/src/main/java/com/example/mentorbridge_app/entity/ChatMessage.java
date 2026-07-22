package com.example.mentorbridge_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;

    private Long senderId;

    private String senderRole;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime sentAt;
}