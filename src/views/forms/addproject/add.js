








// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormInput,
//   CFormLabel,
//   CRow,
//   CAlert,
//   CFormSelect
// } from '@coreui/react';
// import './SelectInput.css';

// const AddProjects = () => {
//   const [formData, setFormData] = useState({
//     projectname: '',
//     projectlocation: '',
//     projectbhk: '',
//     projectfloors: '',
//     projectsquareyards: '',
//     projectsquarefeet: '',
//     reranumber: '',
//     category: '',
//     iframe: '',
//     banner: null,
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,
//     image5: null,
//     image6: null,
//     image7: null,
//     floorplan1: null,
//     floorplan2: null,
//     masterfloorplan: null,
//     input1: '',
//     input2: '',
//     input3: '',
//     input4: '',
//     input5: '',
//     input6: '',
//     input7: '',
//     input8: '',
//     input9: '',
//     input10: '',
//     input11: '',
//     input12: '',
//     input13: '',
//     input14: '',
//     input15: '',
//     input16: '',
//     input17: '',
//     input18: '',
//     input19: '',
//     input20: '',
//     input21: '',
//     input22: '',
//     input23: '',
//     input24: '',
//     input25: ''
//   });

//   const allowedCategories = [
//     "apartment",
//     "commercial",
//     "villa",
//     "villa plots",
//     "farm lands",
//     "open plots",
//     "standalone apartments"
//   ];


//   const [step, setStep] = useState(1);
//   const [alert, setAlert] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       // Handle file inputs
//       setFormData({
//         ...formData,
//         [name]: files[0]
//       });
//     } else {
//       // Handle regular text inputs
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     // Append regular fields
//     for (const [key, value] of Object.entries(formData)) {
//       if (value instanceof File) {
//         form.append(key, value);
//       } else if (value !== null && value !== undefined) {
//         form.append(key, value);
//       }
//     }

//     form.append('batch', step);
    
//     try {
//       console.log("Sending data to server:", formData); // Debugging line
//       const response = await axios.post('http://localhost:5000/auth/projects', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
        
//       });
//       if (response.status === 201) {
//         setAlert({
//           type: 'success',
//           message: `Step ${step} submitted successfully!`,
//         });
//         if (step < 4) {
//           setStep(step + 1);
//         } else {
//           // Optionally reset form or navigate elsewhere
//           // e.g., window.location.href = '/projects';
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting project:', error);
//       setAlert({
//         type: 'danger',
//         message: `Error submitting step ${step}: ${error.message}`,
//       });
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectname">Project Name</CFormLabel>
//                 <CFormInput type="text" name="projectname" id="projectname" placeholder="Project Name" value={formData.projectname} onChange={handleChange} required />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectlocation">Project Location</CFormLabel>
//                 <CFormInput type="text" name="projectlocation" id="projectlocation" placeholder="Project Location" value={formData.projectlocation} onChange={handleChange} required />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectbhk">Project BHK</CFormLabel>
//                 <CFormInput type="text" name="projectbhk" id="projectbhk" placeholder="Project BHK" value={formData.projectbhk} onChange={handleChange} required />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectfloors">Project Floors</CFormLabel>
//                 <CFormInput type="text" name="projectfloors" id="projectfloors" placeholder="Project Floors" value={formData.projectfloors} onChange={handleChange} required />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectsquareyards">Project Square Yards</CFormLabel>
//                 <CFormInput type="text" name="projectsquareyards" id="projectsquareyards" placeholder="Project Square Yards" value={formData.projectsquareyards} onChange={handleChange} required />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectsquarefeet">Project Square Feet</CFormLabel>
//                 <CFormInput type="text" name="projectsquarefeet" id="projectsquarefeet" placeholder="Project Square Feet" value={formData.projectsquarefeet} onChange={handleChange} required />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="reranumber">RERA Number</CFormLabel>
//                 <CFormInput type="text" name="reranumber" id="reranumber" placeholder="RERA Number" value={formData.reranumber} onChange={handleChange} required />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="category">Category</CFormLabel>
//                 <CFormSelect
//                   name="category"
//                   id="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled>Select Category</option>
//                   {allowedCategories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </CFormSelect>
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="banner">Banner</CFormLabel>
//                 <CFormInput type="file" name="banner" id="banner" onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image1">Image 1</CFormLabel>
//                 <CFormInput type="file" name="image1" id="image1" onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
//                 <CFormInput type="file" name="floorplan1" id="floorplan1" onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
//                 <CFormInput type="file" name="floorplan2" id="floorplan2" onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
//                 <CFormInput type="file" name="masterfloorplan" id="masterfloorplan" onChange={handleChange} />
//               </CCol>
//             </CRow>
       
