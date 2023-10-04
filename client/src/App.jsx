import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import Layout from './pages/Layout'
import LayoutForm from './pages/LayoutForm'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ProtectedRoutes from './ProtectedRoutes'
import { LayoutProvider } from './context/LayoutContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<h1><Home /></h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/layouts' element={<h1><Layout /></h1>} />
              <Route path='/add-layout' element={<h1><LayoutForm /></h1>} />
              <Route path='/layouts/:id' element={<h1><LayoutForm /></h1>} />
              <Route path='/profile' element={<h1><Profile /></h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </AuthProvider>
  )
}

export default App