import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UpdateCompany, CreateCompany, DeleteCompany } from "../../Scripts/Admin/CompaniesPanelActions"

function BuildAdminCompaniesTable() {
    const [companies, setCompanies] = useState([])

    useEffect(() => { {/*fetching companies*/}
        fetch('http://localhost:3001/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    }, [])
    
    
    const handleInputChange = (id, field, value) => {
        setCompanies(prevCompanies => 
            prevCompanies.map( company => {
            if(company.id === id)
            {
               return {
                ...company, 
                [field]:value
               }
            } else return company
        }))}

    let content = (
        <table className='table adminPanel'>
            <thead>
                <tr>
                    <th scope="col" style={{width: '2.5%'}}>#</th>
                    <th scope="col" style={{width: '10%'}}>ID</th>
                    <th scope="col" style={{width: '20%'}}>Name</th>
                    <th scope="col" style={{width: '62.5%'}}>Description</th>
                    <th scope="col" style={{width: '5%'}}>#</th>
                </tr>
            </thead>
            <tbody>
                {companies.map(company => (
                    <tr id={company.id} key={company.id}>
                        <td><button id='deleteButton' className="btn btn-danger" onClick={(e) => DeleteCompany(company.id)}>-</button></td>
                        <td><p className="text-justify, form-control" type='number'>{company.id}</p></td>
                        <td><input id='nameInput' type='text' className='form-control' value={company.name} onChange={(e) => handleInputChange(company.id, 'name', e.target.value)}></input></td>
                        <td><textarea id='descriptionInput' className='form-control' value={company.description} onChange={(e) => handleInputChange(company.id, 'description', e.target.value)}></textarea></td>
                        <td><button id='updateButton' className="btn btn-primary" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const id = row.id
                                const name = row.querySelector('#nameInput').value;
                                const description = row.querySelector('#descriptionInput').value;

                                const updatedcompany = {
                                    id: id,
                                    name: name,
                                    description: description
                                };

                                UpdateCompany(updatedcompany)
                                }}>Save</button></td>
                    </tr>
                ))}
                    <tr id='createForm'>
                        <td></td>
                        <td></td>
                        <td><input id='nameInput' type='text' className='form-control'></input></td>
                        <td><textarea id='descriptionInput' className='form-control'></textarea></td>
                        <td><button id='createButton' className="btn btn-success" onClick={(e) => {
                                const row = e.target.closest('tr');
                                
                                const name = row.querySelector('#nameInput').value;
                                const description = row.querySelector('#descriptionInput').value;

                                const newcompany = {
                                    name: name,
                                    description: description
                                };

                                CreateCompany(newcompany)
                                }}>+</button></td>
                    </tr>
            </tbody>
        </table>
    )

    return content
}

const AdminPanel = () => {
  return BuildAdminCompaniesTable()
}

export default AdminPanel