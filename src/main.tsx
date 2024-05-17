import React from 'react'
import { createTheme, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client'
import App from './routes/App.route.tsx'
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { store } from './store';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme='dark' classNamesPrefix='test'>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
