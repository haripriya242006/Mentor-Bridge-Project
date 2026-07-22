package com.example.mentorbridge_app.repository;

import com.example.mentorbridge_app.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage,Long>{

    List<ChatMessage> findByBookingIdOrderBySentAtAsc(Long bookingId);

}