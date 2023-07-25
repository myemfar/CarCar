import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a parent component that will hold the shared state
function LoadData() {
  const [manufacturersData, setManufacturersData] = useState(null);
  const [automobilesData, setAutomobilesData] = useState(null);
  const [modelData, setModelData] = useState(null);


  // Define each function and api call
  async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setManufacturersData(data.manufacturers);
    } else {
      console.error(response);
    }
  }

  async function loadAutomobiles() {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAutomobilesData(data.autos);
    } else {
      console.error(response);
    }
  }

  async function loadModels() {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setModelData(data.models);
    } else {
      console.error(response);
    }
  }

  // Call all functions here
  React.useEffect(() => {
    loadManufacturers();
    loadAutomobiles();
    loadModels();
  }, []);

  // Add here for each set of data
  return (
    <React.StrictMode>
      <App manufacturers={manufacturersData} autos={automobilesData} models={modelData}/>
    </React.StrictMode>
  );
}

// Render the ParentComponent instead of directly rendering App
root.render(<LoadData />);
