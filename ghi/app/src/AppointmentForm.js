import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [dateTime, setDateTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/technicians/')
            .then(response => response.json())
            .then(data => setTechnicians(data));
    }, []);

    const handleDateTimeChange = (event) =>{
        const value = event.target.value;
        setDateTime(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value; 
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value; 
        setCustomer(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value; 
        setReason(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const data = {}; 
        data.date_time = dateTime;
        data.technician = technician; 
        data.vin = vin;
        data.customer = customer;
        data.reason = reason;
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post", 
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig); 
        if(response.ok) {
            const newAppointment = await response.json();
            setDateTime('');
            setTechnician('');
            setVin('');
            setCustomer('');
            setReason('');
        } else if (!response.ok) {
            console.log(fetchConfig)
        }

    }

    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new appointment</h1>
            <form onSubmit= {handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input onChange= {handleVinChange} placeholder="vin" required type="text" name= "vin" id="vin" className="form-control" value={vin}/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleDateTimeChange} placeholder="date_time" required type="datetime-local" name="date_time" id="date_time" className="form-control" value={dateTime} />
                <label htmlFor="date_time">Date and Time</label>
              </div>
              <div className="form-floating mb-3">
                <select onChange={handleTechnicianChange} value={technician} className="form-control" id="technician">
                  <option value="">Select a technician</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name}
                    </option>
                  ))}
                </select>
                <label htmlFor="technician">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleCustomerChange} placeholder="customer" required type="text" name= "customer" id="customer" className="form-control" value={customer}/>
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange= {handleReasonChange} placeholder="reason" required name= "reason" id="reason" className="form-control" value={reason}/>
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default AppointmentForm;