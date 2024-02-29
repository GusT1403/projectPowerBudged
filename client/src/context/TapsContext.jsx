import { createContext, useContext, useState } from "react"
import { getTapssRequest, getTapsRequest, deleteTapsRequest, updateTapsRequest, createTapsRequest } from "../api/taps"

const TapsContext = createContext()

export const useTaps = () => {
  const context = useContext(TapsContext)

  if(!context){
    throw new Error("useTaps must be used within a TapComponentProvider")
  }
  return context
}

export function TapsProvider({ children }) {
  const [ taps, setTaps ] = useState([])

  const getTapss = async () => {
    try {
      const res = await getTapssRequest()
      setTaps(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTaps = async (taps) => {
    const res = await createTapsRequest(taps)
    console.log(res)
  }

  const deleteTaps = async (id) => {
    try {
      const res = await deleteTapsRequest(id)
      if(res.status === 204){
        setTaps(taps.filter(tap => tap._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTaps = async(id) => {
    try {
      const res = await getTapsRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateTaps = async (id, taps) => {
    try {
      await updateTapsRequest(id,taps)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <TapsContext.Provider value={{
      taps,
      getTapss,
      createTaps,
      deleteTaps,
      getTaps,
      updateTaps,
    }}>
      {children}
    </TapsContext.Provider>
  )
}