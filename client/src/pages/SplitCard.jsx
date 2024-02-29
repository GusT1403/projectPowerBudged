import { Link } from "react-router-dom"
import "../pages/Bhgps.css"

function SplitCard(split) {
  console.log(split.split)
  return (
    
    <div className="cardgps">
      <h1 className="gpspointer">{split.split.description}</h1>
      <div className="gps-container">
        <p className="gps-title">Configuration:</p>
      <h1 className="gpsdata">{split.split.configuration}</h1>
      </div>
      <div className="gps-container">
        <p className="gps-title">Loss:</p>
      <h1 className="gpsdata">{split.split.loss} [dB]</h1>
      </div>
      <div className="gps-edit">
        <Link to={`/addsplit/${split.split._id}`} className="gpsedit">Edit</Link>
      </div>
    </div>
  )
} 
export default SplitCard