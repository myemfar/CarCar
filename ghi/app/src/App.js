import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ModelList from './ModelList';
import AutomobileList from './AutomobileList';
import TechnicianList from './TechnicianList';
import AppointmentList from './AppointmentList';
import SalesList from './SaleList';
import CustomerList from './CustomerList';
import SalespeopleList from './SalespeopleList';
// import ManufacturerForm from './ManufacturerForm';
// import ModelsForm from './ModelsForm';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import SaleForm from './SaleForm';
import CustomerForm from './CustomerForm';
import SalespeopleForm from './SalespeopleForm';
// import SalesHistory from './SalesHistory';

function App(props) {
  // if (props.manufacturers === undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="manufacturers">
            <Route path="list" element={<ManufacturerList manufacturers ={props.manufacturers} />} />
            {/* <Route path="new" element={<ManufacturerForm />} /> */}
          </Route>
          <Route path="models">
            <Route path="list" element={<ModelList models ={props.models} />} />
            {/* <Route path="new" element={<ModelsForm />} /> */}
          </Route>
          <Route path="automobiles">
            <Route path="list" element={<AutomobileList autos ={props.autos} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="technicians">
            <Route path="list" element={<TechnicianList technicians ={props.technicians} />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="history" element={<AppointmentList appointments ={props.appointments} />} />
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="sales">
            <Route path="list" element={<SalesList sales ={props.sales} />} />
            <Route path="new" element={<SaleForm />} />
            {/* <Route path="history" element={<SalesHistory sales ={props.sales} salespeople={props.salespeople} />} /> */}
          </Route>
          <Route path="customers">
            <Route path="list" element={<CustomerList customers ={props.customers} />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="list" element={<SalespeopleList salespeople ={props.salespeople} />} />
            <Route path="new" element={<SalespeopleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
