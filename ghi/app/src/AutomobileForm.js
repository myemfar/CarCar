import React, {useState, useEffect } from 'react';

function AutomobileForm( ) {
    // set our useStates for each property on the form
    // pulldowns require 2x usestates, one for the field and one for pulldown

    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [vin, setVin] = useState('');
    const [year, setYear] = useState('');

    // set our handlechange events

    const handleModelChange = (event) =>{
        const value = event.target.value;
        setModel(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    // fetch data to populate pulldown menus (if applicable)
    const fetchModels = async () => {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models)
      }
    }

    useEffect(() => {
        fetchModels();
    }, []);

    // what to do on submit (populate data, send to api)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.model_id = model;
        data.vin = vin;
        data.year = year;
        data.color = color;
        const autosUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    // reset form after response is recieved
    const response = await fetch(autosUrl, fetchConfig);
    if (response.ok) {
        const newAuto = await response.json();
        setYear('');
        setColor('');
        setModel('');
        setVin('');
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
            <h1>Create a new car</h1>
            <form onSubmit= {handleSubmit} id="create-car-form">
              <div className="form-floating mb-3">
                <input onChange= {handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" value={vin} />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" value={year}/>
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange= {handleColorChange} placeholder="Color" required type="text" name= "color" id="color" className="form-control" value={color}/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="mb-3">
                <select onChange= {handleModelChange} required id="model" name= "model" className="form-select" value={model}>
                  <option value="">Choose a model</option>
                  {models.map(model => {
                    return (
                        <option key={model.id} value={model.id}>
                            {model.manufacturer.name} {model.name}
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

export default AutomobileForm;
