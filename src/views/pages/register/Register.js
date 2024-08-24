import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl= import.meta.env.VITE_REGISTER_API;
    axios.post(apiUrl, { username, email, password })
      .then(response => {
        if (response.data.status) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Registration error:', err);
        // Handle error: show error message to the user
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
                  <h1>Register</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      Username
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      Email
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      Password
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <CButton type="submit" color="success" className="w-100 mb-3">
                    Create Account
                  </CButton>
                  <Link to="/login">
                    <CButton type="button" color="link" className="w-100">
                      Already have an account? Login
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

export default Register;
