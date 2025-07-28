import './App.css';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';
import EmbeddingSearch from './features/aiprompt/EmbeddingSearch';


const App = () => {
  return (
    <div className="content-wrapper">
        <main className="content full-width">
          <AIPromptSearch />
          <EmbeddingSearch />
        </main>
    </div>
  );
};

export default App;