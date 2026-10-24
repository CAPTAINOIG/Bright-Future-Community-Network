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
  const { page = 1, limit = 10, search = '', status } = params;
  // "All" is a UI option, not a volunteer status understood by the API.
  const normalizedStatus = status && status !== 'All' ? status : undefined;
  const requestParams = { page, limit, search };
  if (normalizedStatus) requestParams.status = normalizedStatus;

  return useQuery({
    queryKey: ["volunteers", page, limit, search, normalizedStatus],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/volunteers", { params: requestParams });
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

export const useUpdateVolunteer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async ({ id, ...data }) => {
      const res = await axiosInstance.put(`/api/volunteers/${id}`, data);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteers']})
    }
  });
};

export const useDeleteVolunteer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/volunteers/${id}`);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteers']})
    }
  });
};
