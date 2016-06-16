/**
 * Created by mumuhou on 16/6/15.
 */

import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import todoApp from '../reducers'
import BaseApp from './BaseApp'

let store = createStore(todoApp)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BaseApp />
      </Provider>
    );
  }
}

