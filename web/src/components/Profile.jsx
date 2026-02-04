import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (!stored) {
      navigate('/login');
      return;
    }
    const { token } = JSON.parse(stored);
    loadProfile(token);
  }, [navigate]);

  const loadProfile = async (token) => {
    try {
      const res = await authAPI.profile(token);
      setProfile(res.data);
    } catch (err) {
      console.error('Profile load failed', err);
    }
  };

  if (!profile) return <div className="loading">Loading profile…</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Artist Profile</h2>

        <div className="profile-info">
          <div className="info-row">
            <label>Full Name:</label>
            <span>{profile.fullName}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>
          <div className="info-row">
            <label>Phone:</label>
            <span>{profile.phoneNumber || '-'}</span>
          </div>
          <div className="info-row">
            <label>Bio:</label>
            <span>{profile.bio || '-'}</span>
          </div>
          <div className="info-row">
            <label>Experience:</label>
            <span>{profile.yearsOfExperience ?? 0} years</span>
          </div>
          <div className="info-row">
            <label>Specialties:</label>
            <span>{profile.specialties || '-'}</span>
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
