import axios from 'axios'

export function UpdateCompany(updatedCompany) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/companies/update/${updatedCompany.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(updatedCompany)})
    .then(function (response) {
        if(response.status === 200)
            alert("Company updated successfully")
        else
            alert('Error while updating company: ', response.status)
        window.location.reload()
    });
}

export function CreateCompany(newCompany) {
    const accessToken = localStorage.getItem('authToken')
    fetch('http://localhost:3001/companies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(newCompany)})
    .then(function (response) {
        if(response.status === 200)
            alert("Company created successfully")
        else
            alert('Error while creating company: ', response.status)
        window.location.reload()
      });
}

export function DeleteCompany(companyID) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/companies/remove/${companyID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }})
    .then(function (response) {
        if(response.status === 200)
            alert("Company removed successfully")
        else
            alert('Error while removing company: ', response.status)
        window.location.reload()
      });
}