import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

import AdminPrivateRoute from './components/adminComponents/AdminPrivateRoute.jsx'
import AdminHomeScreen from './screens/adminScreens/AdminHomeScreen.jsx'
import AdminLogingScreen from './screens/adminScreens/AdminLoginScreen.jsx'
import { UserManagementScreen } from './screens/adminScreens/UserManagementScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>
       <Route index = {true} path='/' element= {<HomeScreen/>}/>
       <Route path='/login' element= {<LoginScreen/>}/>
       <Route path='/register' element= {<RegisterScreen/>}/>
       {/* Private Routes */}
       <Route path='' element = {<PrivateRoute/>}>
       <Route path='/profile' element= {<ProfileScreen/>}/>
       </Route>


        {/* *************ADMIN************* */}
        <Route path='/admin' element = {<AdminPrivateRoute/>}>
          <Route index element = {<AdminHomeScreen/>} />
          <Route path='get-user' element = {<UserManagementScreen/>}/>
        </Route>
        <Route path='/admin/login' element = {<AdminLogingScreen/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
