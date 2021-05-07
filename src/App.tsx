import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from './styles/theme';
import { ChakraProvider } from "@chakra-ui/react"

import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  </Router>
);

export default App;
