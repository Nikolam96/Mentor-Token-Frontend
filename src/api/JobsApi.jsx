import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";

const fetchJobs = async ({ queryKey }) => {
  const [url, currentPage] = queryKey;
  const response = await axios.get(`${api.url_base}${url}${currentPage}`);
  return response.data.data;
};

const useJobsApi = (currentPage, url) => {
  return useQuery({
    queryKey: [url, currentPage],
    queryFn: fetchJobs,
    keepPreviousData: true,
  });
};

export default useJobsApi;
