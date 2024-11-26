import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"
import '../css/MyApplications.css'

const MyApplications = () => {
    const email = useAuth().userEmail
    const [ApplicationsToOffers, setApplicationsToOffers] = useState([])
    let accessToken = localStorage.getItem('authToken')

    useEffect(() => {
        fetch(`http://localhost:3001/applications/user/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(applicationsData => {
            const fetchOffers = applicationsData.map(app =>
                fetch(`http://localhost:3001/advertisements/${app.advertisement_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(offerData => ({ application: app, offer: offerData }))
            );

            Promise.all(fetchOffers).then(results => {
                setApplicationsToOffers(results);
            });
        })
        .catch(err => console.error('Error fetching user applications or offers:', err));
    }, [email, accessToken])

    return (
        <div className="applicaitons-page">
            <div className="allApplications">
                {ApplicationsToOffers.map(({ application, offer }) => (
                        <div className="card applicaiton scaleUp">
                            <div key={application.id} className="card-body">
                                <h5 className="card-title">{offer.title}</h5>
                                <p className="card-text">Status: {application.status}</p>
                                <p className="card-text">Applied at: {application.applied_at}</p>
                                <p className="card-text">Last updated at: {application.update_at}</p>
                                <Link to={`/advertisements/offer/${offer.id}`} className="btn btn-primary">View Offer</Link>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default MyApplications;
