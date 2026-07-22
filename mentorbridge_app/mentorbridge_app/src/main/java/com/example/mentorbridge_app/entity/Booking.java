package com.example.mentorbridge_app.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import com.example.mentorbridge_app.entity.Student;
import com.example.mentorbridge_app.entity.Mentor;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    private LocalDate bookingDate;

    private LocalTime bookingTime;

    private Integer duration;

    private String status;
}
