import React, { useContext, useEffect, useState } from 'react';
import authContext from './authContext';

function  Menu(props) {

  const[statement, setStatement] = useState({});
  const[value, setValue] = useState(null);
  const[user] = useContext(authContext);

  useEffect(()=>{
   GetStatementByDate();
  },[statement?.statementDesc]);

  const  GetStatementByDate = ()=>{
    fetch('https://affirmation-webservice.azurewebsites.net/getstatements')
    .then(res=>res.json())
    .then(data=>{
      setStatement(data.filter(statement=>statement._id === new Date().getDate().toString().concat((new Date().getMonth() + 1).toString(), new Date().getFullYear().toString()))[0]);
    })
    .catch(console.log)
    console.log(statement);
   }
  
  const AddPost = ()=>{
    const post = {
      statement : statement,
      user : user,
      affirmation:value
    }
    const options = {
      method:'Post',
      body:JSON.stringify(post),
      headers:{
        'Content-Type' : 'application/json'
      }
    }   
    fetch('https://affirmation-webservice.azurewebsites.net/addpost',options)
    .then(()=>{
      alert("Post has been added");
      window.location.reload();
    })
    .catch(console.log)
  }
  return <div className="Menu">
        <nav class="navbar ml-4 fixed-top navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/"><b>Affirmation</b></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link"><button type="button" data-toggle="modal" data-target="#addPost" class="btn btn-outline-dark">Post</button></a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/"><button type="button" class="btn btn-outline-dark">Home</button></a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/Profile"><button type="button" class="btn btn-outline-dark">Profile</button></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Friends"><button type="button" class="btn btn-outline-dark">Friends</button></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="/Notifications"><button type="button" class="btn btn-outline-dark">Notifications</button></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="/Logout"><button type="button" class="btn btn-outline-dark">Logout</button></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="/Settings"><button type="button" class="btn btn-outline-dark">Settings</button></a>
                </li>
              </ul>
            </div>
        </nav>
        <div class="modal fade show" id="addPost" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" class="text-info" id="exampleModalLabel">{statement?.statementDesc === undefined ? "Empty affirmation" : statement.statementDesc }</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Affirmation</span>
                </div>
                <textarea value={value} onChange={e => setValue(e.target.value)} placeholder = "Express your emotion in the form of words..." class="form-control" aria-label="With textarea"></textarea>
              </div>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" onClick={()=>AddPost()} class="btn btn-secondary" data-dismiss="modal">Submit Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
 }

  export default Menu
  
