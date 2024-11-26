export function UpdateProfile(updatedUser, userOG) {
    ["first_name", "last_name", "email", "phone", "password"].forEach(field => {
        if (updatedUser[field] === userOG[field]) {
            delete updatedUser[field];
        }
    });
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/auth/updateprofil`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(updatedUser)})
    .then(function (response) {
        if(response.status === 200)
        {
           alert("User updated successfully")
           window.location.reload()
        }
            
        else
            alert('Error while updating user: ', response.status)
    });
}