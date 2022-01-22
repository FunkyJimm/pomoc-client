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

import Helpers from '../helpers/session-queries';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main site */}
        <Route exact path="/" element={<App />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Registration */}
        <Route path="/registration" element={<Registration />} />
        {/* Eateries */}
        <Route path="/eateries" element={Helpers.loginCheck() ? <EateriesList /> : <App />} />
        <Route path="/eateries/:id" element={Helpers.loginCheck() ? <EateryDetails /> : <App />} />
        <Route path="/eateries/form/" element={Helpers.loginCheck() ? <EateriesForm /> : <App />} />
        <Route path="/eateries/form/:id" element={Helpers.loginCheck() ? <EateriesForm /> : <App />} />
        {/* Help centers */}
        <Route path="/helpcenters" element={Helpers.loginCheck() ? <HelpCentersList /> : <App />} />
        <Route path="/helpcenters/:id" element={Helpers.loginCheck() ? <HelpCenterDetails /> : <App />} />
        <Route path="/helpcenters/form/" element={Helpers.loginCheck() ? <HelpCentersForm /> : <App />} />
        <Route path="/helpcenters/form/:id" element={Helpers.loginCheck() ? <HelpCentersForm /> : <App />} />
        {/* Informations */}
        <Route path="/informations" element={Helpers.loginCheck() ? <InformationsList /> : <App />} />
        <Route path="/informations/:id" element={Helpers.loginCheck() ? <InformationDetails /> : <App />} />
        <Route path="/informations/form/" element={Helpers.loginCheck() ? <InformationsForm /> : <App />} />
        <Route path="/informations/form/:id" element={Helpers.loginCheck() ? <InformationsForm /> : <App />} />
        {/* Shelters */}
        <Route path="/shelters" element={Helpers.loginCheck() ? <SheltersList /> : <App />} />
        <Route path="/shelters/:id" element={Helpers.loginCheck() ? <ShelterDetails /> : <App />} />
        <Route path="/shelters/form/" element={Helpers.loginCheck() ? <SheltersForm /> : <App />} />
        <Route path="/shelters/form/:id" element={Helpers.loginCheck() ? <SheltersForm /> : <App />} />
        {/* Users */}
        <Route path="/users" element={Helpers.loginCheck() ? <UsersList /> : <App />} />
        <Route path="/users/:id" element={Helpers.loginCheck() ? <UserDetails /> : <App />} />
        <Route path="/users/form/" element={Helpers.loginCheck() ? <UsersForm /> : <App />} />
        <Route path="/users/form/:id" element={Helpers.loginCheck() ? <UsersForm /> : <App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
