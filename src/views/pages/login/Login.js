import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // Add state for handling login errors

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_LOGIN_API;
    axios.post(apiUrl,{ email, password })
      .then(response => {
        if (response.data.token) {
          // Set token in localStorage
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard'); // Redirect to dashboard after successful login
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        setLoginError('Invalid email or password.'); // Set login error message
      });
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Login</h1>
                  {loginError && <p className="text-danger">{loginError}</p>} {/* Display login error */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CButton type="submit" color="primary" className="w-100">
                    Login
                  </CButton>
                  <Link to="/register" className="mt-3 d-block text-center">
                    <CButton type="button" color="link">
                      Don't have an account? Get Registered
                    </CButton>
                  </Link>
                  <Link to="/forgotpassword" className="mt-3 d-block text-center">
                    <CButton type="button" color="link">
                      Forgot Password?
                    </CButton>
                  </Link>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
