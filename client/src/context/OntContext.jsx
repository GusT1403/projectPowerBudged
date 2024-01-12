import { createContext, useContext, useState } from "react"
import { getOntsRequest, getOntRequest, deleteOntRequest, updateOntRequest, createOntRequest } from "../api/ont"

const OntContext = createContext()

export const useOnt = () => {
  const context = useContext(OntContext)

  if(!context){
    throw new Error("useOnt must be used within a OntComponentProvider")
  }
  return context
}

export function OntProvider({ children }) {
  const [ ont, setOnt ] = useState([])

  const getOnts = async () => {
    try {
      const res = await getOntsRequest()
      setOnt(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createOnt = async (ont) => {
    const res = await createOntRequest(ont)
    console.log(res)
  }

  const deleteOnt = async (id) => {
    try {
      const res = await deleteOntRequest(id)
      if(res.status === 204){
        setOnt(ont.filter(ont => ont._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getOnt = async(id) => {
    try {
      const res = await getOntRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateOnt = async (id, ont) => {
    try {
      await updateOntRequest(id,ont)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <OntContext.Provider value={{
      ont,
      getOnts,
      createOnt,
      deleteOnt,
      getOnt,
      updateOnt,
    }}>
      {children}
    </OntContext.Provider>
  )
}