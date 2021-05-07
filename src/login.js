import React, { useState, useEffect, useContext } from 'react';
import authContext from './authContext';
/* eslint-disable react-hooks/exhaustive-deps */

function Login(props){
   const[users, setUsers] = useState(null);
   const[value,setValue] = useState(null);
   const[user, setUser] = useContext(authContext);
   const[firstElement, setFirstElement] = useState({});

   useEffect(() => {
      if(user === undefined || user === null){
            fetch('https://affirmation-webservice.azurewebsites.net/getusers')
            .then(res=>res.json())
            .then(data=>{
             setUsers(data);
             setFirstElement(data[0]._id);
            })
            .catch(console.log)
       }
       else{
           window.location = "/home";
       }
    }, [firstElement]);

    const handleLogin = (event) => {
        var user = users.find(u=>u._id === value);
        if(user != null){
          window.location = "/home";
          localStorage.setItem('user',JSON.stringify(user));
          setUser(JSON.stringify(user));
        }
        else
          window.location = "/error";
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return <div>
        <div class="modal fade show" style={{display:'block'}} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="w-100 text-center modal-title" id="exampleModalLongTitle">Affirmations </h5>
                </div>
                <div class="modal-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Mobilenumber:</span>
                    </div>
                    <input type="text" value={value} onChange={handleChange} class="form-control" autoFocus placeholder="Mobilenumber"/>
                </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button"onClick={handleLogin} class="btn btn-secondary" data-dismiss="modal">Login</button>
                </div>
                </div>
            </div>
        </div>
    </div>
}
export default Login
