
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from './page/auth/Signin';
import Signup from './page/auth/Signup';
import DashDefault from './page/dashboard/dashboard';
import BootstrapTable from './page/table/Table';

import { ToastContainer } from 'react-toastify';
import Layout from './component/Layout';

function App() {

  const userLoggedIn = localStorage.getItem('user');

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<Layout />}>
          <Route path='/dashboard' element={userLoggedIn ? <DashDefault /> : <Navigate to="/" />} />
          <Route path='/table' element={userLoggedIn ? <BootstrapTable /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
