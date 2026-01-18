import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  signup,
  selectIsLoading,
  selectUserError,
} from "../features/userSlice";

function SignUpForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
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
    const { email, password, confirmPassword, termsAccepted } = formData;

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password || password.length < 8)
      newErrors.password = "Minimum 8 characters required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";

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
        signup({
          email: formData.email.trim(),
          password: formData.password,
        })
      );

      if (signup.fulfilled.match(result)) {
        onLogin?.(result.payload.token);
        navigate("/dashboard", {
          state: { user: result.payload.user, isNewUser: true },
        });
      } else {
        setErrors({ submit: result.payload || "Signup failed" });
      }
    } catch {
      setErrors({ submit: "Something went wrong" });
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
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
                Create your account
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Join us and get started
              </p>
            </div>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
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

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I agree to the{" "}
                <span className="text-blue-600">Terms</span> &{" "}
                <span className="text-blue-600">Privacy Policy</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign in
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

export default SignUpForm;
