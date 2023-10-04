import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <div className="navheader">
      <nav className="navbar container">
      <Link to="/" className="nav-link">
        <h1>FTTx</h1>
      </Link>
      <ul className="nav-list">
        {isAuthenticated ? 
        (
        <>
        <li className="nav-item">
        <Link to="/" className="nav-link">{ user.username }</Link>
        </li>
          <li className="nav-item">
          <Link to="/add-layout" className="nav-link">Add Layout</Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={() => { logout() }} className="nav-link">Logout</Link>
        </li>
        <div className="active"></div>
        </>
        ):(
        <>
          <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <div className="active"></div>
        </>
        )}
      </ul>
    </nav>
    </div>
  )
}

export default Navbar
