import React, {useState, useEffect } from 'react';

function CarModelForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    // set our handlechange events

    const handleManufacturerChange = (event) =>{
        const value = event.target.value;
        setManufacturer(value);
    }
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handlePictureURLChange = (event) => {
        const value = event.target.value;
        setPictureURL(value);
    }

    // fetch data to populate pulldown menus (if applicable)
    const fetchManufacturers = async () => {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers)
      }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = pictureURL;
        data.manufacturer_id = manufacturer;
        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
        const newModel = await response.json();
        setName('');
        setManufacturer('');
        setPictureURL('');
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
            <h1>Create a new Model</h1>
            <form onSubmit= {handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input onChange= {handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" value={name} />
                <label htmlFor="name">name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handlePictureURLChange} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control" value={pictureURL}/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select onChange= {handleManufacturerChange} required id="manufacturer" name= "manufacturer" className="form-select" value={manufacturer}>
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
}

export default CarModelForm;
