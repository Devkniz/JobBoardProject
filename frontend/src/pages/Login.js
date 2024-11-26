import React, { useState } from 'react'
import '../css/Login.css'
import { FaUserAlt, FaLock } from "react-icons/fa"
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';





const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const SubmitForm = (e) =>{
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    fetch("http://localhost:3001/auth/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        alert("email or password is incorrect")
        return
      }
        return response.json();
    })
    .then((data) => {
      if(!data)
        return
      localStorage.setItem('authToken', data.accessToken)
      let role = jwtDecode(data.accessToken).UserInfos.role
      if (role === 'admin')
          navigate ('/admin');
      else
        navigate ('/advertisements');
    })
      }
  return (
    <div className='wrapper'>
        <form onSubmit={SubmitForm}>
          <h1>Login</h1>
          <div className='input-box'>
              <input type='email' placeholder='Email' required onChange={(e) => {setEmail(e.target.value)}}/>
              <FaUserAlt className='icon' />
          </div>
          <div className='input-box'>
              <input type='password' placeholder='Password' required onChange={(e) => {setPassword(e.target.value)}}/>
              <FaLock className='icon' />

          </div>

          <div className='remember-forgot'>
              <label className="remember"><input type='checkbox' />Remember me</label>
              <a href='#'>Forgot password?</a>
          </div>

          <button type='submit'>Log in!</button>

          <div className="register-link">
            <p>Don't have an account?<Link className="register" to='/signup'> Register</Link></p>
          </div>
        </form>
    </div>
  )
}

export default Login