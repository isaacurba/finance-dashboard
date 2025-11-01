import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../components/lib/appwrite";
import { toast } from "sonner";
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setLoading(false);
      } catch (error) {
        toast.error("Please login to continue");
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    ); 
  }

  return children;
};

export default ProtectedRoute;
