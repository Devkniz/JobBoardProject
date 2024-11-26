import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/AllOffers.css'

const AdvertisementsResult = () => {
    const location = useLocation();
    const {results} = location.state || {};
    return (
        <div className='offers-page'>
            <div className='allOffers'>
                {Array.isArray(results) ? (
                        results.map(offer => (
                            <div className="card offer" key={offer.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{offer.title}</h5>
                                    <p className="card-text">{offer.resume}</p>
                                    <p className="card-place">Place: {offer.place}</p>
                                    <p className="card-text applicationsCount">{offer.applications_count}</p>
                                    <Link to={`/advertisements/offer/${offer.id}`} className="btn btn-primary">Learn More</Link>
                                </div>
                            </div>
                        ))
                    ) : (<p>No offers available.</p>)}
            </div>
        </div>
    )
}

export default AdvertisementsResult;