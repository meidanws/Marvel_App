import * as React from "react";
import MainLayout from "../layout/mainLayout/MainLayout";
import Login from "../views/LoginView"; 
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout"
import Dashboard from "../views/DashboardView";
import CharacterView from "../views/CharacterView";
import CharacterLayout from "../layout/characterLayout/CharacterLayout";

const routes = [
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
      ]
    },
    {
      path: 'views',
      element: <CharacterLayout />,
      children: [
        { path: 'CharacterView', element: <CharacterView /> },
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Login /> },     
      ]
    }
  ];
  
  export default routes;
