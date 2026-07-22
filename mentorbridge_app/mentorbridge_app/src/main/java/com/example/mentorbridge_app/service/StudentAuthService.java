package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.StudentProfileResponse;
import com.example.mentorbridge_app.dto.UpdateStudentRequest;
import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.dto.StudentRegisterRequest;
import com.example.mentorbridge_app.entity.Student;
import com.example.mentorbridge_app.repository.StudentRepository;
import com.example.mentorbridge_app.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentAuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String registerStudent(StudentRegisterRequest request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Student email already registered");
        }

        Student student = Student.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .college(request.getCollege())
                .department(request.getDepartment())
                .yearOfStudy(request.getYearOfStudy())
                .skills(request.getSkills())
                .linkedinUrl(request.getLinkedinUrl())
                .githubUrl(request.getGithubUrl())
                .build();

        studentRepository.save(student);
        return "Student registered successfully";
    }

    public AuthResponse loginStudent(LoginRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(student.getEmail(), "STUDENT");
        return new AuthResponse(token, "STUDENT", "Student login successful");
    }
    public StudentProfileResponse getStudentProfileByEmail(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return new StudentProfileResponse(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCollege(),
                student.getDepartment(),
                student.getYearOfStudy(),
                student.getSkills(),
                student.getLinkedinUrl(),
                student.getGithubUrl()
        );
    }

    public StudentProfileResponse updateStudentProfile(Long id, UpdateStudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setName(request.getName());
        student.setCollege(request.getCollege());
        student.setDepartment(request.getDepartment());
        student.setYearOfStudy(request.getYearOfStudy());
        student.setSkills(request.getSkills());
        student.setLinkedinUrl(request.getLinkedinUrl());
        student.setGithubUrl(request.getGithubUrl());

        Student updated = studentRepository.save(student);

        return new StudentProfileResponse(
                updated.getId(),
                updated.getName(),
                updated.getEmail(),
                updated.getCollege(),
                updated.getDepartment(),
                updated.getYearOfStudy(),
                updated.getSkills(),
                updated.getLinkedinUrl(),
                updated.getGithubUrl()
        );
    }
    public java.util.List<StudentProfileResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(student -> new StudentProfileResponse(
                        student.getId(),
                        student.getName(),
                        student.getEmail(),
                        student.getCollege(),
                        student.getDepartment(),
                        student.getYearOfStudy(),
                        student.getSkills(),
                        student.getLinkedinUrl(),
                        student.getGithubUrl()
                ))
                .toList();
    }

    public java.util.List<StudentProfileResponse> searchStudents(String keyword) {
        return studentRepository
                .findByNameContainingIgnoreCaseOrSkillsContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(student -> new StudentProfileResponse(
                        student.getId(),
                        student.getName(),
                        student.getEmail(),
                        student.getCollege(),
                        student.getDepartment(),
                        student.getYearOfStudy(),
                        student.getSkills(),
                        student.getLinkedinUrl(),
                        student.getGithubUrl()
                ))
                .toList();
    }
}