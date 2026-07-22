package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.entity.Resume;
import com.example.mentorbridge_app.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    // Upload Resume Details
    public Resume uploadResume(Resume resume) {

        return resumeRepository.save(resume);

    }

    // Get Resume by Student ID
    public Resume getResumeByStudentId(Long studentId) {

        Optional<Resume> optionalResume =
                resumeRepository.findByStudentId(studentId);

        return optionalResume.orElse(null);

    }

    // Mentor Adds Feedback
    public Resume addFeedback(Long studentId, String feedback) {

        Optional<Resume> optionalResume =
                resumeRepository.findByStudentId(studentId);

        if (optionalResume.isPresent()) {

            Resume resume = optionalResume.get();

            resume.setFeedback(feedback);

            return resumeRepository.save(resume);

        }

        return null;

    }
    @Value("${file.upload-dir}")
    private String uploadDir;
    public Resume uploadResume(Long studentId, MultipartFile file) throws IOException {

        File folder = new File(uploadDir);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String uniqueFileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        File destinationFile =
                new File(folder, uniqueFileName);

        file.transferTo(destinationFile);

        Resume resume = new Resume();

        resume.setStudentId(studentId);
        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(destinationFile.getAbsolutePath());
        resume.setFeedback("");

        return resumeRepository.save(resume);

    }
    public Resource downloadResume(Long studentId) throws Exception {


        Resume resume = resumeRepository
                .findByStudentId(studentId)
                .orElseThrow(
                        () -> new RuntimeException("Resume not found")
                );


        Path path = Paths.get(resume.getFilePath());


        return new UrlResource(path.toUri());

    }

}