//           </>
//         );
//       case 2:
//         return (
//           <>
//           <h4>Project Highlights</h4>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input1">Input 1</CFormLabel>
//                 <CFormInput type="text" name="input1" id="input1" placeholder="Input 1" value={formData.input1} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input2">Input 2</CFormLabel>
//                 <CFormInput type="text" name="input2" id="input2" placeholder="Input 2" value={formData.input2} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input3">Input 3</CFormLabel>
//                 <CFormInput type="text" name="input3" id="input3" placeholder="Input 3" value={formData.input3} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input4">Input 4</CFormLabel>
//                 <CFormInput type="text" name="input4" id="input4" placeholder="Input 4" value={formData.input4} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input5">Input 5</CFormLabel>
//                 <CFormInput type="text" name="input5" id="input5" placeholder="Input 5" value={formData.input5} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input6">Input 6</CFormLabel>
//                 <CFormInput type="text" name="input6" id="input6" placeholder="Input 6" value={formData.input6} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input7">Input 7</CFormLabel>
//                 <CFormInput type="text" name="input7" id="input7" placeholder="Input 7" value={formData.input7} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input8">Input 8</CFormLabel>
//                 <CFormInput type="text" name="input8" id="input8" placeholder="Input 8" value={formData.input8} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input9">Input 9</CFormLabel>
//                 <CFormInput type="text" name="input9" id="input9" placeholder="Input 9" value={formData.input9} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input10">Input 10</CFormLabel>
//                 <CFormInput type="text" name="input10" id="input10" placeholder="Input 10" value={formData.input10} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image2">Image 2</CFormLabel>
//                 <CFormInput type="file" name="image2" id="image2" onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image3">Image 3</CFormLabel>
//                 <CFormInput type="file" name="image3" id="image3" onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image4">Image 4</CFormLabel>
//                 <CFormInput type="file" name="image4" id="image4" onChange={handleChange} />
//               </CCol>
//             </CRow>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <h4>Project Amenities</h4>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input11">Input 11</CFormLabel>
//                 <CFormInput type="text" name="input11" id="input11" placeholder="Input 11" value={formData.input11} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input12">Input 12</CFormLabel>
//                 <CFormInput type="text" name="input12" id="input12" placeholder="Input 12" value={formData.input12} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input13">Input 13</CFormLabel>
//                 <CFormInput type="text" name="input13" id="input13" placeholder="Input 13" value={formData.input13} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input14">Input 14</CFormLabel>
//                 <CFormInput type="text" name="input14" id="input14" placeholder="Input 14" value={formData.input14} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input15">Input 15</CFormLabel>
//                 <CFormInput type="text" name="input15" id="input15" placeholder="Input 15" value={formData.input15} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input16">Input 16</CFormLabel>
//                 <CFormInput type="text" name="input16" id="input16" placeholder="Input 16" value={formData.input16} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input17">Input 17</CFormLabel>
//                 <CFormInput type="text" name="input17" id="input17" placeholder="Input 17" value={formData.input17} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input18">Input 18</CFormLabel>
//                 <CFormInput type="text" name="input18" id="input18" placeholder="Input 18" value={formData.input18} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input19">Input 19</CFormLabel>
//                 <CFormInput type="text" name="input19" id="input19" placeholder="Input 19" value={formData.input19} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input20">Input 20</CFormLabel>
//                 <CFormInput type="text" name="input20" id="input20" placeholder="Input 20" value={formData.input20} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image5">Image 5</CFormLabel>
//                 <CFormInput type="file" name="image5" id="image5" onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image6">Image 6</CFormLabel>
//                 <CFormInput type="file" name="image6" id="image6" onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image7">Image 7</CFormLabel>
//                 <CFormInput type="file" name="image7" id="image7" onChange={handleChange} />
//               </CCol>
//             </CRow>
            
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <h4>Location Highlights</h4>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input21">Input 21</CFormLabel>
//                 <CFormInput type="text" name="input21" id="input21" placeholder="Input 21" value={formData.input21} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input22">Input 22</CFormLabel>
//                 <CFormInput type="text" name="input22" id="input22" placeholder="Input 22" value={formData.input22} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input23">Input 23</CFormLabel>
//                 <CFormInput type="text" name="input23" id="input23" placeholder="Input 23" value={formData.input23} onChange={handleChange} />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input24">Input 24</CFormLabel>
//                 <CFormInput type="text" name="input24" id="input24" placeholder="Input 24" value={formData.input24} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="input25">Input 25</CFormLabel>
//                 <CFormInput type="text" name="input25" id="input25" placeholder="Input 25" value={formData.input25} onChange={handleChange} />
//               </CCol>
//             </CRow>
//             <CRow>
//             <CCol md="6">
//               <CFormLabel htmlFor="iframe">Location Iframe</CFormLabel>
//               <CFormInput type="text" name="iframe" id="iframe" placeholder="Location Iframe" value={formData.iframe} onChange={handleChange} />
//             </CCol>
//           </CRow>
        
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <CCard>
//       <CCardHeader>
//         <strong>Add Project - Step {step}</strong>
//       </CCardHeader>
//       <CCardBody>
//         <CForm onSubmit={handleSubmit}>
//           {renderStep()}
//           <CRow className="mt-4">
//             <CCol>
//               <CButton type="submit" color="primary">
//                 {step < 4 ? 'Next' : 'Submit'}
//               </CButton>
//             </CCol>
//           </CRow>
//           {alert && <CAlert color={alert.type} className="mt-3">{alert.message}</CAlert>}
//         </CForm>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default AddProjects;

















