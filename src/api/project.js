import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["project"],
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/projects", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useGetProject = ({ params = {} }) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    category = undefined,
    projectLead = undefined,
  } = params;
  const queryParams = { page, limit, search, status, category, projectLead };
  return useQuery({
    queryKey: ["project", page, limit, status, search, category, projectLead],
    queryFn: async () => {
      const res = await axiosInstance.get("/projects", {
        params: queryParams,
      });
      return res.data;
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["project"],
    mutationFn: async ({ id, ...data }) => {
      const res = await axiosInstance.put(`/projects/${id}`, data);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['project']})
    }
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["project"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/projects/${id}`);
      return res.data;
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['project']})
    }
  });
};
