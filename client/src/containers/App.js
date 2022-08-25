import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import Login from '../containers/Login/Login'
import Navibar from '../components/Navibar/Navibar';
import Add from './Add';
import ViewEdit from './ViewEdit/ViewEdit';
import Reports from '../pages/Reports';


function App() {
  const route = useSelector(state => state.route.value)

  const returnRoute = () => {
    switch(route) {
        case "login": 
          return (
            <Login
              />
            );
        case 'add':
            return (
              <Add 
                />
            );
        case 'view_edit':
            return (
                <ViewEdit/>
            );
        case 'reports':
            return (
              <Reports/>
            );
        default:
            return(
                <div>CHOOSE</div>
            )
    }
  }

  return (
    <div className="">
      <div className="center-l center-ns mw6-ns bg-white vh-100">
        {route === "login"
          ?
            <div></div>
          :
            <Navibar />
        }
        <div className="pa3 center-l center-ns w-100 ba bg-white min-h-100">
          { 
            returnRoute()
          }
        </div>
      </div>
    </div>


  );
}

export default App;
