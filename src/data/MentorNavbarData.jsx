import { avatar, logout, dash, stats, job } from "./StartupSvg";
const MentorData = [
  {
    text: "Dashboard",
    to: "/mentor/dashboard",
    img: dash,
  },
  {
    text: "My Stats",
    to: "/mentor/stats",
    img: stats,
  },
  {
    text: "Job Feed",
    to: "/mentor/jobs",
    img: job,
  },
  {
    text: "Logout",
    to: "/mentor/logout",
    img: logout,
  },
];

export default MentorData;
