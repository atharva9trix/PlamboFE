export const isAuthenticated = () => {
  return localStorage.getItem("authUser") ? true : false;
};

