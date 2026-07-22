package com.example.mentorbridge_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String college;
    private String department;
    private Integer yearOfStudy;
    private String skills;
    private String linkedinUrl;
    private String githubUrl;
}