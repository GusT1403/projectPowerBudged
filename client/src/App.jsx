import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import OltForm from "./pages/OltForm"
import OntForm from "./pages/OntForm"
import SplitterForm from "./pages/SplitterForm"
import TapForm from "./pages/TapForm"
import BackhaulForm from "./pages/BackhaulForm"
import BhgpsForm from "./pages/BhgpsForm"
import SpanForm from "./pages/SpanForm"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import ProtectedRoutes from "./ProtectedRoutes"
import Navbar from "./components/Navbar"
import WorkArea from "./pages/WorkArea"
import Span from "./pages/Span"
import Taps from "./pages/Taps"
import TapsForm from "./pages/TapsForm"
import Split from "./pages/Split"
import SplitForm from "./pages/SplitForm"
import { SpanProvider } from "./context/SpanContext"
import { OltProvider } from "./context/OltContext"
import { BackhaulProvider } from "./context/BackhaulContext"
import { BhgpsProvider } from "./context/BHgpsContext"
import { OntProvider } from "./context/OntContext"
import { SplitterProvider } from "./context/SplitterContext"
import { TapProvider } from "./context/TapContext"
import { TapsProvider } from "./context/TapsContext"
import { SplitProvider } from "./context/SplitContext"

function App() {
  return (
    <AuthProvider>
      <SplitProvider>
        <TapsProvider>
          <SpanProvider>
            <BhgpsProvider>
              <BackhaulProvider>
                <OltProvider>
                  <OntProvider>
                    <SplitterProvider>
                      <TapProvider>
                        <BrowserRouter>
                          <Navbar />
                          <Routes>
                            <Route
                              path='/'
                              element={
                                <h1>
                                  {" "}
                                  <Home />{" "}
                                </h1>
                              }
                            />
                            <Route path='/login' element={<LoginPage />} />
                            <Route
                              path='/register'
                              element={<RegisterPage />}
                            />
                            <Route element={<ProtectedRoutes />}>
                              <Route path='/workarea' element={<WorkArea />} />
                              <Route
                                path='/olt/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <OltForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/ont/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <OntForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/splitter/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <SplitterForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/tap/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <TapForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/profile'
                                element={
                                  <h1>
                                    {" "}
                                    <Profile />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/span'
                                element={
                                  <h1>
                                    {" "}
                                    <Span />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addspan'
                                element={
                                  <h1>
                                    {" "}
                                    <SpanForm />
                                  </h1>
                                }
                              />
                              <Route
                                path='/span/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <SpanForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/backhaul/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <BackhaulForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/bhgps/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <BhgpsForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addbhgps'
                                element={
                                  <h1>
                                    {" "}
                                    <BhgpsForm />
                                  </h1>
                                }
                              />
                              <Route
                                path='/taps'
                                element={
                                  <h1>
                                    {" "}
                                    <Taps />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addtaps'
                                element={
                                  <h1>
                                    {" "}
                                    <TapsForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addtaps/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <TapsForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/split'
                                element={
                                  <h1>
                                    {" "}
                                    <Split />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addsplit'
                                element={
                                  <h1>
                                    {" "}
                                    <SplitForm />{" "}
                                  </h1>
                                }
                              />
                              <Route
                                path='/addsplit/:id'
                                element={
                                  <h1>
                                    {" "}
                                    <SplitForm />{" "}
                                  </h1>
                                }
                              />
                            </Route>
                          </Routes>
                        </BrowserRouter>
                      </TapProvider>
                    </SplitterProvider>
                  </OntProvider>
                </OltProvider>
              </BackhaulProvider>
            </BhgpsProvider>
          </SpanProvider>
        </TapsProvider>
      </SplitProvider>
    </AuthProvider>
  )
}

export default App
