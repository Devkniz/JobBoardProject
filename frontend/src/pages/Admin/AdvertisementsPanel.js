import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UpdateJobOffer, CreateJobOffer, DeleteJobOffer } from "../../Scripts/Admin/AdvertisementsPanelActions"

function BuildAdminOffersTable() {
    const [jobOffers, setJobOffers] = useState([])
    const [companies, setCompanies] = useState([])
    
    useEffect(() => { {/*fetching advertisements*/}
        fetch('http://localhost:3001/advertisements')
            .then(response => response.json())
            .then(data => setJobOffers(data))
            .catch(err => console.error('Error fetching job offers:', err));
    }, [])

    useEffect(() => { {/*fetching companies*/}
        fetch('http://localhost:3001/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    }, [])
    
    
    const handleInputChange = (id, field, value) => {
        setJobOffers(prevOffers => 
            prevOffers.map( offer => {
            if(offer.id === id)
            {
               return {
                ...offer, 
                [field]:value
               }
            } else return offer
        }))}

    let content = (
        <table className='table adminPanel'>
            <thead>
                <tr>
                    <th scope="col" style={{width: '2.5%'}}>#</th>
                    <th scope="col" style={{width: '5%'}}>ID</th>
                    <th scope="col" style={{width: '15%'}}>Title</th>
                    <th scope="col" style={{width: '20%'}}>Resume</th>
                    <th scope="col" style={{width: '20%'}}>Description</th>
                    <th scope="col" style={{width: '10%'}}>Company</th>
                    <th scope="col" style={{width: '5%'}}>Wage</th>
                    <th scope="col" style={{width: '10%'}}>Place</th>
                    <th scope="col" style={{width: '7.5%'}}>Working time</th>
                    <th scope="col" style={{width: '7.5%'}}>Applications count</th>
                    <th scope="col" style={{width: '5%'}}>#</th>
                </tr>
            </thead>
            <tbody>
                {jobOffers.map(offer => (
                    <tr id={offer.id} key={offer.id}>
                        <td><button id='deleteButton' className="btn btn-danger" onClick={(e) => DeleteJobOffer(offer.id)}>-</button></td>
                        <td><p className="text-justify, form-control" type='number'>{offer.id}</p></td>
                        <td><input id='titleInput' type='text' className='form-control' value={offer.title} onChange={(e) => handleInputChange(offer.id, 'title', e.target.value)}></input></td>
                        <td><textarea id='resumeInput' className='form-control' value={offer.resume} onChange={(e) => handleInputChange(offer.id, 'resume', e.target.value)}></textarea></td>
                        <td><textarea id='descriptionInput' className='form-control' value={offer.description} onChange={(e) => handleInputChange(offer.id, 'description', e.target.value)}></textarea></td>
                        <td>
                            <select id='companyInput' className='form-control'>
                                {companies.map(company => (
                                    <option key={company.id} id={company.id} selected={offer.company_id === company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td><input id='wageInput' type='text' className='form-control' value={offer.wage} onChange={(e) => handleInputChange(offer.id, 'wage', e.target.value)}></input></td>
                        <td><input id='placeInput' type='text' className='form-control' value={offer.place} onChange={(e) => handleInputChange(offer.id, 'place', e.target.value)}></input></td>
                        <td><input id='workingTimeInput' type='text' className='form-control' value={offer.working_time} onChange={(e) => handleInputChange(offer.id, 'working_time', e.target.value)}></input></td>
                        <td><input id='applicationsCountInput' type='number' className='form-control' value={offer.applications_count} onChange={(e) => handleInputChange(offer.id, 'applications_count', e.target.value)}></input></td>
                        <td><button id='updateButton' className="btn btn-primary" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const id = row.id
                                const title = row.querySelector('#titleInput').value;
                                const resume = row.querySelector('#resumeInput').value;
                                const description = row.querySelector('#descriptionInput').value;
                                const companyInput = row.querySelector('#companyInput');
                                const company = companyInput.options[companyInput.selectedIndex].id;
                                const wage = row.querySelector('#wageInput').value;
                                const place = row.querySelector('#placeInput').value;
                                const workingTime = row.querySelector('#workingTimeInput').value;
                                const applications_count = row.querySelector('#applicationsCountInput').value;

                                const updatedOffer = {
                                    id: id,
                                    title: title,
                                    resume: resume,
                                    description: description,
                                    company_id: company,
                                    wage: wage,
                                    place: place,
                                    working_time: workingTime,
                                    applications_count: applications_count
                                };

                                UpdateJobOffer(updatedOffer)
                                }}>Save</button></td>
                    </tr>
                ))}
                    <tr id='createForm'>
                        <td></td>
                        <td></td>
                        <td><input id='titleInput' type='text' className='form-control'></input></td>
                        <td><textarea id='resumeInput' className='form-control'></textarea></td>
                        <td><textarea id='descriptionInput' className='form-control'></textarea></td>
                        <td>
                        <select id='companyInput' className='form-control'>
                                {companies.map(company => (
                                    <option key={company.id} id={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td><input id='wageInput' type='text' className='form-control'></input></td>
                        <td><input id='placeInput' type='text' className='form-control'></input></td>
                        <td><input id='workingTimeInput' type='text' className='form-control'></input></td>
                        <td><input id='applicationsCountInput' type='number' className='form-control'></input></td>
                        <td><button id='createButton' className="btn btn-success" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const title = row.querySelector('#titleInput').value;
                                const resume = row.querySelector('#resumeInput').value;
                                const description = row.querySelector('#descriptionInput').value;
                                const companyInput = row.querySelector('#companyInput');
                                const company = companyInput.options[companyInput.selectedIndex].id;
                                const wage = row.querySelector('#wageInput').value;
                                const place = row.querySelector('#placeInput').value;
                                const workingTime = row.querySelector('#workingTimeInput').value;
                                const applications_count = row.querySelector('#applicationsCountInput').value;

                                const updatedOffer = {
                                    title: title,
                                    resume: resume,
                                    description: description,
                                    company_id: company,
                                    wage: wage,
                                    place: place,
                                    working_time: workingTime,
                                    applications_count: applications_count
                                };

                                CreateJobOffer(updatedOffer)
                                }}>+</button></td>
                    </tr>
            </tbody>
        </table>
    )

    return content
}

const AdminPanel = () => {
  return BuildAdminOffersTable()
}

export default AdminPanel