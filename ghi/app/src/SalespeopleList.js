function SalespeopleList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {props.salespeople && props.salespeople.map(person => {
            return (
              <tr key={person.id}>
                <td>{ person.first_name }</td>
                <td>{ person.last_name }</td>
                <td>{ person.employee_id }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default SalespeopleList;
