import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../css/AllOffers.css'

const AllOffers = () => {
    const navigate = useNavigate()
    const { page } = useParams()
    const [paginationInfos, setCurrentPaginationInfos] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/advertisements/pagination/${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCurrentPaginationInfos(data);
            })
            .catch(err => console.error('Error fetching job offers:', err));
    }, [page]);

    const numbersArray = []
    for(let i = 1; i <= paginationInfos.pages; i++)
        numbersArray.push(i)
    let content = (
        <div className='offers-page'>
            <div className='allOffers'>
                {Array.isArray(paginationInfos.result) ? (
                        paginationInfos.result.map(offer => (
                            <div className="card offer scaleUp" key={offer.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{offer.title}</h5>
                                    <p className="card-text">{offer.resume}</p>
                                    <p className="card-place">Where: {offer.place}</p>
                                    <p className="card-text applicationsCount">{offer.applications_count}</p>
                                    <Link to={`/advertisements/offer/${offer.id}`} className="btn btn-primary">Learn More</Link>
                                </div>
                            </div>
                        ))
                    ) : (<p>No offers available.</p>)}
            </div>
            <div className="d-flex flex-row pages-nb">
                {numbersArray.map((number) => (
                    <button key={number} onClick={() => navigate(`/advertisements/${number}`)} className="btn btn-primary mx-1">
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )

    return content
}

export default AllOffers