import React, { useContext, useEffect, useState } from 'react';
import authContext from './authContext';

function Main(props)
{
    const[posts,setPosts] = useState([]);
    const[reactions, setReactions] = useState([]);
    const[comment, setComment] = useState([]);
    const[firstElement, setFirstElement] = useState({});
    const[user] = useContext(authContext);


    useEffect(()=>{
      if(user === null || user === undefined){
        window.location = "/";
      }
      else{
        GetPosts();
        GetReactions();
      }
    },[firstElement]);


    const GetPosts = ()=>{
      fetch('https://affirmation-webservice.azurewebsites.net/getposts')
      .then(res=>res.json())
      .then(data=>{
        if(props.fetchAll === "true"){
          setPosts(data.filter(post=>post.user._id !== user._id));
        }
        else{
          setPosts(data.filter(post=>post.user._id === user._id));   
        }
        setFirstElement(data[0].user._id);
      })
      .catch(console.log)
    }

    const GetReactions = () => {
      fetch('https://affirmation-webservice.azurewebsites.net/getreactions')
      .then(res=>res.json())
      .then(data=>{
         setReactions(data);
      })
    }

    const AddReaction = (reaction) =>{
      const options = {
        method:'Post',
        body:JSON.stringify(reaction),
        headers:{
          'Content-Type' : 'application/json'
        }
      }
      fetch('http://localhost:3000/addreaction', options)
      .then(()=>{GetReactions();})
      .catch(console.log);
    }

    const CreateReaction = (postId, property)=>{
      var reaction = reactions?.find(reaction=>reaction.postid === postId && reaction.user._id === user._id);
      if(reaction !== undefined && reaction !== null){
        reaction = reactions.find(reaction=>reaction.postid === postId && reaction.user._id === user._id);
        reaction[property] = !reaction[property];
      }
      else{
        reaction = {
          "postid" : postId,
          "user" : user,
        }
        reaction[property] = true;
      }
      if(property === "comment"){
        reaction[property] = comment;
      }
      AddReaction(reaction);
    }

    const backgroundColor= (postId, property) =>{
      const reaction = reactions.find(reaction=>reaction.postid === postId && reaction.user._id === user._id);
      if(reaction !== undefined && reaction !== null){
       return reaction[property] === true ? "aliceblue" : "white";
      }
    }

    return (<div className="Main mt-5 d-flex flex-column align-items-center">
      {
        posts.map((post)=>
          <div class="card ml-3 mt-3 h-auto" key={post.statement._id.toString() + post.user._id.toString()}>
            <div class="card-header d-flex justify-content-between">
              <button type="button" class="btn btn-outline-dark">Photo</button>
              <div class="align-self-center" style={{"fontSize":"20px"}}>{post.user.name}</div>
              <button type="button" class="btn btn-outline-dark">options</button>
            </div>
            <div class="card-body" style={{height:"200px"}}> 
                {post.affirmation}
            </div>
            <div class="card-footer text-muted">
              <div class="flex-row d-flex justify-content-between">
                <button type="button" class="btn btn-outline-dark" style={{backgroundColor:backgroundColor(post._id,"like")}} onClick={()=>CreateReaction(post._id,"like")} >Like</button>
                <button type="button" class="btn btn-outline-dark" style={{backgroundColor:backgroundColor(post._id,"shares")}} onClick={()=>CreateReaction(post._id,"shares")} >Share</button>
                <button type="button" class="btn btn-outline-dark" style={{backgroundColor:backgroundColor(post._id,"saved")}} onClick={()=>CreateReaction(post._id,"saved")} >Save</button>
                <button type="button" data-toggle="collapse" data-target={"#"+ post._id} class="btn btn-outline-dark">Comment</button>
                <button type="button" class="btn btn-outline-dark">Others</button>
              </div>
              <div class="collapse" id={post._id}>
              <form class="mt-3 d-flex justify-content-around align-items-center" onSubmit={()=>CreateReaction(post._id,"comment")}>
                <img width="40" height="40"/>
                <textarea class="ml-3" style={{"height":"40px","width":"500px"}}  onChange={e => setComment(e.target.value)} />
                <button type="submit" value="Save" class="ml-3 btn btn-outline-dark">Comment</button>
              </form> 
              {reactions.map(reaction=>(
                  reaction.postid === post._id ?
                  <div class="mt-4 d-flex align-items-center">
                    <img width="40" height="40"/> 
                    <h6 class="ml-3">{reaction.comment}</h6>
                    <h6 class="ml-3"><b>{reaction.user.name}</b></h6>
                  </div> : null
                ))}
              </div>
            </div>
          </div>
        )
      }
  </div>)
}

  export default Main
