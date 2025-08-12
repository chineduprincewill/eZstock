import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DefaultLayout from './protected/layout/DefaultLayout'
import PrivateRoute from './protected/layout/PrivateRoute'
import Dashboard from './protected/dashboard/Dashboard'
import AppContextProvider from "./context/AppContext";
import 'leaflet/dist/leaflet.css';
import Login from "./public/login/Login";
import Registrations from "./protected/registrations/Registrations";
import Users from "./protected/users/Users";
import Settings from "./protected/settings/Settings";
import Warehouse from "./protected/warehouse/Warehouse";
import Requests from "./protected/requests/Requests";
import Dispatches from "./protected/dispatches/Dispatches";

function App() {

  const url = window.location.href;
  const tokenval = url.split('#')[1];
  tokenval && localStorage.setItem('token', tokenval);
  
  return (
    <div className={`w-full `}>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/registrations" element={<PrivateRoute><Registrations /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
              <Route path="/warehouse" element={<PrivateRoute><Warehouse /></PrivateRoute>} />
              <Route path="/requests" element={<PrivateRoute><Requests /></PrivateRoute>} />
              <Route path="/dispatches" element={<PrivateRoute><Dispatches /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </AppContextProvider>
    </div>
  )
}

export default App
