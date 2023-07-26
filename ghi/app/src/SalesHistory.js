import React, {useState, useEffect } from 'react';

function SalesHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [sales, setSales] = useState([]);

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSalespeople(data.salespeople)
        }
      }

    const fetchSales = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSales(data.sales)
        }
      }

    useEffect(() => {
        fetchSales();
        fetchSalespeople();
    }, []);

    const filteredSales = () => {
        return sales.filter((p) =>
            p.salesperson.employee_id === salesperson
        );
    }
    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Sales History</h1>
              <div className="mb-3">
                <select onChange= {handleSalespersonChange} required id="salesperson" name= "salesperson" className="form-select" value={salesperson}>
                  <option value="">Choose a salesperson</option>
                  {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    );
                  })}
                </select>
              </div>
          </div>
        </div>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Car vin sold</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
            {filteredSales().map(sale => {
                return (
                <tr key={sale.id}>
                    <td>{ sale.customer.first_name }{ sale.customer.last_name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>
                    </tr>
                    );
          })}
          </tbody>
      </table>
      </>);
}

export default SalesHistory;
