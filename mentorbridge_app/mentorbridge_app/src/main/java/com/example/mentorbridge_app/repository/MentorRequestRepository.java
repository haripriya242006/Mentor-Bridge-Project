package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.Mentor;
import com.example.mentorbridge_app.entity.MentorRequest;
import com.example.mentorbridge_app.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRequestRepository extends JpaRepository<MentorRequest, Long> {

    List<MentorRequest> findByStudent(Student student);

    List<MentorRequest> findByMentor(Mentor mentor);

    List<MentorRequest> findByMentorAndStatus(Mentor mentor, String status);

}