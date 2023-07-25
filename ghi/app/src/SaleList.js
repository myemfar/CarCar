function SalesList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>Car vin sold</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {props.sales && props.sales.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.price }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default SalesList;
