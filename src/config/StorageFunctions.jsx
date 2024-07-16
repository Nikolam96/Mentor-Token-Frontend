export const getToken = () => {
  return localStorage.getItem("token");
};
export const getRole = () => {
  return localStorage.getItem("role");
};
export const getId = () => {
  return localStorage.getItem("id");
};
export const getName = () => {
  return localStorage.getItem("name");
};
export const getStartUpName = () => {
  return localStorage.getItem("startUpName");
};
export const getPicture = () => {
  return localStorage.getItem("picture");
};

export const setUserStorage = (token, id, role, name, startUpName, picture) => {
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
  localStorage.setItem("role", role);
  localStorage.setItem("name", name);
  localStorage.setItem("startUpName", startUpName);
  localStorage.setItem("picture", picture);
};

export const removeUserStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("startUpName");
  localStorage.removeItem("picture");
  window.location.reload();
};
