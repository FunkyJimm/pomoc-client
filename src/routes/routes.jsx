import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../App';

import Login from '../components/login/login';
import Registration from '../components/registration/registration';

import EateriesList from '../components/eateries/eateries-list';
import EateriesForm from '../components/eateries/eateries-form';
import EateryDetails from '../components/eateries/eatery-details';

import HelpCentersList from '../components/help-centers/help-centers-list';
import HelpCentersForm from '../components/help-centers/help-centers-form';
import HelpCenterDetails from '../components/help-centers/help-center-details';

import InformationsList from '../components/informations/informations-list';
import InformationsForm from '../components/informations/informations-form';
import InformationDetails from '../components/informations/information-details';

import SheltersList from '../components/shelters/shelters-list';
import SheltersForm from '../components/shelters/shelters-form';
import ShelterDetails from '../components/shelters/shelter-details';

import UsersList from '../components/users/users-list';
import UsersForm from '../components/users/users-form';
import UserDetails from '../components/users/user-details';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main site */}
        <Route path="/" element={<App />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Registration */}
        <Route path="/registration" element={<Registration />} />
        {/* Eateries */}
        <Route path="/eateries" element={<EateriesList />} />
        <Route path="/eatery/:id" element={<EateryDetails />} />
        <Route path="/eateries/form/" element={<EateriesForm />} />
        <Route path="/eateries/form/:id" element={<EateriesForm />} />
        {/* Help centers */}
        <Route path="/helpcenters" element={<HelpCentersList />} />
        <Route path="/helpcenter/:id" element={<HelpCenterDetails />} />
        <Route path="/helpcenters/form/" element={<HelpCentersForm />} />
        <Route path="/helpcenters/form/:id" element={<HelpCentersForm />} />
        {/* Informations */}
        <Route path="/informations" element={<InformationsList />} />
        <Route path="/information/:id" element={<InformationDetails />} />
        <Route path="/informations/form/" element={<InformationsForm />} />
        <Route path="/informations/form/:id" element={<InformationsForm />} />
        {/* Shelters */}
        <Route path="/shelters" element={<SheltersList />} />
        <Route path="/shelter/:id" element={<ShelterDetails />} />
        <Route path="/shelters/form/" element={<SheltersForm />} />
        <Route path="/shelters/form/:id" element={<SheltersForm />} />
        {/* Users */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/users/form/" element={<UsersForm />} />
        <Route path="/users/form/:id" element={<UsersForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
