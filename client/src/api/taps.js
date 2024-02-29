import axios from "./axios"

export const getTapssRequest = () => axios.get(`/taps`)
export const getTapsRequest = (id) => axios.get(`/taps/${id}`)
export const createTapsRequest = (taps) => axios.post(`/taps`, taps)
export const updateTapsRequest = (id, taps) => axios.put(`/taps/${id}`, taps)
export const deleteTapsRequest = (id) => axios.delete(`/taps/${id}`)