export function UpdateUser(updatedUser, usersOG) {
    ["first_name", "last_name", "email", "phone", "password"].forEach(field => {
        if (updatedUser[field] === usersOG[field]) {
            delete updatedUser[field];
        }
    });
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/users/update/${updatedUser.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(updatedUser)})
    .then(function (response) {
        if(response.status === 200)
            alert("User updated successfully")
        else
            alert('Error while updating user: ', response.status)
        window.location.reload()
    });
}

export function CreateUser(newUser) {
    const accessToken = localStorage.getItem('authToken')
    fetch('http://localhost:3001/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify(newUser)})
    .then(function (response) {
        if(response.status === 200)
            alert("User created successfully")
        else
            alert('Error while creating user: ', response.status)
        window.location.reload()
      });
}

export function DeleteUser(userID) {
    const accessToken = localStorage.getItem('authToken')
    fetch(`http://localhost:3001/users/remove/${userID}`, {
        headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }, 
        method: 'DELETE'
    })
    .then(function (response) {
        if(response.status === 200)
            alert("User removed successfully")
        else
            alert('Error while removing user: ', response.status)
        window.location.reload()
      });
}