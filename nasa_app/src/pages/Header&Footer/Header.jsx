import React, { useState } from 'react';
import '../../scss/Header.scss';
 
import { IoReorderThree } from "react-icons/io5"; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const navigate = useNavigate()
    const [showLinks , setShowLinks] = useState(false)

    const logout =()=>{
       sessionStorage.removeItem('token')
       sessionStorage.removeItem('name')
       navigate('/')
    }
  return (
    <nav className="navbar">
      <div className='leftside' >
        <div className='links' id={showLinks ? 'hidden' : ''}>
          <Link to="/">Home</Link>
          <Link to="/apod">APDO</Link>
          <Link to="/mars">Mars Rover</Link>
          <Link to="/epic">EPIC</Link>
        </div>
        <button onClick={()=>setShowLinks(!showLinks)}><IoReorderThree /></button>
       
      </div>
      <div className='rightside'>
     {sessionStorage.getItem('token') &&
      <div className="profile">
      <FontAwesomeIcon icon={faRightToBracket} onClick={logout}  className='hoverable' title="logout"/>
       <span style={{fontSize : '20px', marginLeft : '10px'}}>  {sessionStorage.getItem('name')}</span>
     
      </div>
       }
      </div>
    </nav>
  );
};

export default Header;


 