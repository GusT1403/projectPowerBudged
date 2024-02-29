import { createContext, useContext, useState } from "react"
import { getSpansRequest, getSpanRequest, deleteSpanRequest, updateSpanRequest, createSpanRequest } from "../api/span"

const SpanContext = createContext()

export const useSpan = () => {
  const context = useContext(SpanContext)

  if(!context){
    throw new Error("useSpan must be used within a SpanComponentProvider")
  }
  return context
}

export function SpanProvider({ children }) {
  const [ span, setSpan ] = useState([])

  const getSpans = async () => {
    try {
      const res = await getSpansRequest()
      setSpan(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createSpan = async (span) => {
    const res = await createSpanRequest(span)
    console.log(res)
  }

  const deleteSpan = async (id) => {
    try {
      const res = await deleteSpanRequest(id)
      if(res.status === 204){
        setSpan(span.filter(span => ont._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSpan = async(id) => {
    try {
      const res = await getSpanRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateSpan = async (id, span) => {
    try {
      await updateSpanRequest(id, span)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <SpanContext.Provider value={{
      span,
      getSpans,
      createSpan,
      deleteSpan,
      getSpan,
      updateSpan,
    }}>
      {children}
    </SpanContext.Provider>
  )
}