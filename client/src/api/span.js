import axios from "./axios"

export const getSpansRequest = () => axios.get(`/span`)
export const getSpanRequest = (id) => axios.get(`/span/${id}`)
export const createSpanRequest = (span) => axios.post(`/span`, span)
export const updateSpanRequest = (id, span) => axios.put(`/span/${id}`, span)
export const deleteSpanRequest = (id) => axios.delete(`/span/${id}`)