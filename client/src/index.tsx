import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App'
import reducers from './reducers/store'

const container = document.getElementById('root');
const root = createRoot(container!)
const store = createStore(reducers, compose(applyMiddleware(thunk)))

root.render(<Provider store={store}>
  <App/>
</Provider>)
