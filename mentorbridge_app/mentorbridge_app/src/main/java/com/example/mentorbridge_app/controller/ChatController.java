package com.example.mentorbridge_app.controller;

import com.example.mentorbridge_app.dto.ChatDTO;
import com.example.mentorbridge_app.entity.ChatMessage;
import com.example.mentorbridge_app.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    ChatService service;

    @PostMapping("/send")
    public ChatMessage send(@RequestBody ChatDTO dto){

        return service.send(dto);

    }

    @GetMapping("/{bookingId}")
    public List<ChatMessage> get(@PathVariable Long bookingId){

        return service.getMessages(bookingId);

    }

}