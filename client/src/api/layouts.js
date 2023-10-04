import axios from "./axios"

export const getLayoutsRequest = () => axios.get('/layouts')
export const getLayoutRequest = (id) => axios.get(`/layouts/${id}`)
export const createLayoutRequest = (layout) => axios.post('/layouts', layout)
export const updateLayoutRequest = (id, layout) => axios.put(`/layouts/${id}`, layout)
export const deleteLayoutRequest = (id) => axios.delete(`/layouts/${id}`)
