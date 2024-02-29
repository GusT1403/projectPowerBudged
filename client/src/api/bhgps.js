import axios from "./axios"

export const getBhgpssRequest = () => axios.get(`/bhgps`)
export const getBhgpsRequest = (id) => axios.get(`/bhgps/${id}`)
export const createBhgpsRequest = (bhgps) => axios.post(`/bhgps`, bhgps)
export const updateBhgpsRequest = (id, bhgps) => axios.put(`/bhgps/${id}`, bhgps)
export const deleteBhgpsRequest = (id) => axios.delete(`/bhgps/${id}`)