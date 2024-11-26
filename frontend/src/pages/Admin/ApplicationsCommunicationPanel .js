import { useState, useEffect } from "react"

function BuildApplicationsCommunicationTable() {
    const accessToken = localStorage.getItem('authToken')
    const [communications, setCommunications] = useState([])
    useEffect(() => { {/*fetching communications*/}
        fetch('http://localhost:3001/applications/communications', {
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }})
            .then(response => response.json())
            .then(data => setCommunications(data))
            .catch(err => console.error('Error fetching communications:', err));
    }, [])

    let content = (
        <table className='table adminPanel'>
            <thead>
                <tr>
                    <th scope="col" style={{width: '5%'}}>ID</th>
                    <th scope="col" style={{width: '30%'}}>Email subject</th>
                    <th scope="col" style={{width: '55%'}}>Email body</th>
                    <th scope="col" style={{width: '10%'}}>Sent at</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(communications) ? (
                communications.map(communications => (
                    <tr id={communications.id} key={communications.id}>
                        <td><p className="text-justify form-control" type='number'>{communications.id}</p></td>
                        <td><textarea className="text-justify form-control" value={communications.email_subject} readOnly></textarea></td>
                        <td><textarea className="text-justify form-control" value={communications.email_body} readOnly></textarea></td>
                        <td><p className="text-justify form-control" type='date'>{communications.sent_at}</p></td>
                    </tr>
                ))
                ) : (<h1>No communications available.</h1>)}

            </tbody>
        </table>
    )

    return content
}

const AdminPanel = () => {
  return BuildApplicationsCommunicationTable()
}

export default AdminPanel