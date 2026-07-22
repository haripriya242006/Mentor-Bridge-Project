package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.StudentProfileResponse;
import com.example.mentorbridge_app.dto.UpdateStudentRequest;
import com.example.mentorbridge_app.service.StudentAuthService;
import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.dto.StudentRegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StudentAuthController {

    private final StudentAuthService studentAuthService;

    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@Valid @RequestBody StudentRegisterRequest request) {
        return ResponseEntity.ok(studentAuthService.registerStudent(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginStudent(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(studentAuthService.loginStudent(request));
    }
    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getStudentProfile(@RequestParam String email) {
        return ResponseEntity.ok(studentAuthService.getStudentProfileByEmail(email));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<StudentProfileResponse> updateStudentProfile(
            @PathVariable Long id,
            @RequestBody UpdateStudentRequest request
    ) {
        return ResponseEntity.ok(studentAuthService.updateStudentProfile(id, request));
    }
    @GetMapping("/all")
    public ResponseEntity<java.util.List<StudentProfileResponse>> getAllStudents() {
        return ResponseEntity.ok(studentAuthService.getAllStudents());
    }

    @GetMapping("/search")
    public ResponseEntity<java.util.List<StudentProfileResponse>> searchStudents(@RequestParam String keyword) {
        return ResponseEntity.ok(studentAuthService.searchStudents(keyword));
    }

}