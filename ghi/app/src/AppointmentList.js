function AppointmentList(props) {
  const handleChangeStatus = async (appointment) => {
    const appointmentUrl = `http://localhost:8080/api/appointments/${appointment}/cancel/`;
    const fetchConfig = {
      method: "put",
      body: null, 
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(appointmentUrl, fetchConfig);
    window.location.reload();
  };

  const handleFinishAppointment = async (appointment) => {
    const appointmentUrl = `http://localhost:8080/api/appointments/${appointment}/finish/`;
    const fetchConfig = {
      method: "put",
      body: null, 
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(appointmentUrl, fetchConfig);
    window.location.reload();
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Date and Time</th>
          <th>Reason</th>
          <th>Technician</th>
          <th>VIN</th>
          <th>VIP</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.appointments &&
          props.appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.customer}</td>
                <td>{new Date(appointment.date_time).toLocaleString()}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.technician.first_name}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.vip.toString()}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={()=> handleChangeStatus(appointment.id)}>Change Status</button>
                </td>
                <td>
                  <button onClick={()=> handleFinishAppointment(appointment.id)}>Finish Appointment</button> 
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default AppointmentList;