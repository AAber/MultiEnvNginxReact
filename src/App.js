import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <h1>We are running in the <code>{env ? env : 'Unknown'}</code> env</h1>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="app">
      </div>
    </div>
  );
}

export default App;

