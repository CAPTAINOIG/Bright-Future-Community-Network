import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateMember = () => {
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/api/members/register", data);
      return res.data
    },
  });
};

export const useGetMember = () => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/members");
      return res.data;
    },
     onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['member']})
    }
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

export const useEditMember = () => {
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (data) => {
      const res = await axiosInstance.put("/api/members", data);
      return res.data
    },
  });
};
