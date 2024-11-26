import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {Button, Container, Form, Nav, Navbar, NavDropdown, Row, Col} from "react-bootstrap"
import { useState } from "react";
import '../css/Global.css'


const Header = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      alert('Please give a word to search');
      return;
    }
    fetch(`http://localhost:3001/advertisements/search/${keyword}`, {
      method: 'GET'
    })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      else{
        return result.json().then(error => {
          throw new Error(error.error);
        })
      }
    })
    .then((data) => {
      navigate('/advertisements/result', {state: {results: data}});
    })
  }

  const { isLogged, userRole } = useAuth()
  const newHeader = (
    <Navbar className='custom-navbar' expand="lg">
      <Container>
        <Navbar.Brand><Link to='/'>JobSphere</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLogged && (<Nav.Link><Link to="/myapplications">My Applications</Link></Nav.Link>)}
          </Nav>
          <Nav className="flex-grow-1">
            <Form inline className="d-flex" style={{width: '100%'}}>
                <Form.Control
                  type="text"
                  className="mr-sm-2"
                  name="keyword"
                  onChange={(e) => {setKeyword(e.target.value)}}
                />
                  <Button type="submit" onClick={search}>Search</Button>
            </Form>
          </Nav>
          <Nav className="ms-auto" style={{paddingRight: '13vh'}}>
            {!isLogged && (
              <NavDropdown title="Menu">
                <NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/signup">Sign Up</Link></NavDropdown.Item>
              </NavDropdown>
            )
            }
            {isLogged && (
              <NavDropdown title="Menu">
                <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/' onClick={() => {
                  fetch('http://localhost:3001/logout', {method: 'POST'})
                  localStorage.removeItem('authToken')
                }}>Logout</Link></NavDropdown.Item>
              </NavDropdown>
            )
            }

            {userRole === 'admin' && (
              <NavDropdown title="Admin">
                <NavDropdown.Item><Link to="/admin/advertisements">Advertisements Panel</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/admin/users">Users Panel</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/admin/companies">Companies Panel</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/admin/applications">Applications Panel</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/admin/applications/communications">Applications Communications Panel</Link></NavDropdown.Item>
              </NavDropdown>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return newHeader;
};

export default Header;
