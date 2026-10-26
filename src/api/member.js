import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/members/register", data);
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] })
    }
  });
};

export const useGetMember = (params = {}) => {
  const { page = 1, limit = 10, search = '', isActive = undefined, communityFilter = undefined, interestFilter = undefined } = params;
  const queryParams = {
    page,
    limit,
    search,
    ...(isActive !== undefined && { isActive }),
    ...(communityFilter && { community: communityFilter }),
    ...(interestFilter && { interests: interestFilter }),
  };
  return useQuery({
    queryKey: ["member", page, limit, search, isActive, communityFilter, interestFilter],
    queryFn: async () => {
      const res = await axiosInstance.get("/members", { params: queryParams });
      return res.data;
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/members/${id}`);
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
      const res = await axiosInstance.put(`/members/${id}`, data);
      return res.data
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['member']})
    }
  });
};
