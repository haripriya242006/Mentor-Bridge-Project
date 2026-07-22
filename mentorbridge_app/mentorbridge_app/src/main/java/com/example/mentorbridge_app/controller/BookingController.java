package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.BookingRequestDTO;
import com.example.mentorbridge_app.dto.BookingResponseDTO;
import com.example.mentorbridge_app.entity.Booking;
import com.example.mentorbridge_app.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    @PostMapping
    public BookingResponseDTO bookSession(@RequestBody BookingRequestDTO dto) {

        return bookingService.bookSession(dto);

    }
    @GetMapping("/student/{studentId}")
    public List<Booking> getStudentBookings(@PathVariable Long studentId) {

        return bookingService.getStudentBookings(studentId);

    }
    @GetMapping("/mentor/{mentorId}")
    public List<Booking> getMentorBookings(@PathVariable Long mentorId) {

        return bookingService.getMentorBookings(mentorId);

    }
    @PutMapping("/{bookingId}/approve")
    public Booking approveBooking(@PathVariable Long bookingId) {

        return bookingService.approveBooking(bookingId);

    }
    @PutMapping("/{bookingId}/reject")
    public Booking rejectBooking(@PathVariable Long bookingId) {

        return bookingService.rejectBooking(bookingId);

    }
}
