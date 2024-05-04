// App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [environment, setEnvironment] = useState('');

  useEffect(() => {
    fetch('/api/environment')
      .then(response => response.json())
      .then(data => {
        setEnvironment(data.environment);
      })
      .catch(error => console.error('Error fetching environment:', error));
  }, []);

  return (
    <div>
      <h1>Multi-Environment React App</h1>
      <p>Environment: {environment}</p>
    </div>
  );
};

export default App;

