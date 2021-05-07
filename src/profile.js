import React from 'react';
const Main = React.lazy(()=>import("./main"));
const Menu = React.lazy(()=>import("./menu"));


class Profile extends React.Component{
  render(){
        return <div><Menu/><Main/></div>
  }
}

export default Profile