import AlertsView from '../../views/AlertsView';
import { Navigate  } from "react-router-dom";
import auth from '../../utils/Authentication'
import TopBar from '../../components/topBar/TopBar'

const DashboardLayout = () => {

    // if authenticated login
    if(auth.authenticated){       
    return (
      <div>
      <TopBar />
      <AlertsView/>
      </div>
    );
  }
  // return to login page
  else{return <Navigate to="/" />}
}
  
export default DashboardLayout;