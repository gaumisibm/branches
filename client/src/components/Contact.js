import React from 'react'
import './contact.scss'
import { useEffect, useState } from 'react'
const Contact = () => {
  const data=[{
    name : "Phone",
    value : "+918874839920"
  },
  {
    name : "Email",
    value : "contactus@gmail.com"
  },
  {
    name : "Address",
    value : "Muzaffarpur,Bihar"
  }
]
const initialValues = {name: "", email: "",number: "", message: ""}
const [userData, setUserData]=useState({});

const callContact = async() => {
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
    setUserData({...userData, name: data.name, email:data.email, number: data.number})

  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  callContact();
},[]);

const handleChange = (e) =>{
  const {name, value}=e.target;
  setUserData({...userData, [name]:value});
  console.log(userData)
}

const handlePost = async(e) =>{
  e.preventDefault();
  try {
    const {name, email, number, message}= userData
    const res = await fetch('/contactUs',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         name, email,number, message
      })
    })
    const data = await res.json()
    if(!data){
      window.alert("message is not being sent")
    }else{
      window.alert("message is successfully sent")
      setUserData({...userData, message:""})
    }
  } catch (error) {
    console.log("Hi mera dil")
    console.log(error);
  }

}

  return (
    <div>
      <div type='submit' className='containers'>
      <div className='up'>
          <div className='ele'>
            <div className='nam'>Phone</div>
            <div>+91828398979879</div>
          </div>
          <div className='ele'>
            <div className='nam'>Phone</div>
            <div>+91828398979879</div>
          </div>
          <div className='ele'>
            <div className='nam'>Phone</div>
            <div>+91828398979879</div>
          </div>
        </div>
        <div className='down'>
          <h1>Get in touch</h1>
          <div className='firstRow'>
            <input type="text" className="form-control" style={{marginRight:" 0px 20px"}} name="name" placeholder='Your Name' value={userData.name}/>
            <input type="email" className="form-control" style={{marginRight:" 0px 20px"}} name="email" placeholder='Your Email' value={userData.email}/>
            <input type="text" className="form-control" style={{marginRight:" 0px 20px"}} name="number" placeholder='Your Phone Number' value={userData.number}/>
          </div>
          <div className='secondRow'>
            <label className='labelSec'>Message:    </label>
            <textarea className="form-control" name='message' placeholder='Enter Your Message' value={userData.message} onChange={handleChange}/>
          </div>
        </div>
        <button type='submit' className='btn btn-primary' onClick={handlePost}>Send Message</button>
      </div>
    </div>
  )
}

export default Contact