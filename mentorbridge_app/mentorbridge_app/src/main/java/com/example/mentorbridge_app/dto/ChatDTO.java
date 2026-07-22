package com.example.mentorbridge_app.dto;

import lombok.Data;

@Data
public class ChatDTO {

    private Long bookingId;

    private Long senderId;

    private String senderRole;

    private String message;

}