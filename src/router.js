import React, {Suspense, useState} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import authContext from './authContext';
const Settings = React.lazy(()=>import("./settings"));
const Login = React.lazy(()=>import("./login"));
const Main = React.lazy(()=>import("./main"));
const Menu = React.lazy(()=>import("./menu"));
const Friends = React.lazy(()=>import("./friends"));
const Profile = React.lazy(()=>import("./profile"));
const Notifications = React.lazy(()=>import("./notifications"));
const Logout = React.lazy(()=>import("./logout"));

function RouterComponent(props) {
    
    const[user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return <Router>
              <div className="d-flex flex-column">
                  <Suspense fallback={<div>Please wait while arranging things for u...</div>}>
                      <authContext.Provider value={[user, setUser]}>
                         <Route exact path="/"><Login/></Route>
                         <Route path="/home"><Menu/><Main fetchAll="true"/></Route>
                         <Route path="/friends" component={Friends}/>
                         <Route path="/notifications" component={Notifications}/>
                         <Route path="/settings" component={Settings}/>
                         <Route path="/profile"><Profile/></Route>
                         <Route path="/logout"><Logout/></Route>
                      </authContext.Provider>
                  </Suspense>               
              </div>
           </Router>
}

export default RouterComponent;