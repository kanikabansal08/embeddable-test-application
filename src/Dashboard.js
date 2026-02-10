import { useState, useEffect } from "react";

// Top dashboard metrics with 6–8s loading delay.
function MetricsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // ~5s delay like the reference

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="metrics-grid">
      {isLoading ? (
        <>
          <div className="metric-card skeleton">
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line tiny" />
          </div>
          <div className="metric-card skeleton">
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line tiny" />
          </div>
          <div className="metric-card skeleton">
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line tiny" />
          </div>
          <div className="metric-card skeleton">
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line tiny" />
          </div>
        </>
      ) : (
        <>
          <div className="metric-card">
            <div className="metric-label">Total Components</div>
            <div className="metric-value">12</div>
            <div className="metric-subvalue positive">+2 this month</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Active Embeds</div>
            <div className="metric-value">48</div>
            <div className="metric-subvalue positive">+8 this week</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Views</div>
            <div className="metric-value">1.2K</div>
            <div className="metric-subvalue positive">+124 today</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Performance</div>
            <div className="metric-value">98%</div>
            <div className="metric-subvalue">Uptime status</div>
          </div>
        </>
      )}
    </div>
  );
}

// Full dashboard layout shell. It takes the embedded component as children.
export function Dashboard({ children, errorMessage, onRetry }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="app-logo-mark">
            <span className="app-logo-square" />
            <span className="app-logo-square" />
            <span className="app-logo-square" />
            <span className="app-logo-square" />
          </div>
          <span className="app-title">Embeddable Components</span>
        </div>
        <div className="header-right">
          <span className="header-user-name">Demo User</span>
          <div className="header-avatar">DU</div>
          <button className="header-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <div className="nav-item active">
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Connector Config</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💳</span>
              <span className="nav-text">Payments</span>
            </div>
          </nav>
        </aside>

        <main className="main-content">
          <div className="content-header">
            <h2>Payment Configuration Dashboard</h2>
            <p className="subtitle">
              Manage your payment connectors and embeddable components
            </p>
          </div>

          {/* Top metric cards */}
          <MetricsSection />

          <div className="section-header">
            <h3>Connector Configuration</h3>
            <p>Configure your payment connectors and settings</p>
          </div>

          <div className="embedded-container">
            {errorMessage ? (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Error Loading Component</h3>
                <p>{errorMessage}</p>
                <button className="retry-button" onClick={onRetry}>
                  Retry
                </button>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


