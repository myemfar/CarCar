// note: old index.js file kept in case the new version combining all functions into
// a single main function is not considered a good way to solve the problem


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// async function loadManufacturers() {
//   const response = await fetch('http://localhost:8100/api/manufacturers/');
//   if (response.ok) {
//     const data = await response.json();
//     console.log(data)
//     root.render(
//       <React.StrictMode>
//         <App manufacturers={data.manufacturers} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(response);
//   }
// }

// async function loadAutomobiles() {
//   const response = await fetch('http://localhost:8100/api/automobiles/');
//   if (response.ok) {
//     const data = await response.json();
//     console.log(data)
//     root.render(
//       <React.StrictMode>
//         <App autos={data.autos} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(response);
//   }
// }
// loadAutomobiles();
// loadManufacturers();
