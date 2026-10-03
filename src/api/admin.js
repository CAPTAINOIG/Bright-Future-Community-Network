import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useAdminLogin = () => {
  return useMutation({
    mutationKey: ["admin"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/api/auth/adminLogin", data);
      return res.data
    },
  });
};