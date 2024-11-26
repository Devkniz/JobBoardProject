import axios from 'axios'
import { useAuth } from '../../hooks/useAuth';
export function UpdateJobOffer(updatedOffer) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/advertisements/update/${updatedOffer.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(updatedOffer)})
    .then(function (response) {
        if(response.status === 200)
            alert("Offer updated successfully")
        else
            alert('Error while updating offer: ', response.status)
        window.location.reload()
    });
}

export function CreateJobOffer(newOffer) {
    const accessToken = localStorage.getItem('authToken')
    fetch('http://localhost:3001/advertisements', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(newOffer)})
    .then(function (response) {
        if(response.status === 200)
            alert("Offer created successfully")
        else
            alert('Error while creating offer: ', response.status)
        window.location.reload()
      });
}

export function DeleteJobOffer(offerID) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/advertisements/remove/${offerID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }})
    .then(function (response) {
        if(response.status === 200)
            alert("Offer removed successfully")
        else
            alert('Error while removing offer: ', response.status)
        window.location.reload()
      });
}