import React from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function HomePage(){
    const navigate = useNavigate();
   
    const handleSearchClick = () => {
        navigate('/search');
      };


    return(
    <div className='welcome-ui'>
        
        <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="logo"className="logo" />
        <h1 >YakshaKosha</h1>
        <p className="welcome-msg">
            Welcome to YakshaKosha! An ultimate digital library of resources:)<br/><br/>
            Navigate through our vast collection of data particular to each Prasanga.<br/>
            Also do not forget to keep track of new updates to the repo to ensure you always 
            have the latest materials at your fingertips.<br/>
            <br/>
            Thank you for choosing YakshaKosha. <br/>
            We hope this platform enhances your performance preparation and helps perfect your craft.
            <br/>
            Enjoy exploring!
        </p> 
        <button onClick={handleSearchClick} >Dive In</button>
    </div>
    )
}

export default HomePage