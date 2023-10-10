import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import OltForm from './pages/OltForm'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ProtectedRoutes from './ProtectedRoutes'
import Navbar from './components/Navbar'
import WorkArea from "./pages/WorkArea"
import { OltProvider } from './context/OltContext'

function App() {
  return (
    <AuthProvider>
      <OltProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1><Home /></h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
              <Route path='/workarea' element={<WorkArea />}/>
              <Route path='/olt' element={<h1>Olt</h1>} />
              <Route path='/add-olt' element={<h1><OltForm /></h1>} />
              <Route path='/olt/:id' element={<h1><OltForm /></h1>} />
              <Route path='/profile' element={<h1><Profile /></h1>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      </OltProvider>
    </AuthProvider>
  )
}

export default App