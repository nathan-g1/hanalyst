/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import { Navigation } from 'react-native-navigation';
import GameRegistry from './components/GameRegistry';
import Login from './components/Login';

Navigation.registerComponent('app', () => App);
Navigation.registerComponent('gameRegistry', () => GameRegistry);
Navigation.registerComponent('login', () => Login);



Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'AppStack',
                children: [
                    {
                        component: {
                            name: 'login',
                            options: {
                                topBar: { visible: false, height: 0, }
                            }
                        }
                    }
                ]
            }
        }
    })
});