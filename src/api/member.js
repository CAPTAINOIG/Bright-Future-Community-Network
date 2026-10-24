import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/api/members/register", data);
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] })
    }
  });
};

export const useGetMember = (params = {}) => {
  const { page = 1, limit = 10, search = '', status = undefined } = params;
  return useQuery({
    queryKey: ["member", page, limit, search, status],
     params: {
      page,
      limit,
      search,
      status,
    },
    queryFn: async () => {
      const res = await axiosInstance.get("/api/members", { params });
      return res.data;
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/members/${id}`);
      return res.data
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['member']})
    }
  });
};  

export const useEditMember = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async ({ ...data }) => {
      const res = await axiosInstance.put(`/api/members/${id}`, data);
      return res.data
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['member']})
    }
  });
};
