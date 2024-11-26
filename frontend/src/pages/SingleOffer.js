import { useParams } from "react-router-dom"
import { GetSingleOffer } from '../APIs/JobOffers.js'
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";
import '../css/SingleOffer.css';
import { Button } from "react-bootstrap";

const SingleOffer = () => {
  let content
  const { id } = useParams()
  const jobOffer = GetSingleOffer(id)

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [email_subject, setEmailSubject] = useState('');
  const [email_body, setEmailBody] = useState('');
  const [resume, setResume] = useState('');
  const [showForm, setShowForm] = useState(false); // État pour contrôler l'affichage du formulaire
  const { isLogged, userEmail } = useAuth();
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (isLogged) {
      fetch('http://localhost:3001/auth/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ "email": userEmail })
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setEmail(data.email || '');
      })
      .catch(err => console.error('Error fetching user:', err));
    }
  }, [isLogged, userEmail, accessToken]);

  if (jobOffer.length === 0) {
    return <h1>No offer found for this ID</h1>
  }

  const SubmitForm = (e) => {
    e.preventDefault();

    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      email_subject: email_subject,
      email_body: email_body,
      advertisement_id: id,
      resume: resume
    }
    fetch('http://localhost:3001/applications', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        else {
          return result.json().then(error => {
            throw new Error(error.error)
          })
        }
      })
      .then((data) => {
        alert('Apply Successfully !');
        window.location.href = '/advertisements';
      })
  }

  const handleShowForm = () => {
    setShowForm(!showForm);
  }

  content = (
    <div className="offer-page">
        <div className="card singleOffer">
          <div className="card-body">
              <h4 className="card-title">{jobOffer.title}</h4>
              <h6 className="card-text">{jobOffer.resume}</h6>
              <br></br>
              <h5>Job description:</h5>
              <p className="card-text">{jobOffer.description}</p>
              <br></br>
              <h5>Wage:</h5>
              <p className="card-text">{jobOffer.wage}$</p>
              <br></br>
              <h5>Working time:</h5>
              <p className="card-text">{jobOffer.working_time}</p>
              <br></br>
              <h5>Place:</h5>
              <p className="card-place">{jobOffer.place}</p>
              <br></br>
              <h5>Applications count:</h5>
              <p className="card-text applicationsCount">{jobOffer.applications_count}</p>
          </div>
        </div>

        <div className="apply-div">
          {/* Button to show/hide the form */}
          <Button onClick={handleShowForm}>{showForm ? 'Hide Form' : 'Apply Now'}</Button>

          {/* Display the form */}
          <div className={`form-container ${showForm ? 'show' : 'hide'}`}>
            <form className="applyJob wrapper">
              <div className='apply-form'>
                <input type='text' name='first_name' placeholder='First name' value={first_name} required onChange={(e) => { setFirstName(e.target.value) }} />
              </div>
              <div className='apply-form'>
                <input type='text' name='last_name' placeholder='Last name' value={last_name} required onChange={(e) => { setLastName(e.target.value) }} />
              </div>
              <div className='apply-form'>
                <input type='email' name='email' placeholder='E-mail' value={email} required onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className='apply-form'>
                <input type='text' name='email_subject' placeholder='Subject' required onChange={(e) => { setEmailSubject(e.target.value) }} />
              </div>
              <div className='apply-form'>
                <textarea name='email_body' placeholder='Your message...' required onChange={(e) => { setEmailBody(e.target.value) }} />
              </div>
              <Button onClick={SubmitForm}>Apply</Button>
            </form>
          </div>
        </div>

    </div>
  )

  return content
}

export default SingleOffer
