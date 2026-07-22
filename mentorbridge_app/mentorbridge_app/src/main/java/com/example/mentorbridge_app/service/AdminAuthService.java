package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.entity.Admin;
import com.example.mentorbridge_app.repository.AdminRepository;
import com.example.mentorbridge_app.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse loginAdmin(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN");
        return new AuthResponse(token, "ADMIN", "Admin login successful");
    }
}