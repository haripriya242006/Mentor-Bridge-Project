package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MockInterviewRepository
        extends JpaRepository<MockInterview, Long> {

    List<MockInterview> findByStudentId(Long studentId);

    List<MockInterview> findByMentorId(Long mentorId);

}