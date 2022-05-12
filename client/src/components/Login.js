import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate();
  const initialValues={email:"",password:""}
  const [formValues,setFormValues]=useState(initialValues)
  const [formError,setFormError]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)

  const handleChange= (e)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value});
    console.log(formValues)
  }

  useEffect(()=>{
    console.log(formError)
    if(Object.keys(formError).length === 0 && isSubmit){
      console.log(formValues)
    }
  },[formError])

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setFormError(validate(formValues))
    setIsSubmit(true)
    const {email,password}= formValues;
    if(Object.keys(formError).length === 0){
      const res =await fetch("/signin",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json();
      console.log(data.message);
      console.log(data.status);
      console.log(res.status);
      if(res.status===201){
        window.alert("User logged in successfully")
        navigate("/")
      } 
      else{
        window.alert("Enter Valid Credentails")
      }
    }
  }

  const validate= (values)=>{
    const err= {};
    const reg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(!values.email){
      err.email="Email is required"
    }
    else if(!reg.test(values.email)){
      err.email="Please enter the correct email format";
    }
    if(!values.password){
      err.password="Password is required";
    }
    return err;
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className='container'>
      <h1>Login</h1>
        <div className="form-group">
          <input type="email" className="form-control" autoComplete='off'
          name="email"
          value={formValues.email}
          placeholder="Your Email"
          onChange={handleChange} 
         />
         <p>{formError.email}</p>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" autoComplete='off' 
         onChange={handleChange} name="password" value={formValues.password} placeholder="Your Password" />
        <p>{formError.password}</p>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login