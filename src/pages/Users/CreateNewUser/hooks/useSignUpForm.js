import { useState } from "react";
import {
  createUser,
  assignRoleToUser,
} from "../../../../core/services/keycloakApi";

const useSignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { firstName, lastName, email, username, role } = formData;

    if (!firstName || !lastName || !email || !username || !role) {
      setError("Please fill in all required fields including role.");
      return;
    }

    try {
      setLoading(true);
      const tempPassword = `${username}@123`;
      const payload = {
        username,
        email,
        firstName,
        lastName,
        enabled: true,
        emailVerified: true,
        credentials: [
          { type: "password", value: tempPassword, temporary: false },
        ],
      };

      const res = await createUser(payload);

      if (res.status === 201 && res.data?.data?.id) {
        const userId = res.data.data.id;
        await assignRoleToUser(userId, {
          id: role.id,
          name: role.name,
          description: role.description,
        });

        setSuccess(`User created & role assigned!\n Password: ${tempPassword}`);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          role: null,
        });
      } else {
        setError("User creation failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, error, success, loading, handleChange, handleSubmit };
};

export default useSignupForm;
