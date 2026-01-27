import { useState, useEffect, useRef } from "react";
import {
  loadHyperswitch,
  HyperswitchProvider,
  ConnectorConfiguration,
} from "hyperswitch-control-center-embedded";
import "./App.css";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const hyperswitchInstanceRef = useRef(null);
  const [isInstanceReady, setIsInstanceReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/embedded/hyperswitch",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          const { error } = await response.json();
          console.error("An error occurred: ", error);
          setErrorMessage(error);
          return undefined;
        } else {
          const responseData = await response.json();
          const clientSecret = responseData.data?.token || responseData.token;
          return clientSecret;
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setErrorMessage(
          "Failed to connect to backend server. Make sure it is running on port 4000.",
        );
        return undefined;
      }
    };

    const instance = loadHyperswitch({
      baseUrl: "http://localhost:5000",
      theme: "light",
      fetchToken: fetchToken,
    });

    hyperswitchInstanceRef.current = instance;
    setIsInstanceReady(true);
  }, []);

  return (
    <div className="App">
        <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Payments Control Center</h1>
          </div>
          <div className="header-right" />
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
              <h2>Connector Configuration</h2>
              <p className="subtitle">
                Configure and manage your payment connectors
              </p>
            </div>

            <div className="embedded-container">
              {errorMessage && (
                <div className="error-state">
                  <div className="error-icon">⚠️</div>
                  <h3>Error Loading Component</h3>
                  <p>{errorMessage}</p>
                  <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              )}

              {!errorMessage && isInstanceReady && hyperswitchInstanceRef.current && (
                <HyperswitchProvider hyperswitchInstance={hyperswitchInstanceRef.current}>
                  <ConnectorConfiguration
                    url="https://integ.hyperswitch.io"
                  />
                </HyperswitchProvider>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
