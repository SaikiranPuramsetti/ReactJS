import React from 'react';

class Logout extends React.Component{

    constructor(props){
        super(props);
        this.removeUser = this.removeUser().bind(this);
    }

    removeUser(){
        localStorage.removeItem("user");
        window.location = "/";
    }

    render(){
        return <h1 className="mt-5 Main">Logout page.</h1>
    }
}

export default Logout