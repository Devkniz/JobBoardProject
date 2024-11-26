import React, { useState } from 'react'
import { FaUserAlt, FaLock, FaPhone } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import {Link, useNavigate } from "react-router-dom"

const SignUp = () => {
  
  const navigate = useNavigate();  
const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const SubmitForm = (e) => {
    e.preventDefault();
    const data = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      password: password
    }
    fetch('http://localhost:3001/users/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(`An error occurred: ${errorData.error}`);
        });
      }
      navigate("/login");
    })
    .catch(err => {
      console.error('Error:', err.message);
    });
    
    }
  return (
    <div className='wrapper'>
        <form onSubmit={SubmitForm}>
          <h1>Sign up !</h1>
          <div className='input-box'>
              <input type='text' name ='first_name' placeholder='First name' required onChange={(e => {setFirstName(e.target.value)})}/>
              <FaUserAlt className='icon' />
          </div>
          <div className='input-box'>
              <input type='text' name='last_name' placeholder='Last name' required onChange={(e => {setLastName(e.target.value)})}/>
              <FaUserAlt className='icon' />
          </div>
          <div className='input-box'>
              <input type='text' name='phone' placeholder='Phone number' required onChange={(e => {setPhone(e.target.value)})}/>
              <FaPhone className='icon' />
          </div>

          <div className='input-box'>
              <input type='email' name='email' placeholder='E-mail' required onChange={(e => {setEmail(e.target.value)})}/>
              <MdEmail className='icon' />
          </div>
          <div className='input-box'>
              <input type='password' name='password' placeholder='Password' required onChange={(e => {setPassword(e.target.value)})}/>
              <FaLock className='icon' />
          </div>
          <button type='submit'>Sign up</button>

          <div className="register-link">
            <p>Already have an account?<Link to='/login'> Sign in</Link></p>
          </div>
        </form>
    </div>
  )
}

export default SignUp