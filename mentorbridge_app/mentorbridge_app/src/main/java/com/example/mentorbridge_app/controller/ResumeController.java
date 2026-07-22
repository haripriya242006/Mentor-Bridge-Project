package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.ResumeFeedbackDTO;
import com.example.mentorbridge_app.entity.Resume;
import com.example.mentorbridge_app.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    // Upload Resume
    @PostMapping("/upload")
    public Resume uploadResume(

            @RequestParam("studentId") Long studentId,

            @RequestParam("file") MultipartFile file

    ) throws IOException {

        return resumeService.uploadResume(studentId, file);

    }

    // Get Resume
    @GetMapping("/{studentId}")
    public Resume getResume(@PathVariable Long studentId) {

        return resumeService.getResumeByStudentId(studentId);

    }

    // Add Feedback
    @PutMapping("/feedback")
    public Resume addFeedback(
            @RequestBody ResumeFeedbackDTO dto) {

        return resumeService.addFeedback(
                dto.getStudentId(),
                dto.getFeedback()
        );

    }
    @GetMapping("/download/{studentId}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long studentId
    ) throws Exception {


        Resource resource =
                resumeService.downloadResume(studentId);


        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + resource.getFilename()
                                + "\""
                )
                .body(resource);

    }

}