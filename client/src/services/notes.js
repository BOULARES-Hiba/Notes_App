import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/notes`, 
  withCredentials: true, 
});


export const createNote = async (noteData) => {
  const res = await api.post("/", noteData);
  return res.data;
};

export const getNotes = async () => {
  const res = await api.get("/");
  return res.data;
};


export const getNoteById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};


export const updateNote = async (id, updatedData) => {
  const res = await api.put(`/${id}`, updatedData);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};


export const togglePinNote = async (id) => {
  const res = await api.patch(`/${id}/pin`);
  return res.data;
};
