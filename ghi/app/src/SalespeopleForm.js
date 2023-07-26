import React, {useState} from 'react';

function SalespeopleForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    // set our handlechange events

    const handleFirstNameChange = (event) =>{
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }
    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(salespeopleUrl, fetchConfig);
    if (response.ok) {
        const newAuto = await response.json();
        setFirstName('');
        setLastName('');
        setEmployeeID('');
    } else if (!response.ok) {
        console.log(fetchConfig)
    }
    }
    // JSX for page
    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new salesperson</h1>
            <form onSubmit= {handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange= {handleFirstNameChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" value={firstName} />
                <label htmlFor="fabric">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleLastNameChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" value={lastName}/>
                <label htmlFor="style_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleEmployeeIDChange} placeholder="employee_id" required type="text" name= "employee_id" id="employee_id" className="form-control" value={employeeID}/>
                <label htmlFor="color">Employee id</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default SalespeopleForm;
