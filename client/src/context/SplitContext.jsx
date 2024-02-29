import { createContext, useContext, useState } from "react"
import { getSplitsRequest, getSplitRequest, deleteSplitRequest, updateSplitRequest, createSplitRequest } from "../api/split"

const SplitContext = createContext()

export const useSplit = () => {
  const context = useContext(SplitContext)

  if(!context){
    throw new Error("useSplit must be used within a SplitComponentProvider")
  }
  return context
}

export function SplitProvider({ children }) {
  const [ split, setSplit ] = useState([])

  const getSplits = async () => {
    try {
      const res = await getSplitsRequest()
      setSplit(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createSplit = async (split) => {
    const res = await createSplitRequest(split)
    console.log(res)
  }

  const deleteSplit = async (id) => {
    try {
      const res = await deleteSplitRequest(id)
      if(res.status === 204){
        setSplit(split.filter(split => split._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSplit = async(id) => {
    try {
      const res = await getSplitRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateSplit = async (id, split) => {
    try {
      await updateSplitRequest(id, split)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <SplitContext.Provider value={{
      split,
      getSplits,
      createSplit,
      deleteSplit,
      getSplit,
      updateSplit,
    }}>
      {children}
    </SplitContext.Provider>
  )
}