// import React, { useState } from 'react';
// import {
//   CForm,
//   CRow,
//   CCol,
//   CFormLabel,
//   CFormInput,
//   CFormSelect,
//   CButton,
//   CAlert,
// } from '@coreui/react';
// import axios from 'axios';
// import Select from 'react-select';

// const AddProjects = () => {
//   const [formData, setFormData] = useState({
//     projectname: '',
//     projectlocation: '',
//     projectbhk: '',
//     projectfloors: '',
//     projectsquareyards: '',
//     projectsquarefeet: '',
//     reranumber: '',
//     category: '',
//     banner: null,
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,
//     image5: null,
//     image6: null,
//     image7: null,
//     image8: null,
//     floorplan1: null,
//     floorplan2: null,
//     masterfloorplan: null,
//     highlights: [],
//     amenities: [],
//     locationhighlights: [],
//   });
//   const [alert, setAlert] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSelectChange = (selectedOptions, name) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: selectedOptions ? selectedOptions.map(option => option.value) : [],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const [key, value] of Object.entries(formData)) {
//       if (value instanceof File) {
//         form.append(key, value);
//       } else if (Array.isArray(value)) {
//         value.forEach((item, index) => {
//           form.append(`${key}[${index}]`, item);
//         });
//       } else if (value !== null && value !== undefined) {
//         form.append(key, value);
//       }
//     }

//     try {
//       console.log("Sending data to server:", formData); // Debugging line
//       const response = await axios.post('http://localhost:5000/auth/projects', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 201) {
//         setAlert({
//           type: 'success',
//           message: 'Project submitted successfully!',
//         });
//         // Optionally reset form or navigate elsewhere
//         // e.g., window.location.href = '/projects';
//       }
//     } catch (error) {
//       console.error('Error submitting project:', error);
//       setAlert({
//         type: 'danger',
//         message: `Error submitting project: ${error.message}`,
//       });
//     }
//   };

//   const highlightOptions = [
//     { value: 'highlight1', label: 'Highlight 1' },
//     { value: 'highlight2', label: 'Highlight 2' },
//     { value: 'highlight3', label: 'Highlight 3' },
//     // Add more options as needed
//   ];

//   const amenityOptions = [
//     { value: 'amenity1', label: 'Amenity 1' },
//     { value: 'amenity2', label: 'Amenity 2' },
//     { value: 'amenity3', label: 'Amenity 3' },
//     // Add more options as needed
//   ];

//   const locationHighlightOptions = [
//     { value: 'location1', label: 'Location Highlight 1' },
//     { value: 'location2', label: 'Location Highlight 2' },
//     { value: 'location3', label: 'Location Highlight 3' },
//     // Add more options as needed
//   ];

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: '#333', // Dark background color
//       color: '#fff', // Text color
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: '#333', // Dark background color for dropdown
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: '#555', // Dark background color for selected items
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: '#fff', // Text color for selected items
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: '#fff', // Text color for single selected value
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? '#666' : state.isFocused ? '#555' : '#333',
//       color: '#fff', // Text color for options
//     }),
//   };


