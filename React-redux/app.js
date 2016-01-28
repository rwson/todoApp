import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './js/TodoApp'
import todoApp from './js/reducers'

let store = createStore(todoApp);

let rootElement = document.getElementById("todo")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)