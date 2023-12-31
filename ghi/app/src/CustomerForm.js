import React, {useState} from 'react';

function CustomerForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // set our handlechange events

    const handleFirstNameChange = (event) =>{
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;
        const customersUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(customersUrl, fetchConfig);
    if (response.ok) {
        const newCustomer = await response.json();
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
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
            <h1>Create a new customer</h1>
            <form onSubmit= {handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange= {handleFirstNameChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" value={firstName} />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleLastNameChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" value={lastName}/>
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleAddressChange} placeholder="address" required type="text" name= "address" id="address" className="form-control" value={address}/>
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handlePhoneNumberChange} placeholder="phone_number" required type="text" name= "phone_number" id="phone_number" className="form-control" value={phoneNumber}/>
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default CustomerForm;
