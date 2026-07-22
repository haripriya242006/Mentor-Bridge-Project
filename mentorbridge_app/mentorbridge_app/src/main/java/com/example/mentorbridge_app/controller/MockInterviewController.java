package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.entity.MockInterview;
import com.example.mentorbridge_app.service.MockInterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mock-interviews")
@CrossOrigin(origins = "http://localhost:3000")
public class MockInterviewController {

    @Autowired
    private MockInterviewService service;

    // Student Request Interview
    @PostMapping("/request")
    public MockInterview requestInterview(
            @RequestBody MockInterview interview) {

        return service.requestInterview(interview);
    }

    // Student View Interviews
    @GetMapping("/student/{studentId}")
    public List<MockInterview> getStudentInterviews(
            @PathVariable Long studentId) {

        return service.getStudentInterviews(studentId);
    }

    // Mentor View Interviews
    @GetMapping("/mentor/{mentorId}")
    public List<MockInterview> getMentorInterviews(
            @PathVariable Long mentorId) {

        return service.getMentorInterviews(mentorId);
    }
    @PutMapping("/accept/{id}")
    public MockInterview acceptInterview(
            @PathVariable Long id,
            @RequestParam String meetingLink
    ) {

        return service.acceptInterview(id, meetingLink);

    }
    @PutMapping("/reject/{id}")
    public MockInterview rejectInterview(
            @PathVariable Long id
    ) {

        return service.rejectInterview(id);

    }

}
