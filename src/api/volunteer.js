import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateVolunteer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/api/volunteers", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    }
  });
};

export const useGetVolunteers = (params = {}) => {
  return useQuery({
    queryKey: ["volunteers", params],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/volunteers", { params });
      return res.data;
    },
  });
};

export const useGetVolunteerById = (id) => {
  return useQuery({
    queryKey: ["volunteer", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/volunteers/${id}`);
      return res.data;
    },
  });
};

export const useUpdateVolunteer = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer", id],
    mutationFn: async ({ ...data }) => {
      const res = await axiosInstance.put(`/api/volunteers/${id}`, data);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteers']})
    }
  });
};

export const useDeleteVolunteer = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer", id],
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/api/volunteers/${id}`);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteers']})
    }
  });
};