import { createContext, useContext, useState } from "react"
import { createOltRequest, getOltsRequest } from "../api/olt"

const OltContext = createContext()

export const useOlt = () => {
  const context = useContext(OltContext)

  if(!context){
    throw new Error("useOlt must be used within a OltComponentProvider")
  }
  return context
}

export function OltProvider({ children}) {
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
    console.log(res)
  }

  return(
    <OltContext.Provider value={{
      olt,
      createOlt,
      getOlts,
    }}>
    {children}
  </OltContext.Provider>
  )
}