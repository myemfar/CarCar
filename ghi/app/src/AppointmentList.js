import React from 'react';

function AppointmentList(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">VIN</th>
          <th scope="col">Date and Time</th>
          <th scope="col">Technician</th>
          <th scope="col">Reason</th>
          <th scope="col">VIP</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.appointments &&
          props.appointments.map((appointment) => {
            const dateTime = new Date(appointment.date_time);
            const formattedDateTime = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{formattedDateTime}</td>
                <td>{appointment.technician}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vip ? 'Yes' : 'No'}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default AppointmentList;
            