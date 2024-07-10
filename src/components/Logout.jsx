import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { removeUserStorage } from "../config/StorageFunctions";

const Logout = () => {
  useEffect(() => {
    removeUserStorage();
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
