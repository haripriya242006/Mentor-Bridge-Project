import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStudentData } from '../../features/student/hooks';
import { createBooking } from '../../services/bookingService';
import BookingCard from '../../components/BookingCard';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentBookings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryMentorId = searchParams.get('mentorId') || '';

  const { student, bookings, mentors, loading, error, fetchBookings } = useStudentData();

  // Booking Form State
  const [mentorId, setMentorId] = useState(queryMentorId);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState(30);

  const [formMsg, setFormMsg] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (queryMentorId) {
      setMentorId(queryMentorId);
    }
  }, [queryMentorId]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setFormError('');

    if (!mentorId) {
      setFormError('Please select a mentor.');
      return;
    }
    if (!bookingDate || !bookingTime) {
      setFormError('Please specify date and time.');
      return;
    }

    setSubmitting(true);
    const bookingData = {
      studentId: student.id,
      mentorId: Number(mentorId),
      bookingDate,
      bookingTime,
      duration: Number(duration)
    };

    try {
      await createBooking(bookingData);
      setFormMsg('Session request submitted successfully!');
      // Reset form
      setBookingDate('');
      setBookingTime('');
      setDuration(30);
      setMentorId('');
      fetchBookings(student.id);
    } catch (err) {
      console.error(err);
      setFormError('Booking request failed. Please check availability.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Mentor Session Bookings</h1>
          <p className="header-subtitle">Book a new conversation or review your active and past schedules.</p>
        </div>
      </div>

      <div className="flex-row-layout">
        
        {/* Left Column: Form Card */}
        <div className="section-card" style={{ width: '40%', minWidth: '320px' }}>
          <div className="section-header">
            <h3 className="section-title">Schedule New Session</h3>
          </div>
          <div className="section-body">
            {formMsg && (
              <div className="alert alert-success" style={{ padding: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                {formMsg}
              </div>
            )}
            {formError && (
              <div className="alert alert-danger" style={{ padding: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Select Mentor</label>
                <select
                  className="form-select"
                  value={mentorId}
                  onChange={(e) => setMentorId(e.target.value)}
                  required
                >
                  <option value="">Choose a mentor...</option>
                  {mentors.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.company || 'Professional'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Duration (Minutes)</label>
                <select
                  className="form-select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
                {submitting ? 'Submitting...' : '📅 Request Session'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: History Card */}
        <div className="section-card flex-1">
          <div className="section-header">
            <h3 className="section-title">Booking History</h3>
          </div>
          <div className="section-body">
            {bookings.length === 0 ? (
              <EmptyState
                icon="📅"
                title="No bookings recorded"
                description="Your requested, approved, and cancelled bookings will be listed here."
              />
            ) : (
              <div 
                style={{ 
                  maxHeight: '65vh', 
                  overflowY: 'auto', 
                  paddingRight: '4px' 
                }}
              >
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    role="STUDENT"
                    onChat={(bId) => navigate('/student/dashboard/messages', { state: { bookingId: bId || booking.id } })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentBookings;
