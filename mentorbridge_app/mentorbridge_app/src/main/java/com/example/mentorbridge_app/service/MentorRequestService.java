package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.MentorRequestResponseDTO;
import com.example.mentorbridge_app.dto.SendRequestDTO;
import com.example.mentorbridge_app.entity.Mentor;
import com.example.mentorbridge_app.entity.MentorRequest;
import com.example.mentorbridge_app.entity.Student;
import com.example.mentorbridge_app.repository.MentorRepository;
import com.example.mentorbridge_app.repository.MentorRequestRepository;
import com.example.mentorbridge_app.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorRequestService {

    private final MentorRequestRepository mentorRequestRepository;
    private final StudentRepository studentRepository;
    private final MentorRepository mentorRepository;

    // Student sends request to mentor
    public String sendRequest(SendRequestDTO requestDTO) {

        Student student = studentRepository.findById(requestDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Mentor mentor = mentorRepository.findById(requestDTO.getMentorId())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        MentorRequest request = new MentorRequest();
        request.setStudent(student);
        request.setMentor(mentor);
        request.setMessage(requestDTO.getMessage());
        request.setStatus("PENDING");
        request.setRequestedAt(LocalDateTime.now());

        mentorRequestRepository.save(request);

        return "Request Sent Successfully";
    }

    // Student views all requests
    public List<MentorRequestResponseDTO> getStudentRequests(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return mentorRequestRepository.findByStudent(student)
                .stream()
                .map(request -> new MentorRequestResponseDTO(
                        request.getId(),
                        request.getStudent().getId(),
                        request.getStudent().getName(),
                        request.getMentor().getId(),
                        request.getMentor().getName(),
                        request.getMessage(),
                        request.getStatus(),
                        request.getRequestedAt()
                ))
                .toList();
    }

    // Mentor views pending requests
    public List<MentorRequestResponseDTO> getMentorPendingRequests(Long mentorId) {

        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        return mentorRequestRepository.findByMentorAndStatus(mentor, "PENDING")
                .stream()
                .map(request -> new MentorRequestResponseDTO(
                        request.getId(),
                        request.getStudent().getId(),
                        request.getStudent().getName(),
                        request.getMentor().getId(),
                        request.getMentor().getName(),
                        request.getMessage(),
                        request.getStatus(),
                        request.getRequestedAt()
                ))
                .toList();
    }

    // Mentor accepts request
    public String acceptRequest(Long requestId) {

        MentorRequest request = mentorRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("ACCEPTED");
        mentorRequestRepository.save(request);

        return "Request Accepted";
    }

    // Mentor rejects request
    public String rejectRequest(Long requestId) {

        MentorRequest request = mentorRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("REJECTED");
        mentorRequestRepository.save(request);

        return "Request Rejected";
    }
}