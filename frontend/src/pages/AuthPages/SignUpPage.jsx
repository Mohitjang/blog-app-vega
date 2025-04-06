import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const { signUp, error, isLoading } = useAuthStore();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      setFormData((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));
    } else {
      // other fields
      if (name === "username") {
        setFormData((prev) => ({
          ...prev,
          username: value,
        }));
      }
      if (name === "email") {
        setFormData((prev) => ({
          ...prev,
          email: value,
        }));
      }
      if (name === "password") {
        setFormData((prev) => ({
          ...prev,
          password: value,
        }));
      }
      if (name === "confirmPassword") {
        setFormData((prev) => ({
          ...prev,
          confirmPassword: value,
        }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      try {
        await signUp({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          profilePicture: formData.profilePicture,
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
      // Add submission logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              className="w-full"
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
