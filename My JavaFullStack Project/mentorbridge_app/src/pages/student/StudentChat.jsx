import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStudentData } from '../../features/student/hooks';
import { getMessages, sendMessage } from '../../services/chatService';
import ConversationList from '../../components/ConversationList';
import ChatWindow from '../../components/ChatWindow';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentChat() {
  const location = useLocation();
  const params = useParams();
  const { student, bookings, loading: studentLoading } = useStudentData();
  
  const [activeBooking, setActiveBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract approved bookings as conversations
  const approvedBookings = bookings.filter(b => b.status === 'APPROVED');

  // Auto-select active booking when approvedBookings load or location/params change
  useEffect(() => {
    if (approvedBookings.length > 0) {
      const targetBookingId = params.bookingId || location.state?.bookingId;
      if (targetBookingId) {
        const found = approvedBookings.find(
          b => String(b.id) === String(targetBookingId)
        );
        if (found) {
          setActiveBooking(found);
          return;
        }
      }
      if (!activeBooking) {
        setActiveBooking(approvedBookings[0]);
      }
    }
  }, [approvedBookings, params.bookingId, location.state]);

  // Load messages for the selected booking
  const loadMessages = async (bookingId) => {
    if (!bookingId) return;
    try {
      const res = await getMessages(bookingId);
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Poll messages every 2 seconds when conversation is active
  useEffect(() => {
    if (!activeBooking || !activeBooking.id) return;

    loadMessages(activeBooking.id);
    const interval = setInterval(() => {
      loadMessages(activeBooking.id);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeBooking]);

  const handleSend = async () => {
    if (text.trim() === '' || !activeBooking) return;

    const senderId = student?.id || localStorage.getItem('studentId') || localStorage.getItem('userId');

    try {
      await sendMessage({
        bookingId: activeBooking.id,
        senderId: senderId,
        senderRole: 'STUDENT',
        message: text
      });
      setText('');
      await loadMessages(activeBooking.id);
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message.');
    }
  };

  const handleSelectConversation = (booking) => {
    setChatLoading(true);
    setActiveBooking(booking);
    setMessages([]);
    loadMessages(booking.id).finally(() => setChatLoading(false));
  };

  if (studentLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Direct Messages</h1>
          <p className="header-subtitle">Communicate directly with your approved industry mentors.</p>
        </div>
      </div>

      <div className="chat-layout">
        <ConversationList
          conversations={approvedBookings}
          activeId={activeBooking?.id}
          onSelect={handleSelectConversation}
          role="STUDENT"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <ChatWindow
          messages={messages}
          activeConversation={activeBooking}
          onSend={handleSend}
          text={text}
          onTextChange={setText}
          role="STUDENT"
          loading={chatLoading}
        />
      </div>
    </div>
  );
}

export default StudentChat;
