import axios from "./axios"

export const getSplittersRequest = () => axios.get(`/splitter`)
export const getSplitterRequest = (id) => axios.get(`/splitter/${id}`)
export const createSplitterRequest = (splitter) => axios.post(`/splitter`, splitter)
export const updateSplitterRequest = (id, splitter) => axios.put(`/splitter/${id}`, splitter)
export const deleteSplitterRequest = (id) => axios.delete(`/splitter/${id}`)