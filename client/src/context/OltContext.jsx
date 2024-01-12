import { createContext, useContext, useState } from "react"
import { createOltRequest, getOltsRequest, getOltRequest, updateOltRequest } from "../api/olt"

const OltContext = createContext()

export const useOlt = () => {
  const context = useContext(OltContext)

  if(!context){
    throw new Error("useOlt must be used within a OltComponentProvider")
  }
  return context
}

export function OltProvider({ children }) {
  const [olt, setOlt] = useState([])

  const getOlts = async () => {
    try {
      const res = await getOltsRequest()
      setOlt(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  const createOlt = async (olt) => {
    const res = await createOltRequest(olt)
  }

  const getOlt = async(id) => {
    try {
      const res = await getOltRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateOlt = async (id, olt) => {
    try {
      await updateOltRequest(id,olt)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <OltContext.Provider value={{
      olt,
      createOlt,
      getOlts,
      getOlt,
      updateOlt,
    }}>
    {children}
  </OltContext.Provider>
  )
}