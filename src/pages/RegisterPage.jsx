
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateRegister } from "../utils/validation";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    const validationErrors = validateRegister({
      ...formData,
      [name]: value
    });

    setErrors(validationErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRegister(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6"
      >
        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        {errors.username && (
          <p>{errors.username}</p>
        )}

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        {errors.email && (
          <p>{errors.email}</p>
        )}

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {errors.password && (
          <p>{errors.password}</p>
        )}

        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        {errors.fullName && (
          <p>{errors.fullName}</p>
        )}

        {serverError && (
          <p>{serverError}</p>
        )}

        <button type="submit">
          Register
        </button>

        <Link to="/login">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
