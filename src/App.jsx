import { About, Contact, Home } from "./pages";
import { Landing } from "./components";
import { Auth_layout, Login } from "./auth";

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
        <Route path="/login" element={<Auth_layout />} />
      </Routes>
    </>
  );
}

export default App;
