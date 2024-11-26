import React from 'react'
import { useNavigate } from 'react-router-dom'


const Admin = () => {
    const navigate = useNavigate()
  return (
    <>
    <button className="btn btn-primary mx-1" onClick={() => navigate('/admin/advertisements')}>Advertisements</button>
    <button className="btn btn-primary mx-1" onClick={() => navigate('/admin/users')}>Users</button>
    <button className="btn btn-primary mx-1" onClick={() => navigate('/admin/companies')}>Companies</button>
    <button className="btn btn-primary mx-1" onClick={() => navigate('/admin/applications')}>Applications</button>
    <button className="btn btn-primary mx-1" onClick={() => navigate('/admin/applications/communications')}>Applications communications</button>
    </>
  )
}

export default Admin