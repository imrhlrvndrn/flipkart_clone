import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// context
import { DataProvider, ModalProvider } from './context';

// styles
import './shared/scss/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <DataProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </DataProvider>
    </React.StrictMode>
);
