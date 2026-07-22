package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByStudentId(Long studentId);

}