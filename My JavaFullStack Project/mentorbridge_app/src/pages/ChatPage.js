import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../services/chatService";

function ChatPage() {

    const { bookingId } = useParams();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    const senderId = localStorage.getItem("userId") || localStorage.getItem("studentId") || localStorage.getItem("mentorId");
    const senderRole = localStorage.getItem("role");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {

        loadMessages();

        const interval = setInterval(loadMessages,2000);

        return ()=>clearInterval(interval);

    },[]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async()=>{

        try{

            const response=await getMessages(bookingId);

            setMessages(response.data || []);

        }
        catch(err){

            console.log(err);

        }

    };

    const handleSend=async()=>{

        if(text.trim()==="") return;

        await sendMessage({

            bookingId,

            senderId,

            senderRole,

            message:text

        });

        setText("");

        loadMessages();

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-page-container">
            <div className="chat-page-card">
                {/* Modern Chat Header */}
                <div className="chat-page-header">
                    <div className="chat-header-info">
                        <div className="chat-header-avatar">
                            💬
                        </div>
                        <div>
                            <h3 className="chat-header-title">Mentor Chat</h3>
                            <div className="chat-header-subtitle">
                                <span className="chat-status-dot"></span>
                                Active Session (Booking #{bookingId})
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Messages Section */}
                <div className="chat-messages-container">
                    {messages.length === 0 ? (
                        <div className="chat-empty-state">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const isOutgoing = msg.senderRole === senderRole;
                            const timestamp = msg.timestamp || msg.createdAt || msg.time;

                            return (
                                <div
                                    key={msg.id || index}
                                    className={`chat-message-row ${isOutgoing ? 'chat-message-outgoing' : 'chat-message-incoming'}`}
                                >
                                    <div className="chat-bubble">
                                        {msg.message}
                                    </div>
                                    <div className="chat-message-meta">
                                        <span className="chat-role-badge">{msg.senderRole}</span>
                                        {timestamp && (
                                            <>
                                                <span>•</span>
                                                <span className="chat-time-stamp">{timestamp}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Area at Bottom */}
                <div className="chat-input-container">
                    <div className="chat-input-wrapper">
                        <input
                            className="chat-input-field"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                        />
                    </div>
                    <button
                        className="chat-send-button"
                        onClick={handleSend}
                        type="button"
                    >
                        <span>Send</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ChatPage;