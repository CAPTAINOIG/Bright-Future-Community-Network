import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

// ─── Public Hooks ──────────────────────────────────────────

export const useGetPublishedNews = (params = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    category,
    featured,
    language,
    sort = "latest",
  } = params;

  const normalizedStatus = status && status !== "All" ? status : undefined;
  const normalizedCategory = category && category !== "All" ? category : undefined;

  const requestParams = { page, limit, sort };
  if (search) requestParams.search = search;
  if (normalizedStatus) requestParams.status = normalizedStatus;
  if (normalizedCategory) requestParams.category = normalizedCategory;
  if (featured) requestParams.featured = "true";
  if (language) requestParams.language = language;

  return useQuery({
    queryKey: ["publishedNews", page, limit, search, normalizedStatus, normalizedCategory, featured, language, sort],
    queryFn: async () => {
      const res = await axiosInstance.get("/news", { params: requestParams });
      return res.data;
    },
  });
};

export const useGetNewsBySlug = (slug) => {
  return useQuery({
    queryKey: ["newsBySlug", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/news/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
};

// ─── Admin Hooks ───────────────────────────────────────────

export const useGetAllNews = (params = {}) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    status,
    category,
    source,
    author,
    language,
    sort = "latest",
  } = params;

  const normalizedStatus = status && status !== "All" ? status : undefined;
  const normalizedCategory = category && category !== "All" ? category : undefined;

  const requestParams = { page, limit, sort };
  if (search) requestParams.search = search;
  if (normalizedStatus) requestParams.status = normalizedStatus;
  if (normalizedCategory) requestParams.category = normalizedCategory;
  if (source) requestParams.source = source;
  if (author) requestParams.author = author;
  if (language) requestParams.language = language;

  return useQuery({
    queryKey: ["allNews", page, limit, search, normalizedStatus, normalizedCategory, source, author, language, sort],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/news/admin", { params: requestParams });
        return res.data;
      } catch (error) {
        console.error("Error fetching all news:", error.response?.data || error.message);
        throw error;
      }
    },
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/news", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
      queryClient.invalidateQueries({ queryKey: ["publishedNews"] });
      queryClient.invalidateQueries({ queryKey: ["newsStats"] });
    },
  });
};

export const useGetNewsById = (id) => {
  return useQuery({
    queryKey: ["newsById", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/news/admin/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosInstance.patch(`/news/admin/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
      queryClient.invalidateQueries({ queryKey: ["publishedNews"] });
      queryClient.invalidateQueries({ queryKey: ["newsStats"] });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/news/admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
      queryClient.invalidateQueries({ queryKey: ["publishedNews"] });
      queryClient.invalidateQueries({ queryKey: ["newsStats"] });
    },
  });
};

export const useGetNewsStats = () => {
  return useQuery({
    queryKey: ["newsStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/news/admin/stats");
      return res.data;
    },
  });
};

export const useFetchRSS = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/news/admin/fetch");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
      queryClient.invalidateQueries({ queryKey: ["publishedNews"] });
      queryClient.invalidateQueries({ queryKey: ["newsStats"] });
    },
  });
};

// ─── Source Management Hooks ───────────────────────────────

export const useGetNewsSources = () => {
  return useQuery({
    queryKey: ["newsSources"],
    queryFn: async () => {
      const res = await axiosInstance.get("/news/admin/sources");
      return res.data;
    },
  });
};

export const useCreateNewsSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/news/admin/sources", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsSources"] });
    },
  });
};

export const useUpdateNewsSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosInstance.patch(`/news/admin/sources/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsSources"] });
    },
  });
};

export const useDeleteNewsSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/news/admin/sources/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsSources"] });
    },
  });
};
