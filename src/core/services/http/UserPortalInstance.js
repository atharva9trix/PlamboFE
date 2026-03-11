import axios from "axios"; 
import { USER_PORTAL_URL, API_AUTH_TOKEN } from "../../constants/keycloakCredentials";

const UserInstance = axios.create({
  baseURL : USER_PORTAL_URL,
  headers: {
    Authorization: API_AUTH_TOKEN,
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
  },
});

export default UserInstance;
