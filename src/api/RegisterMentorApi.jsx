import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { setUserStorage } from "../config/StorageFunction";

const RegisterMentorApi = ({ user, setSpinner, setError }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${api.url_base}/signup`, user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.data.token;
      const decodedToken = decodeToken(token);

      setUserStorage(token, decodedToken.id);

      setTimeout(() => {
        navigate("/login", { state: decodedToken });
        setSpinner(false);
      }, 1000);
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Startup Name already exists.";
      setError(errorMsg);
      setSpinner(false);
    },
    onMutate: (data) => {
      setSpinner(true);
    },
  });

  return mutation.mutate;
};

export default RegisterMentorApi;
