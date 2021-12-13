import React from 'react';
import { Navigate, } from "react-router-dom";
import auth from '../../utils/Authentication'
import TopBar from '../../components/topBar/TopBar'
import CharacterView from '../../views/CharacterView';
const userData =  localStorage.getItem("user");

const CharacterLayout = () => {

    // if we want to save localstroge add ->  || userData != null to the if statement
    if(auth.authenticated ){        
    return (
      <div>
      <TopBar />
      <CharacterView/>
      </div>
    );
  }
  else{return <Navigate to="/" />}
}
  
  export default CharacterLayout;