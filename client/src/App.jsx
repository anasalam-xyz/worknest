import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/tasks' element={<Project/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
