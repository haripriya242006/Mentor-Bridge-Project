import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { useStudentData } from "../features/student/hooks";

function BookingForm({studentId, mentorId}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { student, mentors, fetchMentors } = useStudentData();

    const [selectedMentorId, setSelectedMentorId] = useState(location.state?.mentorId || "");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [duration, setDuration] = useState(30);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchMentors();
    }, [fetchMentors]);

    const handleBooking = async (e) => {
        e.preventDefault();

        const finalStudentId = studentId || student?.id;
        const finalMentorId = mentorId || Number(selectedMentorId);

        if (!finalStudentId) {
            alert("Student profile is not loaded yet. Please try again.");
            return;
        }

        if (!finalMentorId) {
            alert("Please select a mentor.");
            return;
        }

        const bookingData = {
            studentId: finalStudentId,
            mentorId: finalMentorId,
            bookingDate: bookingDate,
            bookingTime: bookingTime,
            duration: Number(duration)
        };

        setSubmitting(true);
        try {
            const response = await createBooking(bookingData);
            console.log(response.data);
            navigate("/student/dashboard/bookings", {
                state: { message: "Booking Created Successfully" }
            });
        }
        catch (error) {
            console.log(error);
            alert("Booking Failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3>
                Book Mentor Session
            </h3>

            <form onSubmit={handleBooking}>
                {!mentorId && (
                    <>
                        <label>
                            Select Mentor
                        </label>
                        <select
                            className="form-select"
                            value={selectedMentorId}
                            onChange={(e) => setSelectedMentorId(e.target.value)}
                            required
                        >
                            <option value="">Choose a mentor...</option>
                            {mentors.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.name} ({m.company || 'Professional'})
                                </option>
                            ))}
                        </select>
                        <br/>
                    </>
                )}

                <label>
                    Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                />
                <br/>

                <label>
                    Time
                </label>
                <input
                    type="time"
                    className="form-control"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                />
                <br/>

                <label>
                    Duration (minutes)
                </label>
                <input
                    type="number"
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
                <br/>

                <button className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Booking..." : "Book Session"}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;