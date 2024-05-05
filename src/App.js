import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [env, setEnv] = useState('');

  useEffect(() => {
    async function fetchEnv() {
      try {
        const response = await fetch('/api/environment');
        const envFromHeader = response.headers.get('X-Environment');
        if (envFromHeader) {
          setEnv(envFromHeader);
        } else {
          console.error('Environment header not found');
        }
      } catch (error) {
        console.error('Error fetching environment:', error);
      }
    }

    fetchEnv();
  }, []);

  return (
    <div className="app">
      <img src="reach_logo.png" alt="Reach Logo" />
      <h1>We are running in the {env ? env : 'Unknown'} env</h1>
    </div>
  );
}

export default App;
