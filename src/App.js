import './App.css';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';
import EmbeddingSearch from './features/aiprompt/EmbeddingSearch';
import SemanticSearch from './features/aiprompt/SemanticSearch';
import SemanticSearchWithLLM from './features/aiprompt/SemanticSearchWithLLM';

const App = () => {
  return (
    <div className="content-wrapper">
      <main className="content full-width">
        <AIPromptSearch />
        <EmbeddingSearch />
        <SemanticSearch />
        <SemanticSearchWithLLM />
      </main>
    </div>
  );
};

export default App;