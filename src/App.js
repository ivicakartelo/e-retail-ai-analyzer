import { Outlet } from 'react-router-dom';
import './App.css';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';


const App = () => {
  return (
    <div className="content-wrapper">
        <main className="content full-width">
          <AIPromptSearch />
        </main>
    </div>
  );
};

export default App;