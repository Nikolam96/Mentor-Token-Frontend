import { About, Contact, Home, Auth, StartUpPage, MentorPage } from "./pages";
import {
  Register,
  RegisterMentor,
  RegisterStartup,
  Login,
  Landing,
  StartupDashboard,
  StartupMentors,
  StartupMentorId,
  StartupJobs,
  MentorDashboard,
  MentorStats,
  MentorJobs,
  Logout,
  NotFound,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";

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
        <Route element={<PrivateRoute />}>
          <Route path="startup" element={<StartUpPage />}>
            <Route path="dashboard" element={<StartupDashboard />} />
            <Route path="mentors" element={<StartupMentors />} />
            <Route path="mentors/:id" element={<StartupMentorId />} />
            <Route path="jobs" element={<StartupJobs />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="mentor" element={<MentorPage />}>
            <Route path="dashboard" element={<MentorDashboard />} />
            <Route path="stats" element={<MentorStats />} />
            <Route path="jobs" element={<MentorJobs />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
