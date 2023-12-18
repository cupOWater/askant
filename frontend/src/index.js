import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import "./assets/styles/style.css";
import App from './App';

import Autobot from './Chatbot/autoBot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        {/* <Autobot /> */}
        <App />
    </div>

);
