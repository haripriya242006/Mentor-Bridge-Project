package com.example.mentorbridge_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MentorResponse {
    private Long id;
    private String name;
    private String email;
    private String company;
    private String experience;
    private String skills;
    private String expertise;
    private String availability;
    private Double rating;
}