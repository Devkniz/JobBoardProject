import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UpdateApplication, CreateApplication, DeleteApplication } from "../../Scripts/Admin/ApplicationsPanelActions"

function BuildApplicationsTable() {
    const accessToken = localStorage.getItem('authToken')
    const [applications, setApplications] = useState([])
    const [advertisements, setAdvertisements] = useState([])
    const appStatus = ['pending','interviewed','rejected','accepted']
    useEffect(() => { {/*fetching advertisements*/}
        fetch('http://localhost:3001/applications', {
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }})
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(err => console.error('Error fetching applications:', err));
    }, [])

    useEffect(() => { {/*fetching advertisements*/}
        fetch('http://localhost:3001/advertisements', {
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setAdvertisements(data))
            .catch(err => console.error('Error fetching ads:', err));
    }, [])
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleInputChange = (id, field, value) => {
        setApplications(prevApps => 
            prevApps.map( app => {
            if(app.id === id)
            {
               return {
                ...app, 
                [field]:value
               }
            } else return app
        }))}

    let content = (
        <table className='table adminPanel'>
            <thead>
                <tr>
                    <th scope="col" style={{width: '2.5%'}}>#</th>
                    <th scope="col" style={{width: '5%'}}>ID</th>
                    <th scope="col" style={{width: '5%'}}>Communication ID</th>
                    <th scope="col" style={{width: '15%'}}>Advertisement ID</th>
                    <th scope="col" style={{width: '20%'}}>Status</th>
                    <th scope="col" style={{width: '20%'}}>Applied at</th>
                    <th scope="col" style={{width: '10%'}}>Updated at</th>
                    <th scope="col" style={{width: '5%'}}>First name</th>
                    <th scope="col" style={{width: '10%'}}>Last Name</th>
                    <th scope="col" style={{width: '7.5%'}}>Email</th>
                    <th scope="col" style={{width: '5%'}}>#</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(application => (
                    <tr id={application.id} key={application.id}>
                        <td><button id='deleteButton' className="btn btn-danger" onClick={(e) => DeleteApplication(application.id)}>-</button></td>
                        <td><p className="text-justify, form-control" type='number'>{application.id}</p></td>
                        <td><p className="text-justify, form-control" type='number'>{application.communication_id}</p></td>
                        <td>
                            <select id='adInput' className='form-control'>
                                {advertisements.map(ad => (
                                    <option key={ad.id} id={ad.id} selected={application.advertisement_id === ad.id}>
                                        {ad.title}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id='statusInput' className='form-control'>
                                {appStatus.map(status => (
                                    <option selected={application.status === status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td><input
                            id="appliedAtInput"
                            type='date'
                            value={application.applied_at ? formatDate(new Date(application.applied_at)) : ''}
                            onChange={(e) => handleInputChange(application.id, 'applied_at', e.target.value)}
                        /></td>
                    <td><input
                            id="updateAtInput"
                            type='date'
                            value={formatDate(new Date())}
                            onChange={(e) => handleInputChange(application.id, 'update_at', e.target.value)}
                        /></td>           
                        <td><input id='firstNameInput' type='text' className='form-control' value={application.first_name} onChange={(e) => handleInputChange(application.id, 'first_name', e.target.value)}></input></td>
                        <td><input id='lastNameInput' className='form-control' value={application.last_name} onChange={(e) => handleInputChange(application.id, 'last_name', e.target.value)}></input></td>
                        <td><input id='emailInput' className='form-control' value={application.email} onChange={(e) => handleInputChange(application.id, 'email', e.target.value)}></input></td>
                        <td><button id='updateButton' className="btn btn-primary" onClick={(e) => {
                                const row = e.target.closest('tr');
                                const adInput = row.querySelector('#adInput')
                                const statusInput = row.querySelector('#statusInput')

                                const id = row.id
                                const ad_id = adInput.options[adInput.selectedIndex].id;
                                const status = statusInput.options[statusInput.selectedIndex].innerText;
                                const applied_at = row.querySelector('#appliedAtInput').value;
                                const update_at = row.querySelector('#updateAtInput').value;
                                const first_name = row.querySelector('#firstNameInput').value;
                                const last_name = row.querySelector('#lastNameInput').value;
                                const email = row.querySelector('#emailInput').value;

                                const updatedApp = {
                                    id: id,
                                    advertisement_id: ad_id,
                                    status: status,
                                    applied_at: applied_at,
                                    update_at: update_at,
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email,
                                };

                                UpdateApplication(updatedApp)
                                }}>Save</button></td>
                    </tr>
                ))}
                    <tr id='createForm'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <select id='adInput' className='form-control'>
                                {advertisements.map(ad => (
                                    <option key={ad.id} id={ad.id}>
                                        {ad.title}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id='statusInput' className='form-control'>
                                {appStatus.map(status => (
                                    <option>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td><input
                            id="appliedAtInput"
                            type='date'
                            value={formatDate(new Date())}
                        /></td>
                        <td><input
                            id="updateAtInput"
                            type='date'
                            value={formatDate(new Date())}
                        /></td>                       
                        <td><input id='firstNameInput' type='text' className='form-control'></input></td>
                        <td><input id='lastNameInput' className='form-control'></input></td>
                        <td><input id='emailInput' className='form-control'></input></td>
                        <td><button id='createButton' className="btn btn-success" onClick={(e) => {
                                const row = e.target.closest('tr');
                                const adInput = row.querySelector('#adInput')
                                const statusInput = row.querySelector('#statusInput')

                                const ad_id = adInput.options[adInput.selectedIndex].id;
                                const status = statusInput.options[statusInput.selectedIndex].innerText;
                                const applied_at = row.querySelector('#appliedAtInput').value;
                                const update_at = row.querySelector('#updateAtInput').value;
                                const first_name = row.querySelector('#firstNameInput').value;
                                const last_name = row.querySelector('#lastNameInput').value;
                                const email = row.querySelector('#emailInput').value;

                                const updatedApp = {
                                    advertisement_id: ad_id,
                                    status: status,
                                    applied_at: applied_at,
                                    update_at: update_at,
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email
                                };

                                CreateApplication(updatedApp)
                                }}>+</button></td>
                    </tr>
            </tbody>
        </table>
    )

    return content
}

const AdminPanel = () => {
  return BuildApplicationsTable()
}

export default AdminPanel