import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { setUserStorage } from "../config/StorageFunctions";

const PostApi = ({ user, setSpinner, setError, navigateUrl, url, headers }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${api.url_base}/${url}`, user, {
        headers: {
          "Content-Type": headers,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(user);

      const token = data?.data?.token;
      if (token) {
        const decodedToken = decodeToken(token);
        setUserStorage(token, decodedToken.id);

        setTimeout(() => {
          setSpinner(false);
          navigate(navigateUrl, { state: decodedToken });
        }, 1000);
      }

      setTimeout(() => {
        setSpinner(false);
        navigate(navigateUrl, { state: { user } });
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message || "Internal Server Error";
      setError(errorMsg);
      setSpinner(false);
    },
    onMutate: () => {
      setSpinner(true);
    },
  });

  return mutation.mutate;
};

export default PostApi;
