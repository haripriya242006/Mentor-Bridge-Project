package com.example.mentorbridge_app.entity;

import jakarta.persistence.*;
        import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String college;
    private String department;
    private Integer yearOfStudy;
    private String skills;
    private String linkedinUrl;
    private String githubUrl;
    private String resumePath;
}