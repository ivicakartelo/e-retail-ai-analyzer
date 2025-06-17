import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(   
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<AIPromptSearch />} />    
                </Route>
            </Routes>
        </BrowserRouter>  
);