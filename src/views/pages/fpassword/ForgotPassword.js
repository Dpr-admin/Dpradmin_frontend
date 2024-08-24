import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



function ForgotPassword() {
    const [email, setEmail] = useState('');
 
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_FORGOTPASSWORD_API
    // const apiUrl = "http://localhost:5000/auth/forgotpassword"
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(apiUrl, { email })
        .then(response => {
          if(response.data.status){
            alert("check your email for reset password link")
            navigate('/login');
          }
          console.log(response.data)
          
        }).catch(err => {
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
                  <h1>Forgot Password</h1>
                
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
        
                  <CButton type="submit" color="success" className="w-100 mb-3">
                    Send
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword