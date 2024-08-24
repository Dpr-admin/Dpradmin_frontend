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
import {
  ApartmentHighlights,
  ApartmentAmenities,
  ApartmentLocationHighlights,
  VillaHighlights,
  VillaAmenities,
  VillaLocationHighlights,
  CommercialHighlights,
  CommercialAmenities,
  CommercialLocationHighlights,
  PlotHighlights,
  PlotAmenities,
  PlotLocationHighlights
} from './options';

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

const allowedCategories = [
  "apartment",
  "commercial",
  "villa",
  "plots",
];

const AddProjects = () => {
  const [builderNames, setBuilderNames] = useState([]);
  const [formData, setFormData] = useState({
    projectname: '',
    projectlocation: '',
    projectimage: null,
    projectlogo: null,
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
  const [alert, setAlert] = useState(null);

  const [highlightsOptions, setHighlightsOptions] = useState([]);
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [locationHighlightsOptions, setLocationHighlightsOptions] = useState([]);
  
  const apiUrl1 = import.meta.env.VITE_BUILDERS_API;
  const apiUrl = import.meta.env.VITE_PROJECTS_API;

  useEffect(() => {
    const fetchBuilderNames = async () => {
      try {
        const response = await axios.get(apiUrl1);
        setBuilderNames(response.data.map(builder => builder.builderName));
      } catch (error) {
        console.error('Error fetching builder names:', error);
      }
    };
    fetchBuilderNames();
  }, []);

  useEffect(() => {
    switch (formData.category) {
      case 'apartment':
        setHighlightsOptions(ApartmentHighlights);
        setAmenitiesOptions(ApartmentAmenities);
        setLocationHighlightsOptions(ApartmentLocationHighlights);
        break;
      case 'villa':
        setHighlightsOptions(VillaHighlights);
        setAmenitiesOptions(VillaAmenities);
        setLocationHighlightsOptions(VillaLocationHighlights);
        break;
      case 'commercial':
        setHighlightsOptions(CommercialHighlights);
        setAmenitiesOptions(CommercialAmenities);
        setLocationHighlightsOptions(CommercialLocationHighlights);
        break;
      case 'plots':
        setHighlightsOptions(PlotHighlights);
        setAmenitiesOptions(PlotAmenities);
        setLocationHighlightsOptions(PlotLocationHighlights);
        break;
      default:
        setHighlightsOptions([]);
        setAmenitiesOptions([]);
        setLocationHighlightsOptions([]);
    }
  }, [formData.category]);

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

    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) {
        form.append(key, value);
      } else if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value.map(option => option.value)));
      } else if (value !== null && value !== undefined) {
        form.append(key, value);
      }
    }

    try {
      const response = await axios.post(apiUrl, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setAlert({
          type: 'success',
          message: 'Project added successfully!',
        });
        // Reset form fields after successful submission
        setFormData({
          projectname: '',
          projectlocation: '',
          projectimage: null,
          projectlogo: null,
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
      }
    } catch (error) {
      setAlert({
        type: 'danger',
        message: `Error adding project: ${error.message}`,
      });
    }
  };


  return (
    <CCard>
      <CCardHeader>
        <strong>Add Project</strong>
      </CCardHeader>
      <CCardBody>
        {alert && <CAlert color={alert.type} className="mt-3">{alert.message}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-4">
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

            
          </CRow>
         
          <CRow className="mb-4">
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
            </CRow>
            <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="projectprice">Project Price (in INR)</CFormLabel>
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
                {allowedCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
            
          <CRow className="mb-4">
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
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="projectsquareyards">Project Area</CFormLabel>
              <CFormInput
                type="text"
                name="projectsquareyards"
                id="projectsquareyards"
                placeholder="Project Area"
                value={formData.projectsquareyards}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="projectsquarefeet">Sizes</CFormLabel>
              <CFormInput
                type="text"
                name="projectsquarefeet"
                id="projectsquarefeet"
                placeholder="Sizes"
                value={formData.projectsquarefeet}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
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
              <CFormLabel htmlFor="iframe">IFrame</CFormLabel>
              <CFormInput
                type="text"
                name="iframe"
                id="iframe"
                placeholder="iFrame"
                value={formData.iframe}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            
            <CCol md="6">
              <CFormLabel htmlFor="banner">Banner Image</CFormLabel>
              <CFormInput
                type="file"
                name="banner"
                id="banner"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="image1">Project Image</CFormLabel>
              <CFormInput
                type="file"
                name="image1"
                id="image1"
                onChange={handleChange}
                required
              />
            </CCol>
          
            <CCol md="6">
              <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
              <CFormInput
                type="file"
                name="floorplan1"
                id="floorplan1"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
              <CFormInput
                type="file"
                name="floorplan2"
                id="floorplan2"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
              <CFormInput
                type="file"
                name="masterfloorplan"
                id="masterfloorplan"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          <div
  className="mb-3"
  style={{
    margin: "20px 0",
    padding: '15px',
    borderRadius: '10px',
    color: '#fff',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
    width: '100%', // Set width to 100% to match the width of the container
    maxWidth: '100%', // Ensure it doesn't exceed the container width
  }}
>
  <CRow className="mb-4">
    {/* Project Logo */}
    <CCol md="6">
      <CFormLabel htmlFor="projectlogo">
        Project Logo
      </CFormLabel>
      <CFormInput
        type="file"
        name="projectlogo"
        id="projectlogo"
        onChange={handleChange}
        required
      />
    </CCol>

    {/* Project Image */}
    <CCol md="6">
      <CFormLabel htmlFor="projectimage">
        Project Image
      </CFormLabel>
      <CFormInput
        type="file"
        name="projectimage"
        id="projectimage"
        onChange={handleChange}
        required
      />
    </CCol>
  </CRow>
</div>




          <CRow className="mb-4">
            <CCol md="12">
              <CFormLabel htmlFor="highlights">Highlights</CFormLabel>
              <Select
                isMulti
                options={highlightsOptions}
                value={formData.highlights}
                onChange={(options) => handleMultiSelectChange(options, 'highlights')}
                styles={customStyles}
                name="highlights"
                id="highlights"
                required
              />
            </CCol>
            <CCol md="12">
              <CFormLabel htmlFor="amenities">Amenities</CFormLabel>
              <Select
                isMulti
                options={amenitiesOptions}
                value={formData.amenities}
                onChange={(options) => handleMultiSelectChange(options, 'amenities')}
                styles={customStyles}
                name="amenities"
                id="amenities"
                required
              />
            </CCol>
            <CCol md="12">
              <CFormLabel htmlFor="locationHighlights">Location Highlights</CFormLabel>
              <Select
                isMulti
                options={locationHighlightsOptions}
                value={formData.locationHighlights}
                onChange={(options) => handleMultiSelectChange(options, 'locationHighlights')}
                styles={customStyles}
                name="locationHighlights"
                id="locationHighlights"
                required
              />
            </CCol>
          </CRow>
          <CButton type="submit" color="primary" className="mt-3">
            Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddProjects;












  {/* <CCol md="6">
              <CFormLabel htmlFor="image2">Image 2</CFormLabel>
              <CFormInput
                type="file"
                name="image2"
                id="image2"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="image3">Image 3</CFormLabel>
              <CFormInput
                type="file"
                name="image3"
                id="image3"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="image4">Image 4</CFormLabel>
              <CFormInput
                type="file"
                name="image4"
                id="image4"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="image5">Image 5</CFormLabel>
              <CFormInput
                type="file"
                name="image5"
                id="image5"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="image6">Image 6</CFormLabel>
              <CFormInput
                type="file"
                name="image6"
                id="image6"
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md="6">
              <CFormLabel htmlFor="image7">Image 7</CFormLabel>
              <CFormInput
                type="file"
                name="image7"
                id="image7"
                onChange={handleChange}
                required
              />
            </CCol> */}