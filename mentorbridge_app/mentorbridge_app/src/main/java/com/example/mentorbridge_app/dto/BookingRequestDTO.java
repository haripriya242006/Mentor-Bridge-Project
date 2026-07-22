package com.example.mentorbridge_app.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class BookingRequestDTO {

    private Long studentId;

    private Long mentorId;

    private LocalDate bookingDate;

    private LocalTime bookingTime;

    private Integer duration;

}