import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './utils/routes';

function App() {

  const routing = useRoutes(routes);

  return (
    <div className="App">
    {routing}
    </div>
  );
}

export default App;
