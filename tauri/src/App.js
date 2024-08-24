
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from './page/auth/Signin';
import Signup from './page/auth/Signup';
import DashDefault from './page/dashboard/dashboard';
import BootstrapTable from './page/table/Table';

import { ToastContainer } from 'react-toastify';
import Layout from './component/Layout';
import Location from './page/location';
import ProductsDemo from './page/try';
// import { useContext } from 'react';
// import { AuthContext } from './context/ConfigContext';

function App() {

  // const userLoggedIn = localStorage.getItem('user');

  // const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/location' element={<Location/>} /> */}

        <Route element={<Layout />}>
          {/* <Route path='/dashboard' element={userLoggedIn || isAuthenticated ? <DashDefault /> : <Navigate to="/" />} />
          <Route path='/table' element={userLoggedIn || isAuthenticated ? <BootstrapTable /> : <Navigate to="/" />} /> */}

          <Route path='/dashboard' element={<DashDefault />} />
          <Route path='/table' element={<BootstrapTable />} />
          <Route path='/try' element={<ProductsDemo/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
