import React from 'react';
import { Provider } from 'react-redux';
import { store } from './services/index';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

export default function Main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter basename="/react-stellar-burger">
            <App />
          </BrowserRouter>
        </DndProvider>
      </Provider>
    </React.StrictMode>
  );
}
