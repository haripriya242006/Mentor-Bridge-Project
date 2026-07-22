package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.BookingRequestDTO;
import com.example.mentorbridge_app.dto.BookingResponseDTO;
import com.example.mentorbridge_app.entity.Booking;
import com.example.mentorbridge_app.entity.Mentor;
import com.example.mentorbridge_app.entity.Student;
import com.example.mentorbridge_app.repository.BookingRepository;
import com.example.mentorbridge_app.repository.MentorRepository;
import com.example.mentorbridge_app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MentorRepository mentorRepository;

    public BookingResponseDTO bookSession(BookingRequestDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Mentor mentor = mentorRepository.findById(dto.getMentorId())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        Booking booking = new Booking();

        booking.setStudent(student);
        booking.setMentor(mentor);
        booking.setBookingDate(dto.getBookingDate());
        booking.setBookingTime(dto.getBookingTime());
        booking.setDuration(dto.getDuration());
        booking.setStatus("PENDING");

        Booking savedBooking = bookingRepository.save(booking);

        BookingResponseDTO response = new BookingResponseDTO();

        response.setBookingId(savedBooking.getId());
        response.setStudentName(student.getName());
        response.setMentorName(mentor.getName());
        response.setBookingDate(savedBooking.getBookingDate());
        response.setBookingTime(savedBooking.getBookingTime());
        response.setDuration(savedBooking.getDuration());
        response.setStatus(savedBooking.getStatus());

        return response;
    }
    public List<Booking> getStudentBookings(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return bookingRepository.findByStudent(student);
    }
    public List<Booking> getMentorBookings(Long mentorId) {

        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        return bookingRepository.findByMentor(mentor);
    }
    public Booking approveBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("APPROVED");

        return bookingRepository.save(booking);
    }
    public Booking rejectBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("REJECTED");

        return bookingRepository.save(booking);
    }

}
