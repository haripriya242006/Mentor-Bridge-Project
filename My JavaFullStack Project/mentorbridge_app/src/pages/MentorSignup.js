import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mentorRegister } from '../services/authService';

function MentorSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    experience: '',
    skills: '',
    expertise: '',
    availability: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await mentorRegister(formData);
      setMessage(response.data);

      setTimeout(() => {
        navigate('/mentor/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Mentor registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Mentor Signup</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="form-control mb-3" type="text" name="company" placeholder="Company" onChange={handleChange} />
          <input className="form-control mb-3" type="text" name="experience" placeholder="Experience" onChange={handleChange} />
          <input className="form-control mb-3" type="text" name="skills" placeholder="Skills" onChange={handleChange} />
          <input className="form-control mb-3" type="text" name="expertise" placeholder="Expertise" onChange={handleChange} />
          <input className="form-control mb-3" type="text" name="availability" placeholder="Availability" onChange={handleChange} />

          <button className="btn btn-success w-100" type="submit">Signup</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/mentor/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default MentorSignup;