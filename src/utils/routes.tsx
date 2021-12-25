import * as React from "react";
import MainLayout from "../layout/mainLayout/MainLayout";
import Login from "../views/LoginView"; 
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout"
import AlertsView from "../views/AlertsView";

const routes = [
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'alerts', element: <AlertsView /> },
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
