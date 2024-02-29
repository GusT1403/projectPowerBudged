import { useSpan } from "../context/SpanContext"
import { useEffect } from "react"
import SpanCard from "../pages/SpanCard"
import "../pages/span.css"
import { Link } from "react-router-dom";


function Span() {

  const { span, getSpans } = useSpan()

  useEffect(() => {
    getSpans()
  }, [span])

  return (
    <>
    <div className="container-spans">
      { span.map(span => (
        <SpanCard span={span} key={span._id} />
      ))}
    </div>
    <div className="addspan">
      <Link to={`/addspan`} className="add-span">+</Link>
    </div>
    </>
    
  )
}

export default Span