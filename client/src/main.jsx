import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context'; // custom global state provider (like Redux-lite)
import App from './App';
import './index.css'; // Tailwind + custom styles

// Grab the root element — using React 18+ style
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the app wrapped with everything it needs: blockchain, routing, state, etc.
root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}> 
    {/* using Goerli testnet for now — should switch to mainnet before launch */}
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
