import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded?.exp > currentTime;
  } catch {
    return false;
  }
};


export const getUserInfoFromToken = (token) => {
  if (!token || typeof token !== "string") return null;

  try {
    const decoded = jwtDecode(token);

    if (!decoded || typeof decoded !== "object") return null;

    const roles =
      decoded?.resource_access?.[decoded?.azp]?.roles || [];

    const normalizedRoles = Array.isArray(roles)
      ? roles.map((r) => r?.toLowerCase?.()).filter(Boolean)
      : [];

    return {
      id: decoded?.sub || "",
      name: decoded?.name || "",
      username: decoded?.preferred_username || "",
      email: decoded?.email || "",
      roles: normalizedRoles,
      role: normalizedRoles.includes("admin")
        ? "admin"
        : normalizedRoles[0] || "user",
    };
  } catch (error) {
  
    return null;
  }
};
