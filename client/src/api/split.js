import axios from "./axios"

export const getSplitsRequest = () => axios.get(`/split`)
export const getSplitRequest = (id) => axios.get(`/split/${id}`)
export const createSplitRequest = (split) => axios.post(`/split`, split)
export const updateSplitRequest = (id, split) => axios.put(`/split/${id}`, split)
export const deleteSplitRequest = (id) => axios.delete(`/split/${id}`)