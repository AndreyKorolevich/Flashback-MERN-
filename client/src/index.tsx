import React from 'react'
import './index.scss'
import reducers from './reducers/store'
import { createRoot } from 'react-dom/client'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container!)
const store = createStore(reducers, compose(applyMiddleware(thunk)))

root.render(<Provider store={store}>
  <App/>
</Provider>)
