import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import OltForm from "./pages/OltForm"
import OntForm from "./pages/OntForm"
import SplitterForm from "./pages/SplitterForm"
import TapForm from "./pages/TapForm";
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import ProtectedRoutes from "./ProtectedRoutes"
import Navbar from "./components/Navbar"
import WorkArea from "./pages/WorkArea"
import { OltProvider } from "./context/OltContext"
import { OntProvider } from "./context/OntContext"
import { SplitterProvider } from "./context/SplitterContext"
import { TapProvider } from "./context/TapContext"

function App() {
  return (
    <AuthProvider>
      <OltProvider>
        <OntProvider>
          <SplitterProvider>
            <TapProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path='/'element={ <h1> <Home/> </h1> }/>
                  <Route path='/login' element={<LoginPage/>}/>
                  <Route path='/register' element={<RegisterPage/>}/>
                  <Route element={<ProtectedRoutes/>}>
                    <Route path='/workarea' element={<WorkArea/>}/>
                    <Route path='/olt/:id' element={ <h1> <OltForm/> </h1> }/>
                    <Route path='/ont/:id' element={ <h1> <OntForm/> </h1> }/>
                    <Route path='/splitter/:id' element={ <h1> <SplitterForm/> </h1> }/>
                    <Route path='/tap/:id' element={ <h1> <TapForm/> </h1> }/>
                    <Route path='/profile' element={ <h1> <Profile/> </h1> }/>
                  </Route>
                </Routes>
              </BrowserRouter>
            </TapProvider>
          </SplitterProvider>
        </OntProvider>
      </OltProvider>
    </AuthProvider>
  )
}

export default App
