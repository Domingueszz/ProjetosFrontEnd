import { api } from "./api";

// READ - Busca todas as memórias
export async function getMemories() {
  const res = await api.get("/memories");
  return res.data;
}

// CREATE 
export async function createMemory(data: FormData) {
  const res = await api.post("/memories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

// UPDATE 
export async function updateMemory(
  id: string,
  data: { title: string; description: string }
) {
  const res = await api.put(`/memories/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}




// DELETE
export async function deleteMemory(id: string) {
  const res = await api.delete(`/memories/${id}`);
  return res.data;
}