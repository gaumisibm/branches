import React from 'react'
import { useEffect, useState } from 'react';
import './home.scss';

const Home = () => {

  const [userData, setUserData]=useState({});

const callHome = async() => {
  try {
    const res= await fetch('/home',{
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
  }
}

useEffect(()=>{
  callHome();
},[]);

  return (
    <div>
      <div className='containers'>
        <h1>Hello,  </h1>
        <h1> We are MERN developer</h1>
        <div className='left'>
          <h1>{userData.name}</h1>
        </div>
      </div>
    </div>
  )
}

export default Home