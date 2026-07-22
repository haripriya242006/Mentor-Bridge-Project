package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.MentorResponse;
import com.example.mentorbridge_app.dto.AuthResponse;
import com.example.mentorbridge_app.dto.LoginRequest;
import com.example.mentorbridge_app.dto.MentorRegisterRequest;
import com.example.mentorbridge_app.entity.Mentor;
import com.example.mentorbridge_app.repository.MentorRepository;
import com.example.mentorbridge_app.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.mentorbridge_app.dto.MentorProfileResponse;
import com.example.mentorbridge_app.dto.UpdateMentorRequest;

@Service
@RequiredArgsConstructor
public class MentorAuthService {

    private final MentorRepository mentorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String registerMentor(MentorRegisterRequest request) {
        if (mentorRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Mentor email already registered");
        }

        Mentor mentor = Mentor.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .company(request.getCompany())
                .experience(request.getExperience())
                .skills(request.getSkills())
                .expertise(request.getExpertise())
                .availability(request.getAvailability())
                .rating(0.0)
                .build();

        mentorRepository.save(mentor);
        return "Mentor registered successfully";
    }

    public AuthResponse loginMentor(LoginRequest request) {
        Mentor mentor = mentorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        if (!passwordEncoder.matches(request.getPassword(), mentor.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(mentor.getEmail(), "MENTOR");
        return new AuthResponse(token, "MENTOR", "Mentor login successful");
    }
    public java.util.List<MentorResponse> getAllMentors() {
        return mentorRepository.findAll()
                .stream()
                .map(mentor -> new MentorResponse(
                        mentor.getId(),
                        mentor.getName(),
                        mentor.getEmail(),
                        mentor.getCompany(),
                        mentor.getExperience(),
                        mentor.getSkills(),
                        mentor.getExpertise(),
                        mentor.getAvailability(),
                        mentor.getRating()
                ))
                .toList();
    }

    public java.util.List<MentorResponse> searchMentors(String keyword) {
        return mentorRepository
                .findByNameContainingIgnoreCaseOrSkillsContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(mentor -> new MentorResponse(
                        mentor.getId(),
                        mentor.getName(),
                        mentor.getEmail(),
                        mentor.getCompany(),
                        mentor.getExperience(),
                        mentor.getSkills(),
                        mentor.getExpertise(),
                        mentor.getAvailability(),
                        mentor.getRating()
                ))
                .toList();
    }
    public MentorProfileResponse getMentorProfileByEmail(String email) {
        Mentor mentor = mentorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        return new MentorProfileResponse(
                mentor.getId(),
                mentor.getName(),
                mentor.getEmail(),
                mentor.getCompany(),
                mentor.getExperience(),
                mentor.getSkills(),
                mentor.getExpertise(),
                mentor.getAvailability(),
                mentor.getRating()
        );
    }

    public MentorProfileResponse updateMentorProfile(Long id, UpdateMentorRequest request) {
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        mentor.setName(request.getName());
        mentor.setCompany(request.getCompany());
        mentor.setExperience(request.getExperience());
        mentor.setSkills(request.getSkills());
        mentor.setExpertise(request.getExpertise());
        mentor.setAvailability(request.getAvailability());

        Mentor updated = mentorRepository.save(mentor);

        return new MentorProfileResponse(
                updated.getId(),
                updated.getName(),
                updated.getEmail(),
                updated.getCompany(),
                updated.getExperience(),
                updated.getSkills(),
                updated.getExpertise(),
                updated.getAvailability(),
                updated.getRating()
        );
    }
}