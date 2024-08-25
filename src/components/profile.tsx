"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie"; // Add this to manage cookies
import FullScreenLoader from "./loading";
import { logoutUser } from "@/action/authActions";
import { useDispatch } from "react-redux";
import { logout } from "@/auth/auth-slice";

function Profile({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(logoutUser() as any).unwrap();
      dispatch(logout());

      router.push("/login");
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Hi, {user?.name}!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Email: <span className="font-semibold">{user?.email}</span>
        </p>
        <button
          onClick={handleLogout}
          className={`mt-6 px-4 py-2 text-white bg-red-500 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
          disabled={loading}
        >
          {loading ? <FullScreenLoader /> : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
