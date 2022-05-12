import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate()
    //this time using promises we will see the fetch api
    useEffect(() => {
        fetch('/logoutMe', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include" // for adding cookies 
        }).then((res)=>{
            navigate('/login')
    }).catch((err)=>{
        console.log(err);
})
})
    return (
        <div>

        </div>
    )
}

export default Logout;