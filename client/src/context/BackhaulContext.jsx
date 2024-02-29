import { createContext, useContext, useState } from "react"
import { getBackhaulsRequest, getBackhaulRequest, deleteBackhaulRequest, updateBackhaulRequest, createBackhaulRequest } from "../api/backhaul"

const BackhaulContext = createContext()

export const useBackhaul = () => {
  const context = useContext(BackhaulContext)

  if(!context){
    throw new Error("useBackhaul must be used within a BackhaulComponentProvider")
  }
  return context
}

export function BackhaulProvider({ children }) {
  const [ backhaul, setBackhaul ] = useState([])

  const getBackhauls = async () => {
    try {
      const res = await getBackhaulsRequest()
      setBackhaul(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createBackhaul = async (backhaul) => {
    const res = await createBackhaulRequest(backhaul)
  }

  const deleteBackhaul = async (id) => {
    try {
      const res = await deleteBackhaulRequest(id)
      if(res.status === 204){
        setBackhaul(backhaul.filter(backhaul => backhaul._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getBackhaul = async(id) => {
    try {
      const res = await getBackhaulRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateBackhaul = async (id, backhaul) => {
    try {
      await updateBackhaulRequest(id,backhaul)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <BackhaulContext.Provider value={{
      backhaul,
      getBackhauls,
      createBackhaul,
      deleteBackhaul,
      getBackhaul,
      updateBackhaul,
    }}>
      {children}
    </BackhaulContext.Provider>
  )
}