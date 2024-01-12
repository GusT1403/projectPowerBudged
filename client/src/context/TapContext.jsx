import { createContext, useContext, useState } from "react"
import { getTapsRequest, getTapRequest, deleteTapRequest, updateTapRequest, createTapRequest } from "../api/tap"

const TapContext = createContext()

export const useTap = () => {
  const context = useContext(TapContext)

  if(!context){
    throw new Error("useTap must be used within a TapComponentProvider")
  }
  return context
}

export function TapProvider({ children }) {
  const [ tap, setTap ] = useState([])

  const getTaps = async () => {
    try {
      const res = await getTapsRequest()
      setTap(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTap = async (tap) => {
    const res = await createTapRequest(tap)
    console.log(res)
  }

  const deleteTap = async (id) => {
    try {
      const res = await deleteTapRequest(id)
      if(res.status === 204){
        setTap(tap.filter(tap => tap._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTap = async(id) => {
    try {
      const res = await getTapRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateTap = async (id, tap) => {
    try {
      await updateTapRequest(id,tap)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <TapContext.Provider value={{
      tap,
      getTaps,
      createTap,
      deleteTap,
      getTap,
      updateTap,
    }}>
      {children}
    </TapContext.Provider>
  )
}