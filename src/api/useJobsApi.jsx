import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";

const fetchJob = async ({ data, url, headers, fetchMethod }) => {
  const response = await axios({
    method: fetchMethod,
    url: `${api.url_base}/${url}`,
    data: data,
    headers: {
      "Content-Type": headers,
    },
  });
  return response.data.data;
};

const useJobsApi = (setError, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchJob,
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
      {
        handleClose && handleClose();
      }
      setError(null);
    },
    onError: (error) => {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message || "Internal server error";
      setError(errorMsg);
    },
  });
};
export default useJobsApi;
