import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './Navigation';

const App: React.FC = () => {
    return (
        <PaperProvider>
            <Navigation />
        </PaperProvider>
    );
};

export default App;
