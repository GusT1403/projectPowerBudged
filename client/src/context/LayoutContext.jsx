import { createContext, useContext, useState } from "react"
import { createLayoutRequest, getLayoutRequest, getLayoutsRequest, deleteLayoutRequest, updateLayoutRequest } from "../api/layouts";

const LayoutContext = createContext()

export const useLayouts = () => {
  const context = useContext(LayoutContext)

  if(!context){
    throw new Error("useTask must be used whithin a TaskProvider")
  }
  return context
}

export function LayoutProvider({ children }) {
  const [layouts, setLayouts] = useState([])

  const getLayouts = async () => {
    try {
      const res = await getLayoutsRequest()
      setLayouts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createLayout = async (layout) => {
    const res = await createLayoutRequest(layout)
    console.log(res)
  }

  const deleteLayout = async (id) => {
    try {
      const res = await deleteLayoutRequest(id)
      if(res.status === 204){
        setLayouts(layouts.filter(layout => layout._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLayout = async(id) => {
    try {
      const res = await getLayoutRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateLayout = async (id, layout) => {
    try {
      await updateLayoutRequest(id,layout)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <LayoutContext.Provider value={{
      layouts,
      createLayout,
      getLayouts,
      deleteLayout,
      getLayout,
      updateLayout,
    }}>
      {children}
    </LayoutContext.Provider>
  )
}