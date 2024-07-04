import { About, Contact, Home, Auth, StartUpPage } from "./pages";
import {
  Register,
  RegisterMentor,
  RegisterStartup,
  Login,
  Landing,
  StartupDashboard,
  StartupMentors,
} from "./components";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Landing />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register-start-up" element={<RegisterStartup />} />
          <Route path="register-mentor" element={<RegisterMentor />} />
        </Route>
        {/* <PrivateRoute> */}
        <Route element={<StartUpPage />}>
          <Route path="startup/dashboard" element={<StartupDashboard />} />
          <Route path="startup/mentors" element={<StartupMentors />} />
        </Route>
        {/* </PrivateRoute> */}
      </Routes>
    </>
  );
}

export default App;
