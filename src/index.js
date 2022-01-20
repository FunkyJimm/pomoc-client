import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import './index.css';
import App from './App';
import SheltersList from './components/shelters/shelters-list';
import ShelterDetails from './components/shelters/shelter-details';
import SheltersForm from './components/shelters/shelters-form';
import EateryList from '../src/components/eateries/eateries-list';
import EateryDetails from '../src/components/eateries/eatery-details';
import EateriesForm from '../src/components/eateries/eateries-form';
import HelpCenterList from '../src/components/help-centers/help-centers-list';
import HelpCenterDetails from '../src/components/help-centers/help-center-details';
import HelpCentersForm from '../src/components/help-centers/help-centers-form';
import InformationList from '../src/components/informations/informations-list';
import InformationDetails from '../src/components/informations/information-details';
import InformationsForm from '../src/components/informations/informations-form';
import UserList from '../src/components/users/users-list';
import UserDetails from '../src/components/users/user-details';
import UsersForm from '../src/components/users/users-form';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shelters" element={<SheltersList />} /> 
        <Route path="/shelters/:id" element={<ShelterDetails />} /> 
        <Route path="/shelters/form/" element={<SheltersForm />} />
        <Route path="/shelters/form/:id" element={<SheltersForm />} />
        <Route path="/eateries" element={<EateryList />} /> 
        <Route path="/eatery/:id" element={<EateryDetails />} /> 
        <Route path="/eatery/form/:id" element={<EateriesForm />} />
        <Route path="/helpcenters" element={<HelpCenterList />} /> 
        <Route path="/helpcenters/:id" element={<HelpCenterDetails />} /> 
        <Route path="/helpcenters/form/" element={<HelpCentersForm />} />
        <Route path="/helpcenters/form/:id" element={<HelpCentersForm />} />
        <Route path="/informations" element={<InformationList />} /> 
        <Route path="/informations/:id" element={<InformationDetails />} /> 
        <Route path="/informations/form/" element={<InformationsForm />} />
        <Route path="/informations/form/:id" element={<InformationsForm />} />
        <Route path="/users" element={<UserList />} /> 
        <Route path="/users/:id" element={<UserDetails />} /> 
        <Route path="/users/form/" element={<UsersForm />} />
        <Route path="/users/form/:id" element={<UsersForm />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