//   return (
//     <div className="p-3">
//     <CForm onSubmit={handleSubmit}>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectname">Project Name</CFormLabel>
//           <CFormInput type="text" name="projectname" id="projectname" placeholder="Project Name" value={formData.projectname} onChange={handleChange} required />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectlocation">Project Location</CFormLabel>
//           <CFormInput type="text" name="projectlocation" id="projectlocation" placeholder="Project Location" value={formData.projectlocation} onChange={handleChange} required />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectbhk">Project BHK</CFormLabel>
//           <CFormInput type="text" name="projectbhk" id="projectbhk" placeholder="Project BHK" value={formData.projectbhk} onChange={handleChange} required />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectfloors">Project Floors</CFormLabel>
//           <CFormInput type="text" name="projectfloors" id="projectfloors" placeholder="Project Floors" value={formData.projectfloors} onChange={handleChange} required />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectsquareyards">Project Square Yards</CFormLabel>
//           <CFormInput type="text" name="projectsquareyards" id="projectsquareyards" placeholder="Project Square Yards" value={formData.projectsquareyards} onChange={handleChange} required />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="projectsquarefeet">Project Square Feet</CFormLabel>
//           <CFormInput type="text" name="projectsquarefeet" id="projectsquarefeet" placeholder="Project Square Feet" value={formData.projectsquarefeet} onChange={handleChange} required />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="reranumber">RERA Number</CFormLabel>
//           <CFormInput type="text" name="reranumber" id="reranumber" placeholder="RERA Number" value={formData.reranumber} onChange={handleChange} required />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="category">Category</CFormLabel>
//           <CFormSelect name="category" id="category" value={formData.category} onChange={handleChange} required>
//             <option value="">Select Category</option>
//             <option value="category1">Category 1</option>
//             <option value="category2">Category 2</option>
//             <option value="category3">Category 3</option>
//             {/* Add more categories as needed */}
//           </CFormSelect>
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="banner">Banner</CFormLabel>
//           <CFormInput type="file" name="banner" id="banner" onChange={handleChange} />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="image1">Image 1</CFormLabel>
//           <CFormInput type="file" name="image1" id="image1" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
//           <CFormInput type="file" name="floorplan1" id="floorplan1" onChange={handleChange} />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
//           <CFormInput type="file" name="floorplan2" id="floorplan2" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
//           <CFormInput type="file" name="masterfloorplan" id="masterfloorplan" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <h4>Project Highlights</h4>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="highlights">Highlights</CFormLabel>
//           <Select
//             isMulti
//             name="highlights"
//             options={highlightOptions}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'highlights')}
//             styles={customStyles}
//           />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="image2">Image 2</CFormLabel>
//           <CFormInput type="file" name="image2" id="image2" onChange={handleChange} />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="image3">Image 3</CFormLabel>
//           <CFormInput type="file" name="image3" id="image3" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <h4>Project Amenities</h4>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="amenities">Amenities</CFormLabel>
//           <Select
//             isMulti
//             name="amenities"
//             options={amenityOptions}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'amenities')}
//             styles={customStyles}
//           />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="image4">Image 4</CFormLabel>
//           <CFormInput type="file" name="image4" id="image4" onChange={handleChange} />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="image5">Image 5</CFormLabel>
//           <CFormInput type="file" name="image5" id="image5" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <h4>Location Highlights</h4>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="locationhighlights">Location Highlights</CFormLabel>
//           <Select
//             isMulti
//             name="locationhighlights"
//             options={locationHighlightOptions}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'locationhighlights')}
//             styles={customStyles}
//           />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="image6">Image 6</CFormLabel>
//           <CFormInput type="file" name="image6" id="image6" onChange={handleChange} />
//         </CCol>
//         <CCol md="6">
//           <CFormLabel htmlFor="image7">Image 7</CFormLabel>
//           <CFormInput type="file" name="image7" id="image7" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md="6">
//           <CFormLabel htmlFor="image8">Image 8</CFormLabel>
//           <CFormInput type="file" name="image8" id="image8" onChange={handleChange} />
//         </CCol>
//       </CRow>
//       <CButton type="submit" color="primary">
//         Submit
//       </CButton>
//       {alert && <CAlert color={alert.type}>{alert.message}</CAlert>}
//     </CForm>
//     </div>

//   );
// };

// export default AddProjects;











































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormInput,
//   CFormLabel,
//   CRow,
//   CAlert,
//   CFormSelect
// } from '@coreui/react';
// import {
//   ApartmentHighlights,
//   ApartmentAmenities,
//   ApartmentLocationHighlights,
//   VillaHighlights,
//   VillaAmenities,
//   VillaLocationHighlights,
//   CommercialHighlights,
//   CommercialAmenities,
//   CommercialLocationHighlights,
//   PlotHighlights,
//   PlotAmenities,
//   PlotLocationHighlights
// } from './options';



// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: '#333', 
//     color: '#fff', 
//   }),
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: '#333', 
//   }),
//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: '#555', 
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: '#fff', 
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: '#fff', 
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? '#666' : state.isFocused ? '#555' : '#333',
//     color: '#fff', 
//   }),
// };
// // get the /auth/builders and get the builder names from the backend use axios to fetch the data





// const allowedCategories = [
//   "apartment",
//   "commercial",
//   "villa",
//   "plots",
// ]; 

// const AddProjects = () => {

//   const [builderNames, setBuilderNames] = useState([]);



//   const [formData, setFormData] = useState({
//     projectname: '',
//     projectlocation: '',
//     projectbhk: '',
//     projectprice: '',
//     projectfloors: '',
//     projectsquareyards: '',
//     projectsquarefeet: '',
//     reranumber: '',
//     category: '',
//     iframe: '',
//     banner: null,
//     buildername: '',
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,
//     image5: null,
//     image6: null,
//     image7: null,
//     floorplan1: null,
//     floorplan2: null,
//     masterfloorplan: null,
//     highlights: [],
//     amenities: [],
//     locationHighlights: [],
//   });

//   const [step, setStep] = useState(1);
//   const [alert, setAlert] = useState(null);

//   const [highlightsOptions, setHighlightsOptions] = useState([]);
//   const [amenitiesOptions, setAmenitiesOptions] = useState([]);
//   const [locationHighlightsOptions, setLocationHighlightsOptions] = useState([]);
//   const apiUrl1=import.meta.env.VITE_BUILDERS_API
//   useEffect(() => {
//     const fetchBuilderNames = async () => {
//       try {
//         const response = await axios.get(apiUrl1);
//         setBuilderNames(response.data.map(builder => builder.builderName));
//       } catch (error) {
//         console.error('Error fetching builder names:', error);
//       }
//     };
  
//     fetchBuilderNames();
//   }, []);



