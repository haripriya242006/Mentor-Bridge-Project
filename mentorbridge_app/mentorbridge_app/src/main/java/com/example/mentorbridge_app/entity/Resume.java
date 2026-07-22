package com.example.mentorbridge_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private String fileName;

    private String filePath;

    @Column(columnDefinition = "TEXT")
    private String feedback;

}