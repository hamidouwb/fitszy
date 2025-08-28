import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// import programReducder from "./reducers/programReducer"
//
// const store = configureStore({
//   reducer : {
//     programs: programReducder
//   }
// })
createRoot(document.getElementById('root')).render(

  // <Provider store={store}>
    <App />
  // </Provider>
)
