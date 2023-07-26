import React, {useState} from 'react';

function AppointmentForm( ) {
    const [dateTime, setDateTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [vip, setVip] = useState(false);
    const [vin, setVin] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('PENDING'); 
    const[customer, setCustomer] = useState('');

    const handleDateTimeChange = (event) =>{
        const value = event.target.value;
        setDateTime(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleVipChange = (event) => {
        const value = event.target.value; 
        setVip(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value; 
        setVin(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value; 
        setReason(value);
    }

    const handleStatusChange = (event) => {
        const value = event.target.value; 
        setStatus(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value; 
        setCustomer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const data = {}; 
        data.date_time = dateTime;
        data.technician = technician; 
        data.vip = vip;
        data.vin = vin;
        data.reason = reason;
        data.status = status;
        data.customer = customer;
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            mothod: "post", 
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
            setVip(false);
            setVin('');
            setReason('');
            setStatus('PENDING');
            setCustomer('');
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
                <input onChange= {handleDateTimeChange} placeholder="date_time" required type="datetime-local" name="date_time" id="date_time" className="form-control" value={dateTime} />
                <label htmlFor="date_time">Date and Time</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleTechnicianChange} placeholder="technician" required type="text" name="technician" id="technician" className="form-control" value={technician}/>
                <label htmlFor="technician">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleVipChange} placeholder="vip" type="checkbox" name= "vip" id="vip" className="form-control" checked={vip}/>
                <label htmlFor="vip">VIP</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleVinChange} placeholder="vin" required type="text" name= "vin" id="vin" className="form-control" value={vin}/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange= {handleReasonChange} placeholder="reason" required name= "reason" id="reason" className="form-control" value={reason}/>
                <label htmlFor="reason">Reason</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleStatusChange} placeholder="status" required type="text" name= "status" id="status" className="form-control" value={status}/>
                <label htmlFor="status">Status</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleCustomerChange} placeholder="customer" required type="text" name= "customer" id="customer" className="form-control" value={customer}/>
                <label htmlFor="customer">Customer</label>
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
