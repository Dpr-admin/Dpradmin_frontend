// import React, { useEffect, useState } from 'react';
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
//   CFormSelect,
// } from '@coreui/react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Assuming you are using react-router-dom

// const UpdateProject = () => {
//   const { projectId } = useParams(); // Assuming you are getting projectId from URL params
//   const [projectData, setProjectData] = useState({
//     category: '',
//     projectName: '',
//     projectLocation: '',
//     projectBhk: '',
//     projectFloors: '',
//     projectSquareyards: '',
//     projectSquarefeet: '',
//     reraNumber: '',
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
//     input25: '',
//     iframe: '',
//   });

//   const [files, setFiles] = useState({
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
//   });
//   const apiUrl = import.meta.env.VITE_PROJECTS_API;
//   useEffect(() => {
//     if (projectId) {
//       axios.get(`${apiUrl}/${projectId}`)
//         .then(response => {
//           setProjectData(response.data);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the project data!", error);
//         });
//     } else {
//       console.error("Project ID is undefined!");
//     }
//   }, [projectId]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setProjectData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { id, files } = e.target;
//     setFiles((prevFiles) => ({ ...prevFiles, [id]: files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     // Append project data
//     for (const [key, value] of Object.entries(projectData)) {
//       formData.append(key, value);
//     }

//     // Append files
//     for (const [key, file] of Object.entries(files)) {
//       if (file) formData.append(key, file);
//     }

//     try {
//       await axios.put(`http://localhost:5000/auth/projects/${projectId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('Project updated successfully!');
//     } catch (error) {
//       console.error('There was an error updating the project!', error);
//       alert('Failed to update project.');
//     }
//   };


//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Update Project</strong>
//           </CCardHeader>
//           <CCardBody>
//             <CForm onSubmit={handleSubmit}>
//               {/* Project Category */}
//               <div className="mb-3">
//                 <CFormLabel htmlFor="category">Project Category</CFormLabel>
//                 <CFormSelect
//                   id="category"
//                   value={projectData.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="villa Plots">Villa Plots</option>
//                   <option value="villas">Villas</option>
//                   <option value="farmlands">Farm Lands</option>
//                   <option value="standaloneapartments">Standalone Apartments</option>
//                   <option value="commercial">Commercial</option>
//                   <option value="openplot">Open Plot</option>
//                 </CFormSelect>
//               </div>

//               {/* Banner Image */}
//               <div className="mb-3">
//                 <CFormLabel htmlFor="banner">Banner</CFormLabel>
//                 <CFormInput
//                   type="file"
//                   id="banner"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               {/* Project Details Inputs */}
//               <div className="mb-3">
//                 <CFormLabel htmlFor="projectName">Project Name</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   id="projectName"
//                   placeholder="Enter project name"
//                   value={projectData.projectName}
//                   onChange={handleChange}
//                 />
//               </div>
//               {/* Repeat similar blocks for other fields */}

//               {/* Project Highlights */}
//               <h3>Project Highlights</h3>
//               {[...Array(10)].map((_, index) => (
//                 <div className="mb-3" key={index}>
//                   <CFormLabel htmlFor={`input${index + 1}`}>Project Highlight {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     id={`input${index + 1}`}
//                     placeholder={`Enter Project Highlight ${index + 1}`}
//                     value={projectData[`input${index + 1}`]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ))}

//               {/* Project Highlight Images */}
//               {[...Array(3)].map((_, index) => (
//                 <div className="mb-3" key={`image${index + 2}`}>
//                   <CFormLabel htmlFor={`image${index + 2}`}>Project Highlight Image {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="file"
//                     id={`image${index + 2}`}
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               ))}

//               {/* Project Amenities */}
//               <h3>Project Amenities</h3>
//               {[...Array(10)].map((_, index) => (
//                 <div className="mb-3" key={index + 11}>
//                   <CFormLabel htmlFor={`input${index + 11}`}>Project Amenity {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     id={`input${index + 11}`}
//                     placeholder={`Enter Project Amenity ${index + 1}`}
//                     value={projectData[`input${index + 11}`]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ))}

//               {/* Project Amenity Images */}
//               {[...Array(3)].map((_, index) => (
//                 <div className="mb-3" key={`image${index + 5}`}>
//                   <CFormLabel htmlFor={`image${index + 5}`}>Project Amenity Image {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="file"
//                     id={`image${index + 5}`}
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               ))}

//               {/* Project FloorPlan Images */}
//               <h3>Project FloorPlan Images</h3>
//               {[...Array(2)].map((_, index) => (
//                 <div className="mb-3" key={`floorplan${index + 1}`}>
//                   <CFormLabel htmlFor={`floorplan${index + 1}`}>FloorPlan Image {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="file"
//                     id={`floorplan${index + 1}`}
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               ))}

//               {/* Project Master FloorPlan Image */}
//               <h3>Project Master FloorPlan Image</h3>
//               <div className="mb-3">
//                 <CFormLabel htmlFor="masterfloorplan">MasterFloorPlan Image</CFormLabel>
//                 <CFormInput
//                   type="file"
//                   id="masterfloorplan"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               {/* Project Location Highlights */}
//               <h3>Project Location Highlights</h3>
//               {[...Array(5)].map((_, index) => (
//                 <div className="mb-3" key={index + 21}>
//                   <CFormLabel htmlFor={`input${index + 21}`}>Location Highlight {index + 1}</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     id={`input${index + 21}`}
//                     placeholder={`Enter Location Highlight ${index + 1}`}
//                     value={projectData[`input${index + 21}`]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ))}

//               {/* Location Iframe */}
//               <div className="mb-3">
//                 <CFormLabel htmlFor="iframe">Project Location Iframe</CFormLabel>
//                 <CFormInput
//                   type="text"
//                   id="iframe"
//                   placeholder="Enter project location iframe URL"
//                   value={projectData.iframe}
//                   onChange={handleChange}
//                 />
//               </div>

//               <CButton type="submit" color="primary">Update Project</CButton>
//             </CForm>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   );
// };

// export default UpdateProject;
