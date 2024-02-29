import { createContext, useContext, useState } from "react"
import { getBhgpssRequest, getBhgpsRequest, deleteBhgpsRequest, updateBhgpsRequest, createBhgpsRequest } from "../api/bhgps"

const BhgpsContext = createContext()

export const useBhgps = () => {
  const context = useContext(BhgpsContext)

  if(!context){
    throw new Error("useBhgps must be used within a BhgpsComponentProvider")
  }
  return context
}

export function BhgpsProvider({ children }) {
  const [ bhgps, setBhgps ] = useState([])

  const getBhgpss = async () => {
    try {
      const res = await getBhgpssRequest()
      setBhgps(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createBhgps = async (bhgps) => {
    const res = await createBhgpsRequest(bhgps)
    console.log(res)
  }

  const deleteBhgps = async (id) => {
    try {
      const res = await deleteBhgpsRequest(id)
      if(res.status === 204){
        setBhgps(bhgps.filter(bhgps => bhgps._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getBhgps = async(id) => {
    try {
      const res = await getBhgpsRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateBhgps = async (id, bhgps) => {
    try {
      await updateBhgpsRequest(id,bhgps)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <BhgpsContext.Provider value={{
      bhgps,
      getBhgpss,
      createBhgps,
      deleteBhgps,
      getBhgps,
      updateBhgps,
    }}>
      {children}
    </BhgpsContext.Provider>
  )
}