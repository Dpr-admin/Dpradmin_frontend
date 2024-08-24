import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



function ResetPassword() {
    const [password, setPassword] = useState('');
    const { token } = useParams()
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_RESETPASSWORD_API;
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`${apiUrl}/${token}` , { password })
        .then(response => {
          if(response.data.status){
            navigate('/login');
          }
          console.log(response.data)
        })
        .catch(err => {
          console.log(err);
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
                  <h1>Reset Password</h1>
                
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      New Password
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
                    Reset
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

export default ResetPassword