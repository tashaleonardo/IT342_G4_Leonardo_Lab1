import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const guestMode = localStorage.getItem('isGuest');
    
    if (!token || !user) {
      navigate('/login', { replace: true });
      return;
    }
    
    // Check if guest
    if (guestMode === 'true') {
      setIsGuest(true);
      return;
    }
    
    // Parse user data from localStorage
    const userData = JSON.parse(user);
    setProfile(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (isGuest) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2> Guest Profile</h2>
          <div className="guest-message">
            <p> You're browsing as a guest.</p>
            <p>Create an account to access your profile and unlock all features!</p>
            <div className="guest-actions">
              <Link to="/register" className="guest-action-btn primary">
                Create Account
              </Link>
              <Link to="/login" className="guest-action-btn">
                Sign In
              </Link>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return <div className="loading">Loading profile…</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2> Your Profile</h2>

        <div className="profile-info">
          <div className="info-row">
            <label>Full Name:</label>
            <span>{profile.fullName || 'Not provided'}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>
          <div className="info-row">
            <label>User ID:</label>
            <span>{profile.userId}</span>
          </div>
          <div className="info-row">
            <label>Role:</label>
            <span>{profile.role}</span>
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
