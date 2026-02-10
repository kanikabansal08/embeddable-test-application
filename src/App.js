import { useState, useEffect, useRef } from "react";
import {
  loadHyperswitch,
  HyperswitchProvider,
  ConnectorConfiguration,
} from "hyperswitch-control-center-embedded";
import { Dashboard } from "./Dashboard";
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

  const embeddedContent =
    !errorMessage &&
    isInstanceReady &&
    hyperswitchInstanceRef.current && (
      <HyperswitchProvider hyperswitchInstance={hyperswitchInstanceRef.current}>
        <ConnectorConfiguration url="https://app.hyperswitch.io" />
      </HyperswitchProvider>
    );

  return (
    <div className="App">
      <Dashboard
        errorMessage={errorMessage}
        onRetry={() => window.location.reload()}
      >
        {embeddedContent}
      </Dashboard>
    </div>
  );
}

export default App;
