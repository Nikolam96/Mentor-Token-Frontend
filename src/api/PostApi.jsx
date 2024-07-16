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
      const token = data?.data?.token;
      if (token) {
        const decodedToken = decodeToken(token);
        console.log(decodedToken);
        setUserStorage(
          token,
          decodedToken.id,
          decodedToken.role,
          decodedToken.name,
          decodedToken.startUpName,
          decodedToken.picture
        );
        console.log(decodedToken);
        if (decodedToken.role == "mentor") {
          setSpinner(false);
          return navigate("/mentor/dashboard");
        }
        if (decodedToken.role == "startup") {
          setSpinner(false);
          return navigate("/startup/dashboard");
        }
      }

      navigate(navigateUrl, { state: { user } });
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
