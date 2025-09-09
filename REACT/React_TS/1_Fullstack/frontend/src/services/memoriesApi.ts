import { api } from "./api";

export async function getMemories() {
  const res = await api.get("/memories");
  return res.data;
}

export async function createMemory(data: FormData) {
  const res = await api.post("/memories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
