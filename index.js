/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
LogBox.ignoreAllLogs()

const PaddleUp = () => {
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    );
};
AppRegistry.registerComponent(appName, () => PaddleUp);

