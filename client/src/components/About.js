import React, { useEffect, useState } from 'react'
import './generalStyle.scss'
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate=useNavigate();
  const [userData, setUserData]=useState({});

  const callAboutPage = async() => {
    try {
      const res= await fetch('/about',{
        method: "GET",
        headers: {
          Accept : "application/json",
          "Content-Type": "application/json" 
        },
        credentials:"include" // for adding cookies 
      })

      const data = await res.json();
      console.log(data);
      setUserData(data)

    } catch (error) {
      console.log(error);
      navigate("/login")
    }
  }

  useEffect(()=>{
    callAboutPage();
  },[]);

  return (
    <div className='errorpage'>
      <h1>This Above Page is under construction </h1>
      <h1>Thank you loggin in {userData.name}</h1>
      <h2>Your Email address {userData.email}</h2>
      <h2>Your number : {userData.number}</h2>
      <h2>Your profession {userData.profession}</h2>
      <h2>Kahi aur par search karlo aapne baare me</h2>
    </div>
  )
}

export default About