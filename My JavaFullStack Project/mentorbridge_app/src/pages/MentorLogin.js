import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mentorLogin } from '../services/authService';

function MentorLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await mentorLogin(formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', formData.email);
      localStorage.setItem("mentorId", response.data.id);

      navigate('/mentor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Mentor login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Mentor Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <button className="btn btn-success w-100" type="submit">Login</button>
        </form>

        <p className="mt-3 text-center">
          New mentor? <Link to="/mentor/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default MentorLogin;