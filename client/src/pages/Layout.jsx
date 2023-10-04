import { useEffect } from 'react'
import { useLayouts } from '../context/LayoutContext'
import LayoutCard from "../components/LayoutCard"
import './form.css'

function Layout() {
  const { getLayouts, layouts } = useLayouts()

  useEffect(() => {
    getLayouts()
  }, [])

  if(layouts.lenght === 0 ){
    return (<h1>No Layouts</h1>)
  }

  return (
    <div className='container-layouts'>
       {
        layouts.map(layout => (
          <LayoutCard layout={layout} key={layout._id}/>
        ))
       }
    </div>
  )
}

export default Layout
