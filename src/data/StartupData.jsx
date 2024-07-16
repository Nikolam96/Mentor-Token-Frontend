import { avatar, logout, dash, jobs } from "./StartupSvg";
const StartupData = [
  {
    text: "Dashboard",
    to: "/startup/dashboard",
    img: dash,
  },
  {
    text: "Mentors",
    to: "/startup/mentors",
    img: avatar,
  },
  {
    text: "Jobs",
    to: "/startup/jobs",
    img: jobs,
  },
  {
    text: "Logout",
    to: "/startup/logout",
    img: logout,
  },
];

export default StartupData;
