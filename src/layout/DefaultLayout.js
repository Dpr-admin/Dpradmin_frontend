
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import React from 'react' 
import { Routes, Route } from 'react-router-dom';
import AddProjects from '../views/forms/addproject/AddProjects';
import CreateBuilder from '../views/forms/addbuilder/Createbuilder';
import ProjectList from '../views/forms/project-list/ProjectList';


const DefaultLayout = () => {
   

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <Routes>
            <Route path="forms/addproject/*" element={<AddProjects />} />
            <Route path="forms/project-list/*" element={<ProjectList />} />
            <Route path="forms/Builders/*" element={<CreateBuilder />} />

            {/* Add more routes as needed */}
          </Routes>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout


// const DefaultLayout = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/auth/protected')
//         if (res.data.status) {
//           navigate('/dashboard/*')
//         }
//       } catch (err) {
//         console.error('Error checking authentication:', err)
//         navigate('/login') 
//       }
//     }

//     checkAuth()
//   }, [navigate])
