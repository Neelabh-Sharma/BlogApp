import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // TODO: Replace with real API call
    setTimeout(() => {
      setLoading(false);
      setMessage("If an account exists, a password reset link has been sent.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
        
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Forgot Password
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter your registered email to receive a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-green-600 text-center">
            {message}
          </p>
        )}

        {/* Footer links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
