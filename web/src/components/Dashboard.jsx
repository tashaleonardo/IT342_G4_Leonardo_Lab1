import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const guestMode = localStorage.getItem('isGuest');
    
    if (!token || !user) {
      navigate('/login', { replace: true });
      return;
    }
    
    const parsed = JSON.parse(user);
    setAuth(parsed);
    setIsGuest(guestMode === 'true');
    
    if (guestMode !== 'true') {
      loadDashboard();
    } else {
      setStats({
        totalUsers: 0,
        activeToday: 0,
        newThisWeek: 0
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const loadDashboard = async () => {
    try {
      const res = await authAPI.dashboard();
      setStats(res.data);
    } catch (err) {
      console.error('Dashboard load failed', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    navigate('/login', { replace: true });
  };

  const handleLoginPrompt = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    navigate('/login', { replace: true });
  };

  if (!auth) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1> Dashboard</h1>
        <div className="user-info">
          {isGuest ? (
            <>
              <span className="guest-badge"> Browsing as Guest</span>
              <button className="login-prompt-btn" onClick={handleLoginPrompt}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <span>{auth.email}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="dashboard-content">
        {isGuest && (
          <section className="guest-notice">
            <p> You're browsing as a guest. <Link to="/register">Create an account</Link> to unlock all features!</p>
          </section>
        )}

        <section className="welcome-section">
          <h2>Welcome back, {isGuest ? 'Guest' : auth.fullName}! </h2>
          <p>Here's what's happening with your account today.</p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{isGuest ? '---' : stats?.totalUsers ?? 0}</p>
          </div>
          <div className="stat-card">
            <h3>Active Today</h3>
            <p className="stat-number">{isGuest ? '---' : stats?.activeToday ?? 12}</p>
          </div>
          <div className="stat-card">
            <h3>New This Week</h3>
            <p className="stat-number">{isGuest ? '---' : stats?.newThisWeek ?? 5}</p>
          </div>
        </section>

        <div className="quick-actions">
          {!isGuest && (
            <Link to="/profile" className="action-btn">
               View Profile
            </Link>
          )}
          <button className="action-btn" onClick={() => alert('Feature coming soon!')}>
            ⚙️ Settings
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
