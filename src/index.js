import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import './index.css';
import App from './App';
import SheltersList from './components/shelters/shelters-list';
import ShelterDetails from './components/shelters/shelter-details';
import SheltersForm from './components/shelters/shelters-form';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shelters" element={<SheltersList />} /> 
        <Route path="/shelters/:id" element={<ShelterDetails />} /> 
        <Route path="shelters/form/:id" element={<SheltersForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
