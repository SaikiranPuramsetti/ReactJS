import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ErrorBoundary from "./ErrorBoundary";
import RouterComponent from './router';

class Body extends React.Component{
  render(){
    return (
      <ErrorBoundary>
        <RouterComponent/>
      </ErrorBoundary>
    )
  }
}

ReactDOM.render(<Body/>, document.getElementById("root"));
