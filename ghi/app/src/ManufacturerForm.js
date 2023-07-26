import React, {useState} from 'react';

function ManufacturerForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [name, setName] = useState('');

    // set our handlechange events

    const handleNameChange = (event) =>{
        const value = event.target.value;
        setName(value);
    }

    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
        const newManufacturer = await response.json();
        setName('');
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
            <h1>Create a new manufacturer</h1>
            <form onSubmit= {handleSubmit} id="create-car-form">
              <div className="form-floating mb-3">
                <input onChange= {handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default ManufacturerForm;
