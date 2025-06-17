import { Outlet } from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <div className="content-wrapper">
        <main className="content full-width">
          <Outlet />
        </main>
    </div>
  );
};

export default App;