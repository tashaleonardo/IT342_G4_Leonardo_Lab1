import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestBrowse = () => {
    const guestUser = {
      email: 'guest@example.com',
      fullName: 'Guest User',
      role: 'GUEST',
      userId: 0
    };
    
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('token', 'guest-token'); 
    
    navigate('/dashboard', { replace: true });
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2> Welcome Back!</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <button className="guest-btn" onClick={handleGuestBrowse}>
           Continue as Guest
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
