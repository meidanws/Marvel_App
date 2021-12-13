import React from 'react';
import DashboardView from '../../views/DashboardView';
import { Navigate,useNavigate  } from "react-router-dom";
import auth from '../../utils/Authentication'
import TopBar from '../../components/topBar/TopBar'
const userData =  localStorage.getItem("user");

const DashboardLayout = () => {

    // if we want to save localstroge add ->  || userData != null to the if statement

    if(auth.authenticated ){  
        
    return (
      <div>
      <TopBar />
      <DashboardView/>
      </div>
    );
  }
  else{return <Navigate to="/" />}
}
  
  export default DashboardLayout;