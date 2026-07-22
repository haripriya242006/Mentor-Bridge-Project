import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentLogin } from '../services/authService';

function StudentLogin() {
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
      const response = await studentLogin(formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', formData.email);
      if (response.data.id || response.data.studentId || response.data.userId) {
        const id = response.data.id || response.data.studentId || response.data.userId;
        localStorage.setItem('studentId', id);
        localStorage.setItem('userId', id);
      }

      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Student login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Student Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>

        <p className="mt-3 text-center">
          New student? <Link to="/student/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;