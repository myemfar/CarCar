function CustomerList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {props.customers && props.customers.map(person => {
            return (
              <tr key={person.id}>
                <td>{ person.first_name }</td>
                <td>{ person.last_name }</td>
                <td>{ person.address }</td>
                <td>{ person.phone_number }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default CustomerList;
