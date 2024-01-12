import axios from "./axios"

export const getTapsRequest = () => axios.get(`/tap`)
export const getTapRequest = (id) => axios.get(`/tap/${id}`)
export const createTapRequest = (tap) => axios.post(`/tap`, tap)
export const updateTapRequest = (id, tap) => axios.put(`/tap/${id}`, tap)
export const deleteTapRequest = (id) => axios.delete(`/tap/${id}`)