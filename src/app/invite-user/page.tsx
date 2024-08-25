"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extract token from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get("token");
    
    if (!tokenFromQuery) {
      setError("Invalid token");
      return;
    }

    setToken(tokenFromQuery);
  }, []);

  const handleResetPassword = async () => {
    if (!token) {
      setError("Token is missing");
      return;
    }

    try {
      const response = await fetch(process.env.PORT+"/user/reset", { // Ensure the protocol is included
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setSuccess(true);
      // Optionally, redirect the user or display a success message
      // router.push('/login'); // Uncomment this line if you want to redirect
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Password reset successful!</p>}

      {!success && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleResetPassword} // Trigger password reset
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
