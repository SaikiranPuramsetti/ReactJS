import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';
import authContext from './authContext';
const Menu = React.lazy(()=>import("./menu"));

function  Friends(props) {
    const[followers, setFollowers] = useState([]);
    const[followings, setFollowings] = useState([]);
    const[Users, setUsers] = useState([]);
    const[user] = useContext(authContext);

    useEffect(()=>{
      console.log("fired");
      FetchData();
    },[followers[0]?._id,followings[0]?._id])
   
    const FetchData = () =>{
        getFollowers();
        getFollowings();
        getUsers();
    }

    const getUsers = () =>{
        fetch('https://affirmation-webservice.azurewebsites.net/getusers/')
        .then(res=>res.json())
        .then(data=>{
            var filteredUsers = data.filter(friend=>friend._id !== user._id);
            setUsers(filteredUsers.filter(({ _id: id1 }) => !followings.some(({ following: id2 }) => id2 === id1)));      
        })
        .catch(console.log)
    }

    const getFollowers = () => {
        fetch(`https://affirmation-webservice.azurewebsites.net/getfollowers/${user._id}`)
        .then(res=>res.json())
        .then(data=>{
            setFollowers(data);      
        })
        .catch(console.log)
    }

    const getFollowings = () => {
        fetch(`https://affirmation-webservice.azurewebsites.net/getfollowing/${user._id}`)
        .then(res=>res.json())
        .then(data=>{
            setFollowings(data);     
        })
        .catch(console.log)
    }

    const addFriend = (id)=>{
        const post = {
            following : id,
            follower : user._id,
          }
          const options = {
            method:'Post',
            body:JSON.stringify(post),
            headers:{
              'Content-Type' : 'application/json'
            }
          }   
          fetch('https://affirmation-webservice.azurewebsites.net/addfriends',options)
          .then(()=>{
            alert("Friend has been added");
            window.location.reload();
          })
          .catch(console.log)
    }

    const unFriend = (id) =>{
        const options = {
            method:'Delete',
            headers:{
              'Content-Type' : 'application/json'
            }
          }
        fetch(`https://affirmation-webservice.azurewebsites.net/deletefriend/${id}`,options)
        .then(()=>{
           FetchData();     
        })
        .catch(console.log)
    }

    return (
        <div>
            <Menu/>
            <div class="d-flex flex-column align-items-center" style={{marginTop:"80px"}}>
                <Tabs style={{fontSize:"30px"}}  defaultActiveKey="Friends" id="uncontrolled-tab-example">
                   <Tab eventKey="Friends" title="Friends">
                    {
                        Users.map(friend=>
                        <Card style={{height:"100px",marginTop:"15px"}}>
                            <Card.Body>
                                <Card.Text class="d-flex align-items-baseline justify-content-between">
                                <span style={{fontSize:"30px"}}>{friend._id}  </span>    <Button variant="btn btn-outline-dark" style={{marginBottom:"30px"}} onClick={()=>addFriend(friend._id)}>Follow</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}  
                    </Tab>
                    <Tab eventKey="Followers" title="Followers">
                    {
                        followers.map(follower=>
                        <Card style={{height:"100px",marginTop:"15px"}}>
                            <Card.Body>
                                <Card.Text class="d-flex align-items-baseline justify-content-between">
                                <span style={{fontSize:"30px"}}>{follower.follower}  </span>    <Button variant="btn btn-outline-dark" style={{marginBottom:"30px"}} onClick={()=>unFriend(follower._id)}>Remove Follower</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}                   
                    </Tab>
                    <Tab eventKey="Following" title="Following">
                    {
                        followings.map(following=>
                        <Card style={{height:"100px",marginTop:"15px"}}>
                            <Card.Body>
                                <Card.Text class="d-flex align-items-baseline justify-content-between">
                                <span style={{fontSize:"30px"}}>{following.following }  </span>    <Button variant="btn btn-outline-dark" style={{marginBottom:"30px"}}  onClick={()=>unFriend(following._id)}>UnFollow</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}     
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
export default Friends
