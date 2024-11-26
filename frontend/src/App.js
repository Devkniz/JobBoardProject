import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Global.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import AllOffers from './pages/AllOffers';
import SingleOffer from './pages/SingleOffer';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdvertisementsPanel from './pages/Admin/AdvertisementsPanel';
import CompaniesPanel from './pages/Admin/CompaniesPanel';
import UsersPanel from './pages/Admin/UsersPanel';
import ApplicationsPanel from './pages/Admin/ApplicationsPanel';
import ApplicationsCommunicationsPanel from './pages/Admin/ApplicationsCommunicationPanel ';
import Forbidden from './pages/Forbidden';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import AdvertisementsResult from './pages/AdvertisementsResult';
import Admin from './pages/Admin/Admin';
import MyApplications from './pages/MyApplications';
import Footer from './components/Footer';

function App() {
  return (
    <div id='pageroot'>
    <Header/>
    <main>
    <Routes>
        <Route index element={<Home />} />

        <Route path='advertisements/' element={<Navigate to="/advertisements/1" />} />
        <Route path='advertisements/:page' element={<AllOffers />} />
        <Route path='advertisements/offer/:id' element={<SingleOffer />} />

        <Route path='login'>
          <Route index element={<Login />} />
        </Route>

        <Route path='signup'>
          <Route index element={<SignUp />} />
        </Route>

        <Route path='profile'>
          <Route index element={<Profile />} />
        </Route>

        <Route path='advertisements/result'>
          <Route index element={<AdvertisementsResult/>}/>
        </Route>

        <Route path='myapplications' element={
              <ProtectedRoute requiredRole='user'>
                <MyApplications />
              </ProtectedRoute>
            } />

        <Route path='admin'>
          <Route index element={
              <ProtectedRoute requiredRole='admin'>
                <Admin />
              </ProtectedRoute>
            } />
          <Route path='advertisements' element={
              <ProtectedRoute requiredRole='admin'>
                <AdvertisementsPanel />
              </ProtectedRoute>
            } />
          <Route path='companies' element={
              <ProtectedRoute requiredRole='admin'>
                <CompaniesPanel />
              </ProtectedRoute>
            } />
          <Route path='users' element={
              <ProtectedRoute requiredRole='admin'>
                <UsersPanel />
              </ProtectedRoute>
            } />
            <Route path='applications' element={
              <ProtectedRoute requiredRole='admin'>
                <ApplicationsPanel />
              </ProtectedRoute>
            } />
            <Route path='applications/communications' element={
              <ProtectedRoute requiredRole='admin'>
                <ApplicationsCommunicationsPanel />
              </ProtectedRoute>
            } />
        </Route>

        <Route path='forbidden'>
          <Route index element={<Forbidden />} />
        </Route>
      <Route path='*' element={<><NotFound /></>}></Route>
    </Routes>
    </main>
    <Footer />
    </div>
  );
}

export default App;
