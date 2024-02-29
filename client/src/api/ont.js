import axios from "./axios"

export const getOntsRequest = () => axios.get(`/ont`)
export const getOntRequest = (id) => axios.get(`/ont/${id}`)
export const createOntRequest = (ont) => axios.post(`/ont`, ont)
export const updateOntRequest = (id, ont) => axios.put(`/ont/${id}`, ont)
export const deleteOntRequest = (id) => axios.delete(`/ont/${id}`)