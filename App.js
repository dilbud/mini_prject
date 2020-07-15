import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// redux and async thunk
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// navigation imports
import RootNavigation from './navigation/RootNavigation';
// reducer imports
import AuthReducer from './store/reducers/AuthReducer';
import AddUserReducer from './store/reducers/AddUserReducer';
// combine reducers
const rootReducer = combineReducers({
  Auth: AuthReducer,
  AddUser: AddUserReducer,
});
// create store with middleware
const store = createStore(rootReducer, applyMiddleware(thunk));
// render app
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
