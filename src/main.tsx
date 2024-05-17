import React from 'react'
import { createTheme, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client'
import { store } from '@/store';
import { Provider } from 'react-redux';
import App from '@/routes/App.route.tsx'

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({ 

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme='dark' classNamesPrefix='test'>
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
