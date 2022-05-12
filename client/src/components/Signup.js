import React, { useEffect, useState } from 'react'
import './signup.scss'
import 'bootstrap/dist/css/bootstrap.css'
import {useNavigate} from 'react-router-dom'


const Signup = () => {
  let navigate=useNavigate();
  const initialValues = {name:"", email: "", number: "", profession:"", password: "", cpassword: ""}
  const [formValues, setFormValues] = useState(initialValues)
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit]=useState(false);
  
  const handleChange = (e)=>{
    // console.log(e.target.name)
    // console.log(e.target.value)
    const {name, value} = e.target
    setFormValues({...formValues,[name]:value});
    console.log(formValues);
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  console.log("Inside handleSubmit")
  setFormError(validate(formValues))
  console.log("After setFormError")
  setIsSubmit(true)
  console.log("After setIsSubmit")
  sendMongo();
}

const sendMongo = async() =>{
  if(Object.keys(formError).length === 0 && isSubmit){
    console.log("Inside if statement")
      const {name, email, number, profession, password, cpassword} = formValues;
      const res = await fetch("/register",{
        method:"POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          number,
          profession,
          password,
          cpassword
        })
      })
      const data = await res.json();
      console.log(data.message);
  
      if(data.status === 422 || !data){
        window.alert("Registration Failed ")
        console.log("Registration failed")
      }
      else{
        window.alert("Registration is successful");
        console.log("Registration is successful")
        navigate('/login')
      }
    }
}

useEffect(()=>{
  console.log("Inside useEffect")
  // console.log(formError)
  if(Object.keys(formError).length === 0 && isSubmit){
    console.log(formValues);
  }

},[formError])

const validate = (values)=>{
  console.log("Inside Validate")
  const err = {};
  const reg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  if(!values.name){
    err.name="Name is required"
  }
  if(!values.email){
    err.email="Email is required"
  }else if(!reg.test(values.email)){
      err.email="Please enter the correct email format"
  }
  if(!values.number){
    err.number="Number is required"
  }
  if(!values.password){
    err.password="Password is required"
  }
  if(!values.cpassword){
    err.cpassword="Confirm Password is required"
  }

  return err;
}

  return (
    <div>
      {Object.keys(formError).length === 0 && isSubmit ? (<p>Registration is completed</p>):
      <pre style={{textAlign:'center'}} >Enter your Details</pre>
      } 
      <form onSubmit={handleSubmit} className='container' noValidate>
      <h1>Sign up</h1>
        <div className="form-group">
          <input type="text" className="form-control" autoComplete='off'
          name="name"
          value={formValues.name}
          placeholder="Your Name "
          onChange={handleChange} 
         />
         <p>{formError.name}</p>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" autoComplete='off' 
         onChange={handleChange} name="email" value={formValues.email} noValidate placeholder="Your Email" />
        <p>{formError.email}</p>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputMobile" autoComplete='off' 
         onChange={handleChange} name="number" value={formValues.number} placeholder="Your Mobile Number" />
        <p>{formError.number}</p>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputProfession" autoComplete='off' 
         onChange={handleChange} name="profession" value={formValues.profession} placeholder="Your Profession" />
        <p>{formError.profession}</p>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="exampleInputPassword" autoComplete='off' 
         onChange={handleChange} name="password" value={formValues.password} placeholder="Enter your Password" />
        <p>{formError.password}</p>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="exampleInputCPassword" autoComplete='off' 
         onChange={handleChange} name="cpassword" value={formValues.cpassword} placeholder="Confirm your Password" />
        <p>{formError.cpassword}</p>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

export default Signup