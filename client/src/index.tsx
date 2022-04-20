import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App'
import reducers from './reducers'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'))
