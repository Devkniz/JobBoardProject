import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UpdateUser, CreateUser, DeleteUser } from "../../Scripts/Admin/UsersPanelActions"

function BuildAdminUsersTable() {
    const accessToken = localStorage.getItem('authToken')
    const [usersOG, setUsersOG] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => { {/*fetching users*/}
        fetch('http://localhost:3001/users', {
            headers: {'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`
            }})
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setUsersOG(data);
            })
            .catch(err => console.error('Error fetching users:', err));
    }, [])

    const handleInputChange = (id, field, value) => {
        setUsers(prevUsers => 
            prevUsers.map( user => {
            if(user.id === id)
            {
               return {
                ...user, 
                [field]:value
               }
            } else return user
        }))}

    let content = (
        <table className='table adminPanel'>
            <thead>
                <tr>
                    <th scope="col" style={{width: '2.5%'}}>#</th>
                    <th scope="col" style={{width: '10%'}}>ID</th>
                    <th scope="col" style={{width: '10%'}}>First name</th>
                    <th scope="col" style={{width: '10%'}}>Last name</th>
                    <th scope="col" style={{width: '10%'}}>Email</th>
                    <th scope="col" style={{width: '10%'}}>Phone</th>
                    <th scope="col" style={{width: '10%'}}>Role</th>
                    <th scope="col" style={{width: '10%'}}>Password</th>
                    <th scope="col" style={{width: '5%'}}>#</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr id={user.id} key={user.id}>
                        <td><button id='deleteButton' className="btn btn-danger" onClick={(e) => DeleteUser(user.id)}>-</button></td>
                        <td><p className="text-justify, form-control" type='number'>{user.id}</p></td>
                        <td><input id='firstNameInput' type='text' className='form-control' value={user.first_name} onChange={(e) => handleInputChange(user.id, 'first_name', e.target.value)}></input></td>
                        <td><input id='lastNameInput' className='form-control' value={user.last_name} onChange={(e) => handleInputChange(user.id, 'last_name', e.target.value)}></input></td>
                        <td><input id='emailInput' className='form-control' value={user.email} onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}></input></td>
                        <td><input id='phoneInput' className='form-control' value={user.phone} onChange={(e) => handleInputChange(user.id, 'phone', e.target.value)}></input></td>
                        <td><p className="text-justify, form-control" type='number'>{user.role}</p></td>
                        <td><input id='passwordInput' className='form-control' value={user.password} onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}></input></td>
                        <td><button id='updateButton' className="btn btn-primary" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const id = row.id
                                const first_name = row.querySelector('#firstNameInput').value;
                                const last_name = row.querySelector('#lastNameInput').value;
                                const email = row.querySelector('#emailInput').value;
                                const phone = row.querySelector('#phoneInput').value;
                                const password = row.querySelector('#passwordInput').value;

                                const updateduser = {
                                    id: parseInt(id),
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email,
                                    phone: phone,
                                    password: password
                                };
                                let og = usersOG.find(user => updateduser.id === user.id)
                                UpdateUser(updateduser, og)
                                }}>Save</button></td>
                    </tr>
                ))}
                    <tr id='createForm'>
                        <td></td>
                        <td></td>
                        <td><input id='firstNameInput' type='text' className='form-control'></input></td>
                        <td><input id='lastNameInput' className='form-control'></input></td>
                        <td><input id='emailInput' className='form-control'></input></td>
                        <td><input id='phoneInput' className='form-control'></input></td>
                        <td><p className="text-justify, form-control" type='number'>user</p></td>
                        <td><input id='passwordInput' className='form-control'></input></td>
                        <td><button id='createButton' className="btn btn-success" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const first_name = row.querySelector('#firstNameInput').value;
                                const last_name = row.querySelector('#lastNameInput').value;
                                const email = row.querySelector('#emailInput').value;
                                const phone = row.querySelector('#phoneInput').value;
                                const password = row.querySelector('#passwordInput').value;

                                const newuser = {
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email,
                                    phone: phone,
                                    password: password
                                };

                                CreateUser(newuser)
                                }}>+</button></td>
                    </tr>
            </tbody>
        </table>
    )

    return content
}

const AdminPanel = () => {
  return BuildAdminUsersTable()
}

export default AdminPanel