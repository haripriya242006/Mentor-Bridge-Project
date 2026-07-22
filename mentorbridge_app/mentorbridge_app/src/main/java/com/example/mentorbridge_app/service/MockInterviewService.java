package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.entity.MockInterview;
import com.example.mentorbridge_app.repository.MockInterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockInterviewService {

    @Autowired
    private MockInterviewRepository repository;

    // Student creates interview request
    public MockInterview requestInterview(MockInterview interview) {

        interview.setStatus("PENDING");
        interview.setMeetingLink("");
        interview.setFeedback("");

        return repository.save(interview);
    }

    // Student views own interviews
    public List<MockInterview> getStudentInterviews(Long studentId) {

        return repository.findByStudentId(studentId);
    }

    // Mentor views interview requests
    public List<MockInterview> getMentorInterviews(Long mentorId) {

        return repository.findByMentorId(mentorId);
    }
    // Accept Interview
    public MockInterview acceptInterview(Long interviewId, String meetingLink) {

        MockInterview interview = repository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview Not Found"));

        interview.setStatus("APPROVED");
        interview.setMeetingLink(meetingLink);

        return repository.save(interview);
    }

    // Reject Interview
    public MockInterview rejectInterview(Long interviewId) {

        MockInterview interview = repository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview Not Found"));

        interview.setStatus("REJECTED");

        return repository.save(interview);
    }

}