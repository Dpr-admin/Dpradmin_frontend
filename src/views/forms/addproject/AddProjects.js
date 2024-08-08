import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
  CFormSelect
} from '@coreui/react';


const highlightsOptions = Array.from({ length: 25 }, (_, i) => ({ value: `Highlight${i + 1}`, label: `Highlight${i + 1}` }));
const amenitiesOptions = Array.from({ length: 25 }, (_, i) => ({ value: `Amenity${i + 26}`, label: `Amenity${i + 26}` }));
const locationHighlightsOptions = Array.from({ length: 25 }, (_, i) => ({ value: `LocationHighlight${i + 51}`, label: `LocationHighlight${i + 51}` }));

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#333', 
    color: '#fff', 
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#333', 
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#555', 
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff', 
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff', 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#666' : state.isFocused ? '#555' : '#333',
    color: '#fff', 
  }),
};
// get the /auth/builders and get the builder names from the backend use axios to fetch the data





const allowedCategories = [
  "apartment",
  "commercial",
  "villa",
  "villa plots",
  "farm lands",
  "open plots",
  "standalone apartments"
]; 

const AddProjects = () => {
  const [builderNames, setBuilderNames] = useState([]);



  const [formData, setFormData] = useState({
    projectname: '',
    projectlocation: '',
    projectbhk: '',
    projectprice: '',
    projectfloors: '',
    projectsquareyards: '',
    projectsquarefeet: '',
    reranumber: '',
    category: '',
    iframe: '',
    banner: null,
    buildername: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
    floorplan1: null,
    floorplan2: null,
    masterfloorplan: null,
    highlights: [],
    amenities: [],
    locationHighlights: [],
  });

  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchBuilderNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/builders');
        setBuilderNames(response.data.map(builder => builder.builderName));
      } catch (error) {
        console.error('Error fetching builder names:', error);
      }
    };
  
    fetchBuilderNames();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData({
      ...formData,
      [name]: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    // Append regular fields
    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) {
        form.append(key, value);
      } else if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value.map(option => option.value)));
      } else if (value !== null && value !== undefined) {
        form.append(key, value);
      }
    }

    form.append('batch', step);
    
    console.log(form);

    try {
      const response = await axios.post('http://localhost:5000/auth/projects', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setAlert({
          type: 'success',
          message: `Step ${step} submitted successfully!`,
        });
        if (step < 4) {
          // Clear the form fields for the next step
          setFormData((prevData) => ({
            ...prevData,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,
            image6: null,
            image7: null,
            floorplan1: null,
            floorplan2: null,
            masterfloorplan: null,
            highlights: [],
            amenities: [],
            locationHighlights: [],
          }));
          setStep(step + 1);
        } else {
          // Optionally reset form or navigate elsewhere
          // e.g., window.location.href = '/projects';
        }
      }
    } catch (error) {
      setAlert({
        type: 'danger',
        message: `Error submitting step ${step}: ${error.message}`,
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="projectname">Project Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectname"
                  id="projectname"
                  placeholder="Project Name"
                  value={formData.projectname}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="projectlocation">Project Location</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectlocation"
                  id="projectlocation"
                  placeholder="Project Location"
                  value={formData.projectlocation}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            {/* builder name select option and fetch the builder name from the backend */}
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="buildername">Builder Name</CFormLabel>
                <CFormSelect
                  name="buildername"
                  id="buildername"
                  value={formData.buildername}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Builder Name</option>
                  {builderNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              {/* add the projeect price */}
              <CCol md="6">
                <CFormLabel htmlFor="projectprice">
                  Project Price (in INR)
                </CFormLabel>
                <CFormInput
                  type="number"
                  name="projectprice"
                  id="projectprice"
                  placeholder="Project Price"
                  value={formData.projectprice}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="projectbhk">Project BHK</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectbhk"
                  id="projectbhk"
                  placeholder="Project BHK"
                  value={formData.projectbhk}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="projectfloors">Project Floors</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectfloors"
                  id="projectfloors"
                  placeholder="Project Floors"
                  value={formData.projectfloors}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="projectsquareyards">Project Square Yards</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectsquareyards"
                  id="projectsquareyards"
                  placeholder="Project Square Yards"
                  value={formData.projectsquareyards}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="projectsquarefeet">Project Square Feet</CFormLabel>
                <CFormInput
                  type="text"
                  name="projectsquarefeet"
                  id="projectsquarefeet"
                  placeholder="Project Square Feet"
                  value={formData.projectsquarefeet}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="reranumber">RERA Number</CFormLabel>
                <CFormInput
                  type="text"
                  name="reranumber"
                  id="reranumber"
                  placeholder="RERA Number"
                  value={formData.reranumber}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormSelect
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {allowedCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="banner">Banner</CFormLabel>
                <CFormInput
                  type="file"
                  name="banner"
                  id="banner"
                  onChange={handleChange}
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="image1">Image 1</CFormLabel>
                <CFormInput
                  type="file"
                  name="image1"
                  id="image1"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
                <CFormInput
                  type="file"
                  name="floorplan1"
                  id="floorplan1"
                  onChange={handleChange}
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
                <CFormInput
                  type="file"
                  name="floorplan2"
                  id="floorplan2"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
                <CFormInput
                  type="file"
                  name="masterfloorplan"
                  id="masterfloorplan"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </>
        );
      case 2:
        return (
          <>
            <h4>Project Highlights</h4>
            <CRow>
              <CCol md="12">
                <Select
                  isMulti
                  styles={customStyles}
                  name="highlights"
                  options={highlightsOptions}
                  value={formData.highlights}
                  onChange={(options) => handleMultiSelectChange(options, 'highlights')}
                  placeholder="Select Highlights"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="image2">Image 2</CFormLabel>
                <CFormInput
                  type="file"
                  name="image2"
                  id="image2"
                  onChange={handleChange}
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="image3">Image 3</CFormLabel>
                <CFormInput
                  type="file"
                  name="image3"
                  id="image3"
                  onChange={handleChange}
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="image4">Image 4</CFormLabel>
                <CFormInput
                  type="file"
                  name="image4"
                  id="image4"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </>
        );
      case 3:
        return (
          <>
            <h4>Amenities</h4>
            <CRow>
              <CCol md="12">
                <Select
                  isMulti
                  styles={customStyles}
                  name="amenities"
                  options={amenitiesOptions}
                  value={formData.amenities}
                  onChange={(options) => handleMultiSelectChange(options, 'amenities')}
                  placeholder="Select Amenities"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="image5">Image 5</CFormLabel>
                <CFormInput
                  type="file"
                  name="image5"
                  id="image5"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="image6">Image 6</CFormLabel>
                <CFormInput
                  type="file"
                  name="image6"
                  id="image6"
                  onChange={handleChange}
                />
              </CCol>
              <CCol md="6">
                <CFormLabel htmlFor="image7">Image 7</CFormLabel>
                <CFormInput
                  type="file"
                  name="image7"
                  id="image7"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </>
        );
      case 4:
        return (
          <>
            <h4>Location Highlights</h4>
            <CRow>
              <CCol md="12">
                <Select
                  isMulti
                  styles={customStyles}
                  name="locationHighlights"
                  options={locationHighlightsOptions}
                  value={formData.locationHighlights}
                  onChange={(options) => handleMultiSelectChange(options, 'locationHighlights')}
                  placeholder="Select Location Highlights"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormLabel htmlFor="iframe">Location Iframe</CFormLabel>
                <CFormInput
                  type="text"
                  name="iframe"
                  id="iframe"
                  placeholder="Location Iframe"
                  value={formData.iframe}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>Add Project - Step {step}</strong>
      </CCardHeader>
      <CCardBody>
        {alert && <CAlert color={alert.type} className="mt-3">{alert.message}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          {renderStep()}
          <CRow className="mt-4">
            <CCol md="6">
              <CButton type="submit" color="primary">
                {step < 4 ? `Next (Step ${step + 1})` : 'Submit'}
              </CButton>
            </CCol>
            {step > 1 && (
              <CCol md="6">
                <CButton
                  type="button"
                  color="secondary"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </CButton>
              </CCol>
            )}
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddProjects;
