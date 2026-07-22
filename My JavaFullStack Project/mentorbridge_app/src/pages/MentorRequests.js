import React, { useEffect, useState } from "react";
import {
  getMentorPendingRequests,
  acceptMentorRequest,
  rejectMentorRequest
} from "../services/authService";

function MentorRequests() {

  const [requests, setRequests] = useState([]);

  const mentorId = localStorage.getItem("mentorId");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await getMentorPendingRequests(mentorId);
      setRequests(response.data);
    } catch (error) {
      alert("Failed to load requests");
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptMentorRequest(requestId);
      alert("Request Accepted");
      loadRequests();
    } catch (error) {
      alert("Failed");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectMentorRequest(requestId);
      alert("Request Rejected");
      loadRequests();
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Pending Mentor Requests</h2>

      {requests.length === 0 ? (
        <p>No Pending Requests</p>
      ) : (

        requests.map((request) => (

          <div className="card mb-3" key={request.requestId}>

            <div className="card-body">

              <h5>{request.studentName}</h5>

              <p>
                <strong>Message :</strong>
                {" "}
                {request.message}
              </p>

              <p>
                <strong>Status :</strong>
                {" "}
                {request.status}
              </p>

              <button
                className="btn btn-success me-2"
                onClick={() => handleAccept(request.requestId)}
              >
                Accept
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleReject(request.requestId)}
              >
                Reject
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default MentorRequests;