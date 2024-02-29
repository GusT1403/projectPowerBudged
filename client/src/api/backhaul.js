import axios from "./axios"

export const getBackhaulsRequest = () => axios.get(`/backhaul`)
export const getBackhaulRequest = (id) => axios.get(`/backhaul/${id}`)
export const createBackhaulRequest = (backhaul) => axios.post(`/backhaul`, backhaul)
export const updateBackhaulRequest = (id, backhaul) => axios.put(`/backhaul/${id}`, backhaul)
export const deleteBackhaulRequest = (id) => axios.delete(`/backhaul/${id}`)