import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Router>
      <Toaster position='bottom-left'/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/project/:projectId' element={<Project/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
