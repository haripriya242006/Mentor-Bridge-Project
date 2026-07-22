package com.example.mentorbridge_app.dto;

import lombok.Data;

@Data
public class UpdateStudentRequest {
    private String name;
    private String college;
    private String department;
    private Integer yearOfStudy;
    private String skills;
    private String linkedinUrl;
    private String githubUrl;
}