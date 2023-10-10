import axios from "./axios"

export const getOltsRequest = () => axios.get(`/olt`)
export const getOltRequest = (id) => axios.get(`/olt/${id}`)
export const createOltRequest = (olt) => axios.post('/olt', olt)
export const updateOltRequest = (id, olt) => axios.put(`/olt/${id}`, olt)

