"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otpReset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      setStep("otpReset");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerifyOtpAndResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(process.env.PORT + "/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: otp, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP or reset password");
      }

      alert("Password has been reset successfully");
      setStep("email");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      {error && <p className="text-red-500">{error}</p>}

      {step === "email" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSendOtp}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "otpReset" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Verify OTP & Reset Password
          </h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
          />
          <button
            onClick={handleVerifyOtpAndResetPassword}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Verify OTP & Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