//   useEffect(() => {
//     switch (formData.category) {
//       case 'apartment':
//         setHighlightsOptions(ApartmentHighlights);
//         setAmenitiesOptions(ApartmentAmenities);
//         setLocationHighlightsOptions(ApartmentLocationHighlights);
//         break;
//       case 'villa':
//         setHighlightsOptions(VillaHighlights);
//         setAmenitiesOptions(VillaAmenities);
//         setLocationHighlightsOptions(VillaLocationHighlights);
//         break;
//       case 'commercial':
//         setHighlightsOptions(CommercialHighlights);
//         setAmenitiesOptions(CommercialAmenities);
//         setLocationHighlightsOptions(CommercialLocationHighlights);
//         break;
//       case 'plots':
//         setHighlightsOptions(PlotHighlights);
//         setAmenitiesOptions(PlotAmenities);
//         setLocationHighlightsOptions(PlotLocationHighlights);
//         break;
//       default:
//         setHighlightsOptions([]);
//         setAmenitiesOptions([]);
//         setLocationHighlightsOptions([]);
//     }
//   }, [formData.category]);

  

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({
//         ...formData,
//         [name]: files[0]
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

 

//   const handleMultiSelectChange = (selectedOptions, name) => {
//     setFormData({
//       ...formData,
//       [name]: selectedOptions
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = import.meta.env.VITE_PROJECTS_API
//     const form = new FormData();
//     // Append regular fields
//     for (const [key, value] of Object.entries(formData)) {
//       if (value instanceof File) {
//         form.append(key, value);
//       } else if (Array.isArray(value)) {
//         form.append(key, JSON.stringify(value.map(option => option.value)));
//       } else if (value !== null && value !== undefined) {
//         form.append(key, value);
//       }
//     }

//     form.append('batch', step);
    
//     console.log(form);
      


//     try {
//       const response = await axios.post(apiUrl, form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 201) {
//         setAlert({
//           type: 'success',
//           message: `Step ${step} submitted successfully!`,
//         });
//         if (step < 4) {
//           // Clear the form fields for the next step
//           setFormData((prevData) => ({
//             ...prevData,
//             image1: null,
//             image2: null,
//             image3: null,
//             image4: null,
//             image5: null,
//             image6: null,
//             image7: null,
//             floorplan1: null,
//             floorplan2: null,
//             masterfloorplan: null,
//             highlights: [],
//             amenities: [],
//             locationHighlights: [],
//           }));
//           setStep(step + 1);
//         } else {
//           // Optionally reset form or navigate elsewhere
//           // e.g., window.location.href = '/projects';
//         }
//       }
//     } catch (error) {
//       setAlert({
//         type: 'danger',
//         message: `Error submitting step ${step}: ${error.message}`,
//       });
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectname">Project Name</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectname"
//                   id="projectname"
//                   placeholder="Project Name"
//                   value={formData.projectname}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectlocation">Project Location</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectlocation"
//                   id="projectlocation"
//                   placeholder="Project Location"
//                   value={formData.projectlocation}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//             </CRow>
//             {/* builder name select option and fetch the builder name from the backend */}
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="buildername">Builder Name</CFormLabel>
//                 <CFormSelect
//                   name="buildername"
//                   id="buildername"
//                   value={formData.buildername}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled>Select Builder Name</option>
//                   {builderNames.map((name) => (
//                     <option key={name} value={name}>
//                       {name}
//                     </option>
//                   ))}
//                 </CFormSelect>
//               </CCol>
//               {/* add the projeect price */}
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectprice">
//                   Project Price (in INR)
//                 </CFormLabel>
//                 <CFormInput
//                   type="number"
//                   name="projectprice"
//                   id="projectprice"
//                   placeholder="Project Price"
//                   value={formData.projectprice}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//             </CRow>

//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectbhk">Project BHK</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectbhk"
//                   id="projectbhk"
//                   placeholder="Project BHK"
//                   value={formData.projectbhk}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectfloors">Project Floors</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectfloors"
//                   id="projectfloors"
//                   placeholder="Project Floors"
//                   value={formData.projectfloors}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectsquareyards">Project Square Yards</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectsquareyards"
//                   id="projectsquareyards"
//                   placeholder="Project Square Yards"
//                   value={formData.projectsquareyards}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="projectsquarefeet">Project Square Feet</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="projectsquarefeet"
//                   id="projectsquarefeet"
//                   placeholder="Project Square Feet"
//                   value={formData.projectsquarefeet}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="reranumber">RERA Number</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="reranumber"
//                   id="reranumber"
//                   placeholder="RERA Number"
//                   value={formData.reranumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="category">Category</CFormLabel>
//                 <CFormSelect
//                   name="category"
//                   id="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled>Select Category</option>
//                   {allowedCategories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </CFormSelect>
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="banner">Banner</CFormLabel>
//                   <h6>Upload image size - 9988*4000 pixels</h6>
//                 <CFormInput
//                   type="file"
//                   name="banner"
//                   id="banner"
//                   onChange={handleChange}
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image1">Image 1</CFormLabel>
//                 <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image1"
//                   id="image1"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
//                 <CFormInput
//                   type="file"
//                   name="floorplan1"
//                   id="floorplan1"
//                   onChange={handleChange}
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
//                 <CFormInput
//                   type="file"
//                   name="floorplan2"
//                   id="floorplan2"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
//                 <CFormInput
//                   type="file"
//                   name="masterfloorplan"
//                   id="masterfloorplan"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <h4>Project Highlights</h4>
//             <CRow>
//               <CCol md="12">
//                 <Select
//                   isMulti
//                   styles={customStyles}
//                   name="highlights"
//                   options={highlightsOptions}
//                   value={formData.highlights}
//                   onChange={(options) => handleMultiSelectChange(options, 'highlights')}
//                   placeholder="Select Highlights"
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image2">Image 2</CFormLabel>
//                 <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image2"
//                   id="image2"
//                   onChange={handleChange}
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image3">Image 3</CFormLabel>
//                          <h6>Upload image size - 1060*606</h6>
//                   <CFormInput
//                   type="file"
//                   name="image3"
//                   id="image3"
//                   onChange={handleChange}
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image4">Image 4</CFormLabel>
//                  <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image4"
//                   id="image4"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <h4>Amenities</h4>
//             <CRow>
//               <CCol md="12">
//                 <Select
//                   isMulti
//                   styles={customStyles}
//                   name="amenities"
//                   options={amenitiesOptions}
//                   value={formData.amenities}
//                   onChange={(options) => handleMultiSelectChange(options, 'amenities')}
//                   placeholder="Select Amenities"
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image5">Image 5</CFormLabel>
//                 <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image5"
//                   id="image5"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image6">Image 6</CFormLabel>
//                   <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image6"
//                   id="image6"
//                   onChange={handleChange}
//                 />
//               </CCol>
//               <CCol md="6">
//                 <CFormLabel htmlFor="image7">Image 7</CFormLabel>
//                   <h6>Upload image size - 1060*606</h6>
//                 <CFormInput
//                   type="file"
//                   name="image7"
//                   id="image7"
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <h4>Location Highlights</h4>
//             <CRow>
//               <CCol md="12">
//                 <Select
//                   isMulti
//                   styles={customStyles}
//                   name="locationHighlights"
//                   options={locationHighlightsOptions}
//                   value={formData.locationHighlights}
//                   onChange={(options) => handleMultiSelectChange(options, 'locationHighlights')}
//                   placeholder="Select Location Highlights"
//                 />
//               </CCol>
//             </CRow>
//             <CRow>
//               <CCol md="6">
//                 <CFormLabel htmlFor="iframe">Location Iframe</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   name="iframe"
//                   id="iframe"
//                   placeholder="Location Iframe"
//                   value={formData.iframe}
//                   onChange={handleChange}
//                 />
//               </CCol>
//             </CRow>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <CCard>
//       <CCardHeader>
//         <strong>Add Project - Step {step}</strong>
//       </CCardHeader>
//       <CCardBody>
//         {alert && <CAlert color={alert.type} className="mt-3">{alert.message}</CAlert>}
//         <CForm onSubmit={handleSubmit}>
//           {renderStep()}
//           <CRow className="mt-4">
//             <CCol md="6">
//               <CButton type="submit" color="primary">
//                 {step < 4 ? `Next (Step ${step + 1})` : 'Submit'}
//               </CButton>
//             </CCol>
//             {step > 1 && (
//               <CCol md="6">
//                 <CButton
//                   type="button"
//                   color="secondary"
//                   onClick={() => setStep(step - 1)}
//                 >
//                   Back
//                 </CButton>
//               </CCol>
//             )}
//           </CRow>
//         </CForm>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default AddProjects;


























































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormInput,
//   CFormLabel,
//   CRow,
//   CAlert,
//   CFormSelect
// } from '@coreui/react';
// import {
//   ApartmentHighlights,
//   ApartmentAmenities,
//   ApartmentLocationHighlights,
//   VillaHighlights,
//   VillaAmenities,
//   VillaLocationHighlights,
//   CommercialHighlights,
//   CommercialAmenities,
//   CommercialLocationHighlights,
//   PlotHighlights,
//   PlotAmenities,
//   PlotLocationHighlights
// } from './options';

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: '#333',
//     color: '#fff',
//   }),
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: '#333',
//   }),
//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: '#555',
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: '#fff',
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: '#fff',
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? '#666' : state.isFocused ? '#555' : '#333',
//     color: '#fff',
//   }),
// };

// const allowedCategories = [
//   "apartment",
//   "commercial",
//   "villa",
//   "plots",
// ];

// const AddProjects = () => {
//   const [builderNames, setBuilderNames] = useState([]);
//   const [formData, setFormData] = useState({
//     projectname: '',
//     projectlocation: '',
//     projectimage: null,
//     projectlogo: null,
//     projectbhk: '',
//     projectprice: '',
//     projectfloors: '',
//     projectsquareyards: '',
//     projectsquarefeet: '',
//     reranumber: '',
//     category: '',
//     iframe: '',
//     banner: null,
//     buildername: '',
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,
//     image5: null,
//     image6: null,
//     image7: null,
//     floorplan1: null,
//     floorplan2: null,
//     masterfloorplan: null,
//     highlights: [],
//     amenities: [],
//     locationHighlights: [],
//   });
//   const [alert, setAlert] = useState(null);

//   const [highlightsOptions, setHighlightsOptions] = useState([]);
//   const [amenitiesOptions, setAmenitiesOptions] = useState([]);
//   const [locationHighlightsOptions, setLocationHighlightsOptions] = useState([]);
  
//   const apiUrl1 = import.meta.env.VITE_BUILDERS_API;
//   const apiUrl = import.meta.env.VITE_PROJECTS_API;

//   useEffect(() => {
//     const fetchBuilderNames = async () => {
//       try {
//         const response = await axios.get(apiUrl1);
//         setBuilderNames(response.data.map(builder => builder.builderName));
//       } catch (error) {
//         console.error('Error fetching builder names:', error);
//       }
//     };
//     fetchBuilderNames();
//   }, []);

//   useEffect(() => {
//     switch (formData.category) {
//       case 'apartment':
//         setHighlightsOptions(ApartmentHighlights);
//         setAmenitiesOptions(ApartmentAmenities);
//         setLocationHighlightsOptions(ApartmentLocationHighlights);
//         break;
//       case 'villa':
//         setHighlightsOptions(VillaHighlights);
//         setAmenitiesOptions(VillaAmenities);
//         setLocationHighlightsOptions(VillaLocationHighlights);
//         break;
//       case 'commercial':
//         setHighlightsOptions(CommercialHighlights);
//         setAmenitiesOptions(CommercialAmenities);
//         setLocationHighlightsOptions(CommercialLocationHighlights);
//         break;
//       case 'plots':
//         setHighlightsOptions(PlotHighlights);
//         setAmenitiesOptions(PlotAmenities);
//         setLocationHighlightsOptions(PlotLocationHighlights);
//         break;
//       default:
//         setHighlightsOptions([]);
//         setAmenitiesOptions([]);
//         setLocationHighlightsOptions([]);
//     }
//   }, [formData.category]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({
//         ...formData,
//         [name]: files[0]
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleMultiSelectChange = (selectedOptions, name) => {
//     setFormData({
//       ...formData,
//       [name]: selectedOptions
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();

//     for (const [key, value] of Object.entries(formData)) {
//       if (value instanceof File) {
//         form.append(key, value);
//       } else if (Array.isArray(value)) {
//         form.append(key, JSON.stringify(value.map(option => option.value)));
//       } else if (value !== null && value !== undefined) {
//         form.append(key, value);
//       }
//     }

//     try {
//       const response = await axios.post(apiUrl, form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 201) {
//         setAlert({
//           type: 'success',
//           message: 'Project added successfully!',
//         });
//         // Reset form fields after successful submission
//         setFormData({
//           projectname: '',
//           projectlocation: '',
//           projectimage: null,
//           projectlogo: null,
//           projectbhk: '',
//           projectprice: '',
//           projectfloors: '',
//           projectsquareyards: '',
//           projectsquarefeet: '',
//           reranumber: '',
//           category: '',
//           iframe: '',
//           banner: null,
//           buildername: '',
//           image1: null,
//           image2: null,
//           image3: null,
//           image4: null,
//           image5: null,
//           image6: null,
//           image7: null,
//           floorplan1: null,
//           floorplan2: null,
//           masterfloorplan: null,
//           highlights: [],
//           amenities: [],
//           locationHighlights: [],
//         });
//       }
//     } catch (error) {
//       setAlert({
//         type: 'danger',
//         message: `Error adding project: ${error.message}`,
//       });
//     }
//   };


//   return (
//     <CCard>
//       <CCardHeader>
//         <strong>Add Project</strong>
//       </CCardHeader>
//       <CCardBody>
//         {alert && <CAlert color={alert.type} className="mt-3">{alert.message}</CAlert>}
//         <CForm onSubmit={handleSubmit}>
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="projectname">Project Name</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectname"
//                 id="projectname"
//                 placeholder="Project Name"
//                 value={formData.projectname}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>

            
//           </CRow>
         
//           <CRow className="mb-4">
//           <CCol md="6">
//               <CFormLabel htmlFor="projectlocation">Project Location</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectlocation"
//                 id="projectlocation"
//                 placeholder="Project Location"
//                 value={formData.projectlocation}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="buildername">Builder Name</CFormLabel>
//               <CFormSelect
//                 name="buildername"
//                 id="buildername"
//                 value={formData.buildername}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" disabled>Select Builder Name</option>
//                 {builderNames.map((name) => (
//                   <option key={name} value={name}>
//                     {name}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </CCol>
//             </CRow>
//             <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="projectprice">Project Price (in INR)</CFormLabel>
//               <CFormInput
//                 type="number"
//                 name="projectprice"
//                 id="projectprice"
//                 placeholder="Project Price"
//                 value={formData.projectprice}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="category">Category</CFormLabel>
//               <CFormSelect
//                 name="category"
//                 id="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" disabled>Select Category</option>
//                 {allowedCategories.map(category => (
//                   <option key={category} value={category}>
//                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </CCol>
//           </CRow>
            
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="projectbhk">Project BHK</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectbhk"
//                 id="projectbhk"
//                 placeholder="Project BHK"
//                 value={formData.projectbhk}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="projectfloors">Project Floors</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectfloors"
//                 id="projectfloors"
//                 placeholder="Project Floors"
//                 value={formData.projectfloors}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="projectsquareyards">Project Square Yards</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectsquareyards"
//                 id="projectsquareyards"
//                 placeholder="Project Square Yards"
//                 value={formData.projectsquareyards}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="projectsquarefeet">Project Square Feet</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="projectsquarefeet"
//                 id="projectsquarefeet"
//                 placeholder="Project Square Feet"
//                 value={formData.projectsquarefeet}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="reranumber">RERA Number</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="reranumber"
//                 id="reranumber"
//                 placeholder="RERA Number"
//                 value={formData.reranumber}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="iframe">iFrame</CFormLabel>
//               <CFormInput
//                 type="text"
//                 name="iframe"
//                 id="iframe"
//                 placeholder="iFrame"
//                 value={formData.iframe}
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CRow className="mb-4">
            
//             <CCol md="6">
//               <CFormLabel htmlFor="banner">Banner Image</CFormLabel>
//               <CFormInput
//                 type="file"
//                 name="banner"
//                 id="banner"
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="image1">Project Image</CFormLabel>
//               <CFormInput
//                 type="file"
//                 name="image1"
//                 id="image1"
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
          
//             <CCol md="6">
//               <CFormLabel htmlFor="floorplan1">Floor Plan 1</CFormLabel>
//               <CFormInput
//                 type="file"
//                 name="floorplan1"
//                 id="floorplan1"
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CRow className="mb-4">
//             <CCol md="6">
//               <CFormLabel htmlFor="floorplan2">Floor Plan 2</CFormLabel>
//               <CFormInput
//                 type="file"
//                 name="floorplan2"
//                 id="floorplan2"
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//             <CCol md="6">
//               <CFormLabel htmlFor="masterfloorplan">Master Floor Plan</CFormLabel>
//               <CFormInput
//                 type="file"
//                 name="masterfloorplan"
//                 id="masterfloorplan"
//                 onChange={handleChange}
//                 required
//               />
//             </CCol>
//           </CRow>

//           <div
//   className="mb-3"
//   style={{
//     margin: "20px 0",
//     padding: '15px',
//     borderRadius: '10px',
//     color: '#fff',
//     boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
//     width: '100%', // Set width to 100% to match the width of the container
//     maxWidth: '100%', // Ensure it doesn't exceed the container width
//   }}
// >
//   <CRow className="mb-4">
//     {/* Project Logo */}
//     <CCol md="6">
//       <CFormLabel htmlFor="projectlogo">
//         Project Logo
//       </CFormLabel>
//       <CFormInput
//         type="file"
//         name="projectlogo"
//         id="projectlogo"
//         onChange={handleChange}
//         required
//       />
//     </CCol>

//     {/* Project Image */}
//     <CCol md="6">
//       <CFormLabel htmlFor="projectimage">
//         Project Image
//       </CFormLabel>
//       <CFormInput
//         type="file"
//         name="projectimage"
//         id="projectimage"
//         onChange={handleChange}
//         required
//       />
//     </CCol>
//   </CRow>
// </div>




//           <CRow className="mb-4">
//             <CCol md="12">
//               <CFormLabel htmlFor="highlights">Highlights</CFormLabel>
//               <Select
//                 isMulti
//                 options={highlightsOptions}
//                 value={formData.highlights}
//                 onChange={(options) => handleMultiSelectChange(options, 'highlights')}
//                 styles={customStyles}
//                 name="highlights"
//                 id="highlights"
//                 required
//               />
//             </CCol>
//             <CCol md="12">
//               <CFormLabel htmlFor="amenities">Amenities</CFormLabel>
//               <Select
//                 isMulti
//                 options={amenitiesOptions}
//                 value={formData.amenities}
//                 onChange={(options) => handleMultiSelectChange(options, 'amenities')}
//                 styles={customStyles}
//                 name="amenities"
//                 id="amenities"
//                 required
//               />
//             </CCol>
//             <CCol md="12">
//               <CFormLabel htmlFor="locationHighlights">Location Highlights</CFormLabel>
//               <Select
//                 isMulti
//                 options={locationHighlightsOptions}
//                 value={formData.locationHighlights}
//                 onChange={(options) => handleMultiSelectChange(options, 'locationHighlights')}
//                 styles={customStyles}
//                 name="locationHighlights"
//                 id="locationHighlights"
//                 required
//               />
//             </CCol>
//           </CRow>
//           <CButton type="submit" color="primary" className="mt-3">
//             Submit
//           </CButton>
//         </CForm>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default AddProjects;












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