package com.example.mentorbridge_app.config;

import com.example.mentorbridge_app.entity.Admin;
import com.example.mentorbridge_app.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        String adminEmail = "admin@mentorbridge.com";

        if (adminRepository.findByEmail(adminEmail).isEmpty()) {
            Admin admin = Admin.builder()
                    .name("Main Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("Admin@123"))
                    .build();

            adminRepository.save(admin);
            System.out.println("Default admin created successfully");
        }
    }
}