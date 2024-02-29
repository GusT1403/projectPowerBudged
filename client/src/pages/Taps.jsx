import { useEffect } from "react"
import { useTaps } from "../context/TapsContext"
import { useNavigate, Link } from "react-router-dom"
import TapsCard from "./TapsCard"
import "../pages/span.css"

function Taps() {
  const { taps, getTapss } = useTaps()

  const navigate = useNavigate()

  useEffect(() => {
      getTapss()
  }, [])

  const handleOutsideClick = () => {
    navigate("/workarea")
  }
  return (
    <div className='content3' onClick={handleOutsideClick}>
      <div className='wrapper3' onClick={(e) => e.stopPropagation()}>        
        <div className='bhgps'>
          <div className='addbhgps'>
            <Link
              to={`/addtaps`}
              className='add-bhgps'
            >
              Add TAP
            </Link>
          </div>
          <div className='list-bhgps'>
            {taps.map((taps) => (
                <TapsCard taps={taps} key={taps._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taps