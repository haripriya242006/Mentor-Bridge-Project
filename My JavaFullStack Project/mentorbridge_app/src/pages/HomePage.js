import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page-wrapper">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-2 rounded-pill mb-3">
                🚀 Mentorship & Career Growth Platform
              </span>
              <h1 className="display-4 fw-bold text-dark mb-3">
                Welcome to <span className="text-primary">MentorBridge</span>
              </h1>
              <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '720px', fontSize: '1.15rem' }}>
                Connect students with industry mentors for career guidance, resume reviews, mock interviews and personalized learning.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap mb-2">
                <a href="#roles" className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm">
                  Get Started →
                </a>
                <a href="#roles" className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-3 fw-bold">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section id="roles" className="roles-section py-5">
        <div className="container py-3">
          <div className="row justify-content-center g-4">
            
            {/* Student Card */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card role-card border-0">
                {/* Top: Large circular icon */}
                <div className="role-icon-circle">
                  🎓
                </div>

                {/* Middle: Title & Description */}
                <div>
                  <h3 className="fw-bold text-dark mb-2">Student</h3>
                  <p className="text-muted fs-6 mb-0">
                    Connect with mentors, book 1-on-1 sessions, get resume reviews, and practice mock technical interviews.
                  </p>
                </div>

                {/* Bottom: Buttons */}
                <div className="d-flex gap-2 w-100 mt-3">
                  <Link to="/student/login" className="btn btn-primary btn-lg rounded-pill w-100 fw-semibold">
                    Login
                  </Link>
                  <Link to="/student/signup" className="btn btn-outline-primary btn-lg rounded-pill w-100 fw-semibold">
                    Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* Mentor Card */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card role-card border-0">
                {/* Top: Large circular icon */}
                <div className="role-icon-circle">
                  👨‍🏫
                </div>

                {/* Middle: Title & Description */}
                <div>
                  <h3 className="fw-bold text-dark mb-2">Mentor</h3>
                  <p className="text-muted fs-6 mb-0">
                    Share your industry experience, conduct mock interview calls, review resumes, and guide tech talent.
                  </p>
                </div>

                {/* Bottom: Buttons */}
                <div className="d-flex gap-2 w-100 mt-3">
                  <Link to="/mentor/login" className="btn btn-primary btn-lg rounded-pill w-100 fw-semibold">
                    Login
                  </Link>
                  <Link to="/mentor/signup" className="btn btn-outline-primary btn-lg rounded-pill w-100 fw-semibold">
                    Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin Card */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card role-card border-0">
                {/* Top: Large circular icon */}
                <div className="role-icon-circle">
                  🛡️
                </div>

                {/* Middle: Title & Description */}
                <div>
                  <h3 className="fw-bold text-dark mb-2">Admin</h3>
                  <p className="text-muted fs-6 mb-0">
                    Manage registered users, monitor session bookings, oversee mock calls, and review analytics.
                  </p>
                </div>

                {/* Bottom: Single Button */}
                <div className="w-100 mt-3">
                  <Link to="/admin/login" className="btn btn-dark btn-lg rounded-pill w-100 fw-semibold">
                    Admin Login
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;