import axios from 'axios'
import { useAuth } from '../../hooks/useAuth';
export function UpdateApplication(updatedApp) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/applications/${updatedApp.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(updatedApp)})
    .then(function (response) {
        if(response.status === 200)
            alert("Application updated successfully")
        else
            alert('Error while updating application: ', response["error"])
        window.location.reload()
    });
}

export function CreateApplication(newApp) {
    const accessToken = localStorage.getItem('authToken')
    fetch('http://localhost:3001/applications/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(newApp)})
    .then(function (response) {
        if(response.status === 200)
            alert("Applicaiton created successfully")
        else
            alert('Error while creating application: ', response.status)
        window.location.reload()
      });
}

export function DeleteApplication(appID) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/applications/${appID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }})
    .then(function (response) {
        if(response.status === 200)
            alert("Application removed successfully")
        else
            alert('Error while removing application: ', response.status)
        window.location.reload()
      });
}