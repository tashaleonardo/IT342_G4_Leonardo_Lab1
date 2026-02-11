import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (!stored) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    setAuth(parsed);
    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      const res = await authAPI.dashboard();
      setStats(res.data);
    } catch (err) {
      console.error('Dashboard load failed', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  if (!auth) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>{auth.email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats?.totalUsers ?? 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Artists</h3>
            <p className="stat-number">{stats?.totalArtists ?? 0}</p>
          </div>
        </section>

        <section className="users-section">
          <h2>Artists</h2>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Artist ID</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Specialties</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentArtists?.map((artist) => (
                  <tr key={artist.artistId}>
                    <td>{artist.artistId}</td>
                    <td>{artist.user?.email}</td>
                    <td>{artist.yearsOfExperience ?? 0}</td>
                    <td>{artist.specialties || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link to="/profile">Go to Profile</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
