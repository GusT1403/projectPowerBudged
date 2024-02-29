import { Link } from "react-router-dom"
import "../pages/Bhgps.css"

function BhgpsCard(bhgps) {

  return (
    
    <div className="cardgps">
      <h1 className="gpspointer">{bhgps.gps.pointer}</h1>
      <div className="gps-container">
        <p className="gps-title">Latitude:</p>
      <h1 className="gpsdata">{bhgps.gps.lat}</h1>
      </div>
      <div className="gps-container">
        <p className="gps-title">Longitude:</p>
      <h1 className="gpsdata">{bhgps.gps.lon}</h1>
      </div>
      <div className="gps-container">
        <p className="gps-title">Type:</p>
      <h1 className="gpsdata">{bhgps.gps.bhtype}</h1>
      </div>
      <div className="gps-edit">
        <Link to={`/bhgps/${bhgps.gps._id}`} className="gpsedit">Edit</Link>
      </div>
    </div>
  )
}

export default BhgpsCard