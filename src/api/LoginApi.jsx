import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { setUserStorage } from "../config/StorageFunction";

const LoginApi = ({ user, setSpinner, setError }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${api.url_base}/login`, user);
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.data.token;
      const decodedToken = decodeToken(token);

      setUserStorage(token, decodedToken.id);

      setTimeout(() => {
        setSpinner(false);
        navigate("/", { state: decodedToken });
      }, 1000);
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Invalid email or password";
      setError(errorMsg);
      setSpinner(false);
    },
    onMutate: () => {
      setSpinner(true);
    },
  });

  return mutation.mutate;
};

export default LoginApi;
