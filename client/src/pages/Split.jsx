import { useEffect } from "react"
import { useSplit } from "../context/SplitContext"
import { useNavigate, Link } from "react-router-dom"
import SplitCard from "./SplitCard"
import "../pages/span.css"

function Split() {
  const { split, getSplits } = useSplit()

  const navigate = useNavigate()

  useEffect(() => {
      getSplits()
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
              to={`/addsplit`}
              className='add-bhgps'
            >
              Add SPLITTER
            </Link>
          </div>
          <div className='list-bhgps'>
            {split.map((split) => (
                <SplitCard split={split} key={split._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Split