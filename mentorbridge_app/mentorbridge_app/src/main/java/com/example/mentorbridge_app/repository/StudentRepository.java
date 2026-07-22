package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Student> findByNameContainingIgnoreCaseOrSkillsContainingIgnoreCase(String name, String skills);
}