import React from 'react'
import { store } from '@/store';
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client'

import App from '@/routes/App.route.tsx'

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const theme = createTheme({ 

});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme='dark' classNamesPrefix='test'>
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
)
