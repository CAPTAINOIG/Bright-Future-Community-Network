import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

export const useGetOverview = ( ) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/dashboard/overview");
      return res.data;
    },
     onSuccess: () =>{
      queryClient.invalidateQueries({queryKey : ['overview']})
    }
  });
};