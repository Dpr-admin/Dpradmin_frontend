import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

import Register from './views/pages/register/Register';
import Login from './views/pages/login/Login';
import ForgotPassword from './views/pages/fpassword/ForgotPassword';
import ResetPassword from './views/pages/resetpassword/ResetPassword';
import DefaultLayout from './layout/DefaultLayout';
import { Protected } from './protected';
import UpdateProject from './views/forms/update-project/UpdateProject';

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/ForgotPassword" name="ForgotPassword Page" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword/:token" name="ResetPassword Page" element={<ResetPassword />} />
          <Route path="/dashboard/*" element={<Protected element={DefaultLayout} />} />
          <Route path="/update-project/:projectId" element={<UpdateProject />} />
          <Route path="*" name="Register" element={<Register />} />
        </Routes>
          
          

      </Suspense>
    </BrowserRouter>
  );
};

export default App;
