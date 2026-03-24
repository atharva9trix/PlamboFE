import UserInstance from "./http/UserPortalInstance";
import { REALM, CLIENT_NAME } from "../constants/keycloakCredentials";


export const loginUser = async (username, password) => {
  const payload = new URLSearchParams();
  payload.append("username", username);
  payload.append("password", password);
  payload.append("clientId", CLIENT_NAME);
  payload.append("realm", REALM);
  payload.append("grant_type", "password");

  return await UserInstance.post(
    `/api/users/login`,
    payload,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
};

export const signupUser = async (userData) => {
  const payload = new URLSearchParams();
  payload.append("firstName", userData.firstName);
  payload.append("lastName", userData.lastName);
  payload.append("email", userData.email);
  payload.append("username", userData.username);
  payload.append("password", userData.password);
  payload.append("clientId", CLIENT_NAME);
  payload.append("realm", REALM);
  payload.append("emailVerified", "true");

  return await UserInstance.post(
    `/api/users/signupUser`,
    payload,
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    }
  );
};


export const assignRoleToUser = async (userId, payload) => {
  return await UserInstance.post(
    `/api/users/realms/${REALM}/users/${userId}/clients/${CLIENT_NAME}`,
    payload
  );
};

export const removeRoleFromUser = async (userId, payload) => {
  return await UserInstance.delete(
    `/api/users/realms/${REALM}/users/${userId}/clients/${CLIENT_NAME}`,
    { data: payload }
  );
};

export const updateUserRoles = async (
  formData,
  userRoles,
  existingRole,
  setPromptMessage,
  setPromptModal
) => {
  const rolePayload = {
    name: existingRole.name,
    id: existingRole.id,
    description: existingRole.description,
  };

  if (!Object.hasOwn(userRoles.selected, existingRole.id)) {
    try {
      await removeRoleFromUser(formData.id, rolePayload);
    } catch (err) {
      setPromptMessage("Got an error while removing role");
      setPromptModal(true);
      return;
    }
  } else {
    try {
      await assignRoleToUser(formData.id, rolePayload);
    } catch (err) {
      setPromptMessage("Got an error while assigning role");
      setPromptModal(true);
      return;
    }
  }
};

export const getUserProfile = async (userId) => {
  return await UserInstance.get(`/api/users/${REALM}/${userId}`);
};

export const updateUserProfile = async (userId, payload) => {
  return await UserInstance.put(`/api/users/${REALM}/${userId}`, payload);
};


export const getRoles = async () => {
  return await UserInstance.get(
    `/api/realms/${REALM}/clients/${CLIENT_NAME}/roles`
  );
};

export const createUser = async (payload) => {
  return await UserInstance.post(
    `/api/users/${REALM}/${CLIENT_NAME}`,
    payload
  );
};

export const getUserRoleMappings = async (userId) => {
  return await UserInstance.get(
    `/api/users/realms/${REALM}/user/${userId}/role-mapping`
  );
};

export const getUsersByClient = async () => {
  return await UserInstance.get(
    `/api/users/getByClient/${REALM}/${CLIENT_NAME}?roleWise=true`
  );
};


export const resetUserPassword = async (payload) => {
  const formData = new URLSearchParams(payload);

  return await UserInstance.post(
    "/api/users/resetUserPassword",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const forgotPassword = async (email) => {
  const payload = new URLSearchParams({
    realm: REALM,
    clientName: CLIENT_NAME,
    email,
    redirectUrl: `${window.location.origin}/reset-password?token=`,
  });

  return await UserInstance.post(
    "/api/users/auth/forgotPassword",
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};