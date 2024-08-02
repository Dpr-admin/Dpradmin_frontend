import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAlert,
  CContainer,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState(''); // 'success' or 'danger'
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/projects');
      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        console.error('Unexpected response data:', response.data);
        setAlertMessage('Failed to fetch projects.');
        setAlertColor('danger');
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setAlertMessage('Error fetching projects.');
      setAlertColor('danger');
      setProjects([]);
    }
  };

  const handleUpdate = (projectId) => {
    // Navigate to the UpdateProject component with the projectId
    navigate(`/update-project/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/auth/projects/${projectId}`);
      setAlertMessage('Project deleted successfully.');
      setAlertColor('success');
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error('Error deleting project:', error);
      setAlertMessage('Error deleting project.');
      setAlertColor('danger');
    }
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          {alertMessage && (
            <CAlert color={alertColor} onClose={() => setAlertMessage('')} dismissible>
              {alertMessage}
            </CAlert>
          )}
          <h5>{projects.length} project(s) available</h5>
          {projects.length > 0 ? (
            projects.map((project) => (
              <CCard key={project._id} className="mb-3">
                <CCardHeader>Project Details</CCardHeader>
                <CCardBody>
                <p><strong>Project Name:</strong> {project.projectname}</p>
                  <p><strong>Location:</strong> {project.projectlocation}</p>
                  <p><strong>Category:</strong> {project.category}</p>
                  
                  {/* Add more fields as needed */}
                  <div className="d-flex justify-content-between">
                    <CButton color="primary" onClick={() => handleUpdate(project._id)}>
                      Update
                    </CButton>
                    <CButton color="danger" onClick={() => handleDelete(project._id)}>
                      Delete
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ProjectList;
