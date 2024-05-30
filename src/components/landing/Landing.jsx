import { Navbar, Footer } from "../../components";
import { Outlet } from "react-router-dom";

const Landing = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children || <Outlet />}
      <Footer />
    </div>
  );
};
export default Landing;
