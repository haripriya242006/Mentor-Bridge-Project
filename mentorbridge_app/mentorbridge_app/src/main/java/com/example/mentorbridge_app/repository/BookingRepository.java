package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.Booking;
import com.example.mentorbridge_app.entity.Mentor;
import com.example.mentorbridge_app.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStudent(Student student);

    List<Booking> findByMentor(Mentor mentor);

    List<Booking> findByStatus(String status);

    List<Booking> findByMentorId(Long mentorId);

}