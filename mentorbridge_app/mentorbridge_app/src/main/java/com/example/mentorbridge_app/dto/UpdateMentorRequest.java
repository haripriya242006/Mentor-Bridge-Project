package com.example.mentorbridge_app.dto;

import lombok.Data;

@Data
public class UpdateMentorRequest {
    private String name;
    private String company;
    private String experience;
    private String skills;
    private String expertise;
    private String availability;
}
