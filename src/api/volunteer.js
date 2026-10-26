import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateVolunteer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/volunteers", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteer'] })
    }
  });
};

export const useGetVolunteers = (params = {}) => {
  const { page = 1, limit = 10, search = '', status, skills = undefined, community = undefined } = params;
  const normalizedStatus = status && status !== 'All' ? status : undefined;
  const requestParams = { page, limit, search };
  
  if (normalizedStatus) requestParams.status = normalizedStatus;
  if (skills) requestParams.skills = skills;
  if (community) requestParams.community = community;

  return useQuery({
    queryKey: ["volunteer", page, limit, search, normalizedStatus, skills, community],
    queryFn: async () => {
      const res = await axiosInstance.get("/volunteers", { params: requestParams });
      return res.data;
    },
  });
};

export const useGetVolunteerById = (id) => {
  return useQuery({
    queryKey: ["volunteer", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/volunteers/${id}`);
      return res.data;
    },
  });
};

export const useUpdateVolunteer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async ({ id, status }) => {
      const res = await axiosInstance.put(`/volunteers/${id}`, { status });
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteer']})
    }
  });
};

export const useDeleteVolunteer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["volunteer"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/volunteers/${id}`);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['volunteer']})
    }
  });
};
