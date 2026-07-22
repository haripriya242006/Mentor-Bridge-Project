package com.example.mentorbridge_app.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class BookingResponseDTO {

    private Long bookingId;

    private String studentName;

    private String mentorName;

    private LocalDate bookingDate;

    private LocalTime bookingTime;

    private Integer duration;

    private String status;

}
