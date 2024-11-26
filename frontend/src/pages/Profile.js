import { useEffect, useState } from 'react'
import '../css/Profile.css'
import { useAuth } from '../hooks/useAuth'
import { UpdateProfile } from '../Scripts/EditProfilePanel'

const Profile = () => {
    const { userEmail } = useAuth()
    const [user, setUser] = useState([])
    const [userOG, setUserOG] = useState([])
    const accessToken = localStorage.getItem('authToken')
    
    useEffect(() => { {/*fetching user*/}
        fetch('http://localhost:3001/auth/me', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({"email": userEmail})
            })
            .then(response => response.json())
            .then(data => {
                data["password"] = ''
                setUser(data)
                setUserOG(data)
            })
            .catch(err => console.error('Error fetching user:', err));
    }, [])
    
    const handleInputChange = (id, field, value) => {
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

  return (
    <div id='profile-container' className='profile-container row g-3'>
        <div className='col-md-6'>
            <label for="inputFirstName" className="form-label">First name</label>
            <input id='inputFirstName' type='text' className='form-control' value={user.first_name} 
            onChange={(e) => handleInputChange(user.id, 'first_name', e.target.value)}/>
        </div>
        <div className='col-md-6'>
            <label for="inputLastName" className="form-label">Last name</label>
            <input id='inputLastName' type='text' className='form-control' value={user.last_name} 
            onChange={(e) => handleInputChange(user.id, 'last_name', e.target.value)}/>
        </div>
        <div className='col-12'>
            <label for="inputEmail" className="form-label">Email</label>
            <input id='inputEmail' type='text' className='form-control' value={user.email} 
            onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}/>
        </div>
        <div className='col-12'>
            <label for="inputPhone" className="form-label">Phone</label>
            <input id='inputPhone' type='text' className='form-control' value={user.phone} 
            onChange={(e) => handleInputChange(user.id, 'phone', e.target.value)}/>
        </div>
        <div className='col-12'>
            <label for="inputPassWord" className="form-label">Password</label>
            <input id='inputPassWord' type='text' className='form-control'
            onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}/>
        </div>
        <button id='updateButton' className="btn btn-primary" onClick={(e) => {
                                const container = e.target.parentElement;
                                const id = user.id
                                const first_name = container.querySelector('#inputFirstName').value;
                                const last_name = container.querySelector('#inputLastName').value;
                                const email = container.querySelector('#inputEmail').value;
                                const phone = container.querySelector('#inputPhone').value;
                                const password = container.querySelector('#inputPassWord').value;

                                const updateduser = {
                                    id: parseInt(id),
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email,
                                    phone: phone,
                                    password: password
                                };
                                UpdateProfile(updateduser, userOG)
                                }}>Save</button>
    </div>
  )
}

export default Profile