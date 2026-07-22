package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginAdmin(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(adminAuthService.loginAdmin(request));
    }
}