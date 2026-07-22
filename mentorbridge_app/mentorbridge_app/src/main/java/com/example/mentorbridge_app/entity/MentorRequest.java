package com.example.mentorbridge_app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mentor_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MentorRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    @Column(length = 500)
    private String message;

    private String status;

    private LocalDateTime requestedAt;
}
