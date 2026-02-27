export function validateLogin(username, password) {
  if (!username || !password) {
    return "Both fields are required.";
  }

  return null;
}