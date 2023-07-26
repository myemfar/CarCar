import React, {useState, useEffect } from 'react';

function SaleForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    // set our handlechange events

    const handleAutomobileChange = (event) =>{
        const value = event.target.value;
        setAutomobile(value);
    }
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    // fetch data to populate pulldown menus (if applicable)
    const fetchAutomobiles = async () => {
      const url = 'http://localhost:8100/api/automobiles/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos)
      }
    }

    const fetchSalespeople = async () => {
      const url = 'http://localhost:8090/api/salespeople/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople)
      }
    }

    const fetchCustomers = async () => {
      const url = 'http://localhost:8090/api/customers/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers)
      }
    }

    useEffect(() => {
        fetchAutomobiles();
        fetchSalespeople();
        fetchCustomers();
    }, []);

    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = automobile;
        // may need to fuss with this to get the automobile VO ID to send instead
        // could alter the submission to take vin instead
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(salesUrl, fetchConfig);
    if (response.ok) {
        const newAuto = await response.json();
        setAutomobile('');
        setSalesperson('');
        setPrice('');
        setCustomer('');
    } else if (!response.ok) {
        console.log('response not ok, fetchconfig below:')
        console.log(fetchConfig)
    }
    }
    // JSX for page
    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sale</h1>
            <form onSubmit= {handleSubmit} id="create-sale-form">
              <div className="mb-3">
                <select onChange= {handleAutomobileChange} required id="automobile" name= "automobile" className="form-select" value={automobile}>
                  <option value="">Choose an automobile</option>
                  {automobiles.map(automobile => {
                    return (
                        <option key={automobile.id} value={automobile.vin}>
                            {automobile.year} {automobile.model.manufacturer.name} {automobile.model.name}, VIN:{automobile.vin}
                        </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange= {handleSalespersonChange} required id="salesperson" name= "salesperson" className="form-select" value={salesperson}>
                  <option value="">Choose a salesperson</option>
                  {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange= {handleCustomerChange} required id="customer" name= "customer" className="form-select" value={customer}>
                  <option value="">Choose a customer</option>
                  {customers.map(customer => {
                    return (
                        <option key={customer.id} value={customer.id}>
                            {customer.first_name} {customer.last_name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handlePriceChange} placeholder="Price" required type="number" name= "price" id="price" className="form-control" value={price}/>
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default SaleForm;
