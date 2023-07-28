import React, {useState, useEffect } from 'react';

function AutomobileList(props) {

  const [sales, setSales] = useState([])
  const [automobiles, setAutomobiles] = useState([])

  const fetchSales = async () => {
    const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSales(data.sales)
        }
  }

  const siftVins = []
    sales.forEach((sale) => {
      const soldVin = sale.automobile.vin;
      siftVins.push(soldVin)
    });

    // working code

    const fetchAutos = async () => {
      const url = 'http://localhost:8100/api/automobiles/';
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
          }
    }

    const updateAutos = async () => {
      automobiles.forEach((auto) => {
        if (siftVins.includes(auto.vin)) {
        auto.sold = true
        const data = auto
        const id = auto.vin
        const url = `http://localhost:8100/api/automobiles/${id}/`
        const putConfig = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            },
        };
        console.log("set to sold")
        console.log(data)

        fetch(url, putConfig);
      } else {
        auto.sold = false
        const data = auto
        const id = auto.vin
        const url = `http://localhost:8100/api/automobiles/${id}/`
        const putConfig = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            },
        };
        console.log("set to unsold")
        console.log(data)
        fetch(url, putConfig);
      }
      });

    }
    const handleRefresh = async () => {
      updateAutos();
      window.location.reload();
    }

  //   Code causes page to crash on refresh

  // props.autos.map(auto =>{
  //   if (siftVins.includes(auto.vin)) {
  //     const id = auto.id
  //     const url = `http://localhost:8100/api/automobiles/${id}/`
  //     const data = auto
  //     auto.sold = true
  //     const putConfig = {
  //       method: "put",
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         },
  //     };
  //     fetch(url, putConfig)
  //   }
  // })
  updateAutos();
  useEffect(() => {
    fetchSales();
    fetchAutos();
}, []);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Color</th>
            <th>Year</th>
            <th>Vin</th>
            <th>Sold <button onClick={() => handleRefresh()}>Force update sales</button></th>
          </tr>
        </thead>
        <tbody>
          {props.autos && props.autos.map(automobile => {
            return (
              <tr key={ automobile.id }>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.vin }</td>
                <td>{ automobile.sold.toString() }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default AutomobileList;
