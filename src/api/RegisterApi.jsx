import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";
import { useNavigate } from "react-router-dom";

const RegisterApi = ({ form, setSpinner, setError }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const url = `${api.url_base}/checkEmail`;
      console.log("Request URL:", url);
      const response = await axios.post(url, {
        email: form.email,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate(
        form.role === "mentor" ? "/register-mentor" : "/register-start-up",
        { state: { form } }
      );
      setSpinner(false);
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Email already exists.";
      setError(errorMsg);
      setSpinner(false);
    },
    onMutate: () => {
      setSpinner(true);
    },
  });

  return mutation.mutate;
};

export default RegisterApi;
