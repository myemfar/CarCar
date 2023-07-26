function AppointmentList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date and Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>VIP</th>
            <th>Status</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>
          {props.appointments && props.appointments.map(appointment => {
            return (
                <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{new Date(appointment.date_time). toLocaleString()}</td>
                    <td>{appointment.technician}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.vip}</td>
                    <td>{appointment.status}</td>

                </tr>
            );
            })}
        </tbody>
        </table>
    );

        }
export default AppointmentList; 

            