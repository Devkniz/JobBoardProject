import { useState, useEffect } from "react";

export function GetAllOffers() {
    const [jobOffers, setJobOffers] = useState([])
    useEffect(() => { {/*fetching advertisements*/}
        fetch('http://localhost:3001/advertisements')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobOffers(data);
            })
            .catch(err => console.error('Error fetching job offers:', err));
    }, [])

    return jobOffers
}

export function GetSingleOffer(id) {
    const [jobOffer, setJobOffer] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/advertisements/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobOffer(data);
            })
            .catch(err => console.error('Error fetching single job offer:', err));
    }, [id])

    return jobOffer
}