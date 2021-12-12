import React from 'react';
import LoginView from '../../views/LoginView';
import TopBar from '../../components/topBar/TopBar'

const MainLayout = () => {

    return (
      <div>
      <TopBar /> 
      <LoginView/>
      </div>
    );
  };
  
  export default MainLayout;