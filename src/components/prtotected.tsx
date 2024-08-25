"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedComponent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // Replace with your cookie name

    if (!token) {
      router.push("/login"); // Redirect to the login page if the cookie is missing
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedComponent;
