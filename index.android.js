/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './src/containers/App';
import {
  AppRegistry
} from 'react-native';

class Todos extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Todos', () => Todos);
