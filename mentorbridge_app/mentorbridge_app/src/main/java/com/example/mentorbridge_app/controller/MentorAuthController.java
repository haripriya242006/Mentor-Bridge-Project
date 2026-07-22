package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.MentorResponse;
import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.service.MentorAuthService;
import com.example.mentorbridge_app.dto.MentorRegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.mentorbridge_app.dto.MentorProfileResponse;
import com.example.mentorbridge_app.dto.UpdateMentorRequest;

@RestController
@RequestMapping("/api/mentors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MentorAuthController {

    private final MentorAuthService mentorAuthService;

    @PostMapping("/register")
    public ResponseEntity<String> registerMentor(@Valid @RequestBody MentorRegisterRequest request) {
        return ResponseEntity.ok(mentorAuthService.registerMentor(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginMentor(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(mentorAuthService.loginMentor(request));
    }
    @GetMapping("/all")
    public ResponseEntity<java.util.List<MentorResponse>> getAllMentors() {
        return ResponseEntity.ok(mentorAuthService.getAllMentors());
    }

    @GetMapping("/search")
    public ResponseEntity<java.util.List<MentorResponse>> searchMentors(@RequestParam String keyword) {
        return ResponseEntity.ok(mentorAuthService.searchMentors(keyword));
    }
    @GetMapping("/profile")
    public ResponseEntity<MentorProfileResponse> getMentorProfile(@RequestParam String email) {
        return ResponseEntity.ok(mentorAuthService.getMentorProfileByEmail(email));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<MentorProfileResponse> updateMentorProfile(
            @PathVariable Long id,
            @RequestBody UpdateMentorRequest request
    ) {
        return ResponseEntity.ok(mentorAuthService.updateMentorProfile(id, request));
    }
}