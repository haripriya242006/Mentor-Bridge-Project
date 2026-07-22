import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm px-4 py-2 d-flex justify-content-between align-items-center" style={{ zIndex: 1050, borderBottom: '1px solid #e2e8f0' }}>
      <Link className="navbar-brand fw-bold text-primary fs-4" to="/" style={{ letterSpacing: '-0.02em' }}>
        🎓 MentorBridge
      </Link>

      <div className="d-flex align-items-center gap-3">
        <Link className="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold" to="/student/login">
          Student
        </Link>
        <Link className="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold" to="/mentor/login">
          Mentor
        </Link>
        <Link className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm" to="/admin/login">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;