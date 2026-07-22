package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.MentorRequestResponseDTO;
import com.example.mentorbridge_app.dto.SendRequestDTO;
import com.example.mentorbridge_app.service.MentorRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MentorRequestController {

    private final MentorRequestService mentorRequestService;

    // Student sends request
    @PostMapping("/send")
    public ResponseEntity<String> sendRequest(@RequestBody SendRequestDTO requestDTO) {
        return ResponseEntity.ok(mentorRequestService.sendRequest(requestDTO));
    }

    // Student views all his requests
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MentorRequestResponseDTO>> getStudentRequests(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                mentorRequestService.getStudentRequests(studentId)
        );
    }

    // Mentor views pending requests
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<MentorRequestResponseDTO>> getMentorPendingRequests(
            @PathVariable Long mentorId) {

        return ResponseEntity.ok(
                mentorRequestService.getMentorPendingRequests(mentorId)
        );
    }

    // Mentor accepts request
    @PutMapping("/{requestId}/accept")
    public ResponseEntity<String> acceptRequest(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                mentorRequestService.acceptRequest(requestId)
        );
    }

    // Mentor rejects request
    @PutMapping("/{requestId}/reject")
    public ResponseEntity<String> rejectRequest(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                mentorRequestService.rejectRequest(requestId)
        );
    }

}