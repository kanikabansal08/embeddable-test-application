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
          {/* <MetricsSection /> */}

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


