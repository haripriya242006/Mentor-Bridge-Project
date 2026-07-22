package com.example.mentorbridge_app.dto;

import lombok.Data;

@Data
public class SendRequestDTO {

    private Long studentId;

    private Long mentorId;

    private String message;

}