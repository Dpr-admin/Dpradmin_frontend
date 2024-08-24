import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react';
import axios from 'axios';

const CreateBuilder = () => {
  const [builderName, setBuilderName] = useState('');
  const [about, setAbout] = useState('');
  const [logoImage, setLogoImage] = useState(null);
  const [officeAddress, setOfficeAddress] = useState('');

  const handleFileChange = (event) => {
    setLogoImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('builderName', builderName);
    formData.append('about', about);
    formData.append('logoImage', logoImage);
    formData.append('officeAddress', officeAddress);
  const apiUrl = import.meta.env.VITE_BUILDERS_API;

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert('Builder created successfully!');
      
      }
      console.log(response);
    } catch (error) {
      console.error('Error creating Builder:', error);
      alert('Failed to create Builder');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>Create Builder</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="builderName">Builder Name</CFormLabel>
              <CFormInput
                type="text"
                id="builderName"
                value={builderName}
                onChange={(e) => setBuilderName(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="about">About</CFormLabel>
              <CFormTextarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="logoImage">Logo Image</CFormLabel>
              <CFormInput
                type="file"
                id="logoImage"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="officeAddress">Office Address</CFormLabel>
              <CFormInput
                type="text"
                id="officeAddress"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default CreateBuilder;
