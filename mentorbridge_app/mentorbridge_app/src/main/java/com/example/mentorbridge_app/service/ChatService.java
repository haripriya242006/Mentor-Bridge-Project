package com.example.mentorbridge_app.service;

import com.example.mentorbridge_app.dto.ChatDTO;
import com.example.mentorbridge_app.entity.ChatMessage;
import com.example.mentorbridge_app.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    ChatRepository repository;

    public ChatMessage send(ChatDTO dto){

        ChatMessage chat=new ChatMessage();

        chat.setBookingId(dto.getBookingId());
        chat.setSenderId(dto.getSenderId());
        chat.setSenderRole(dto.getSenderRole());
        chat.setMessage(dto.getMessage());
        chat.setSentAt(LocalDateTime.now());

        return repository.save(chat);

    }

    public List<ChatMessage> getMessages(Long bookingId){

        return repository.findByBookingIdOrderBySentAtAsc(bookingId);

    }

}