import { api } from "../api";

export const checkServerSession = async () => {
  const res = await api.post("/auth/session");
  return res.data;
};
