import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a parent component that will hold the shared state
function LoadData() {
  const [manufacturersData, setManufacturersData] = useState(null);
  const [automobilesData, setAutomobilesData] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [salespeopleData, setSalespeopleData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [salesData, setSalesData] = useState(null);

  // Define each function and api call
  async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      setManufacturersData(data.manufacturers);
    } else {
      console.error(response);
    }
  }

  async function loadAutomobiles() {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      setAutomobilesData(data.autos);
    } else {
      console.error(response);
    }
  }

  async function loadModels() {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const data = await response.json();
      setModelData(data.models);
    } else {
      console.error(response);
    }
  }

  async function loadSalespeople() {
    const response = await fetch ('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      console.log(data.salespeople)
      setSalespeopleData(data.salespeople);
    } else {
      console.error(response);
    }
  }

  async function loadCustomers() {
    const response = await fetch ('http://localhost:8090/api/customers/');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      console.log(data.customers)
      setCustomerData(data.customers);
    } else {
      console.error(response);
    }
  }

  async function loadSales() {
    const response = await fetch ('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      console.log(data.sales)
      setSalesData(data.sales);
    } else {
      console.error(response);
    }
  }

  // Call all functions here
  React.useEffect(() => {
    loadManufacturers();
    loadAutomobiles();
    loadModels();
    loadSalespeople();
    loadCustomers();
    loadSales();
  }, []);

  // Add here for each set of data
  return (
    <React.StrictMode>
      <App manufacturers={manufacturersData} autos={automobilesData} models={modelData} salespeople={salespeopleData}
      customers={customerData} sales={salesData}
      />
    </React.StrictMode>
  );
}

// Render the ParentComponent instead of directly rendering App
root.render(<LoadData />);
