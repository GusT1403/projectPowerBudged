import { createContext, useContext, useState } from "react"
import { getSplittersRequest, getSplitterRequest, deleteSplitterRequest, updateSplitterRequest, createSplitterRequest } from "../api/splitter"

const SplitterContext = createContext()

export const useSplitter = () => {
  const context = useContext(SplitterContext)

  if(!context){
    throw new Error("useSplitter must be used within a SplitterComponentProvider")
  }
  return context
}

export function SplitterProvider({ children }) {
  const [ splitter, setSplitter ] = useState([])

  const getSplitters = async () => {
    try {
      const res = await getSplittersRequest()
      setSplitter(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createSplitter = async (splitter) => {
    const res = await createSplitterRequest(splitter)
    console.log(res)
  }

  const deleteSplitter = async (id) => {
    try {
      const res = await deleteSplitterRequest(id)
      if(res.status === 204){
        setSplitter(splitter.filter(splitter => splitter._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSplitter = async(id) => {
    try {
      const res = await getSplitterRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateSplitter = async (id, splitter) => {
    try {
      await updateSplitterRequest(id, splitter)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <SplitterContext.Provider value={{
      splitter,
      getSplitters,
      createSplitter,
      deleteSplitter,
      getSplitter,
      updateSplitter,
    }}>
      {children}
    </SplitterContext.Provider>
  )
}