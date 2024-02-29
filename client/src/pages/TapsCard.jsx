import { Link } from "react-router-dom"
import "../pages/Bhgps.css"

function TapsCard(tap) {
  return (
    
    <div className="cardgps">
      <h1 className="gpspointer">{tap.taps.description}</h1>
      <div className="gps-container">
        <p className="gps-title">Configuration:</p>
      <h1 className="gpsdata">{tap.taps.configuration}</h1>
      </div>
      <div className="gps-container">
        <p className="gps-title">Insert:</p>
      <h1 className="gpsdata">{tap.taps.insert} [db]</h1>
      </div>
      <div className="gps-container">
        <p className="gps-title">Tap:</p>
      <h1 className="gpsdata">{tap.taps.tap} [db]</h1>
      </div>
      <div className="gps-edit">
        <Link to={`/addtaps/${tap.taps._id}`} className="gpsedit">Edit</Link>
      </div>
    </div>
  )
} 
export default TapsCard