import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/advertisements'); // Call navigate on button click
  };


  const content = (
    <div className="home-div">
      <h1>Welcome to JobSphere</h1>
      <h3>Find Your Dream Job</h3>
      <Button onClick={handleClick}>Get Started</Button>
    </div>
  );

  return content;
};

export default Home;
