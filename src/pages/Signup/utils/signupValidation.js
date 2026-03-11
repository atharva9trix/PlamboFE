export function validateSignup({
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword
}) {
  if (!firstName?.trim()) return "First name is required.";
  if (!lastName?.trim()) return "Last name is required.";
  if (!email?.trim()) return "Email is required.";
  if (!username?.trim()) return "Username is required.";
  if (!password) return "Password is required.";
  if (password !== confirmPassword) return "Passwords do not match.";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email.";

  if (password.length < 4) return "Password must be at least 4 characters.";

  return null;
}
