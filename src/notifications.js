import React from 'react';

class Notifications extends React.Component{

    constructor(props){
        super(props);
        this.ref = React.createRef();
    }

    render(){
        return <React.Fragment>
            <h1 className="mt-5 Main">Notifications page.</h1>
        </React.Fragment>
    }
}

export default Notifications