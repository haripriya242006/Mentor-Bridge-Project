package com.example.mentorbridge_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MentorRequestResponseDTO {

    private Long requestId;

    private Long studentId;

    private String studentName;

    private Long mentorId;

    private String mentorName;

    private String message;

    private String status;

    private LocalDateTime requestedAt;

}