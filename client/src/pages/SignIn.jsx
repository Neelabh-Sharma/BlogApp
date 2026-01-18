import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, selectIsLoading, selectUserError } from "../features/userSlice";

function SignInForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectUserError);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await dispatch(
        login({
          email: formData.email.trim(),
          password: formData.password,
          remember: formData.remember,
        })
      );

      if (login.fulfilled.match(result)) {
        onLogin?.(result.payload.token);
        navigate("/dashboard", {
          state: { user: result.payload.user || result.payload },
        });
      } else {
        setErrors({
          submit: result.payload || "Invalid credentials",
        });
      }
    } catch {
      setErrors({ submit: "Something went wrong" });
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      

      {/* Auth Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 space-y-6">

            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your account
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Error */}
            {(errors.submit || serverError) && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {errors.submit || serverError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>

                <a
                  href="/forgetpassword"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>

              <Link
                to="/"
                className="text-xs text-gray-400 hover:text-blue-600"
              >
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
