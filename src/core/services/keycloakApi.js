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


