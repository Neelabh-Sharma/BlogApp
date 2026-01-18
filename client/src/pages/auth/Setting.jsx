import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, Mail, Shield, CheckCircle, AlertCircle, Settings as SettingsIcon } from "lucide-react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";

const DashboardLayout = ({onLogout}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", content: "All fields are required." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", content: "New passwords do not match." });
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setMessage({ type: "error", content: "New password does not meet requirements." });
      return;
    }

    if (currentPassword === newPassword) {
      setMessage({ type: "error", content: "New password must be different from current password." });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", content: "✓ Password updated successfully!" });
      
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 4000);
    } catch (error) {
      setMessage({ type: "error", content: "Failed to update password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} toggleSidebar={toggleSidebar} />
      <main className="pt-28 pb-8 pl-0 sm:pl-72 pr-4 sm:pr-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <SettingsIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Account Settings
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Manage your account security and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Password Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                    <p className="text-gray-600 text-sm">Update your password regularly to keep your account secure</p>
                  </div>
                </div>

                {/* Success Message */}
                {message.type === "success" && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border-l-4 border-green-500 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{message.content}</p>
                      <p className="text-sm text-green-600 mt-1">Your password has been changed successfully.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {message.type === "error" && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border-l-4 border-red-500 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Error</p>
                      <p className="text-sm text-red-600 mt-1">{message.content}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Requirements */}
                    {newPassword && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</p>
                        <div className="space-y-2">
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordValidation.requirements.minLength ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">At least 8 characters</span>
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordValidation.requirements.hasUpperCase ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">One uppercase letter (A-Z)</span>
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordValidation.requirements.hasLowerCase ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">One lowercase letter (a-z)</span>
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.hasNumbers ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordValidation.requirements.hasNumbers ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">One number (0-9)</span>
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordValidation.requirements.hasSpecialChar ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">One special character (!@#$%^&*)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setMessage({ type: "", content: "" });
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !passwordValidation.isValid || newPassword !== confirmPassword}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <span>{isLoading ? "Updating..." : "Update Password"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Security Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-blue-900 text-lg">Security Tips</h3>
                </div>
                <ul className="text-sm text-blue-800 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Use unique passwords for each account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Consider using a password manager</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Avoid personal information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Change passwords every 90 days</span>
                  </li>
                </ul>
              </div>

              {/* Account Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Account Active</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Email Verified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-yellow-700 font-medium">Two-Factor: Not Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;