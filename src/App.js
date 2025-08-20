import './App.css';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';
import EmbeddingSearch from './features/aiprompt/EmbeddingSearch';
import SemanticSearch from './features/aiprompt/SemanticSearch';

const App = () => {
  return (
    <div className="content-wrapper">
      <main className="content full-width">
        <AIPromptSearch />
        <EmbeddingSearch />
        <SemanticSearch />
      </main>
    </div>
  );
};

export default App;