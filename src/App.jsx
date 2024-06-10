import { About, Contact, Home, Auth } from "./pages";
import {
  Register,
  RegisterMentor,
  RegisterStartup,
  Login,
  Landing,
} from "./components";
import { Routes, Route } from "react-router-dom";

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
      </Routes>
    </>
  );
}

export default App;
