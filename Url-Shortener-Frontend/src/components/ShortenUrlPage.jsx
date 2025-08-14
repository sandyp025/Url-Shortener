import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      const redirectTimer = setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
      }, 1200); 
      return () => clearTimeout(redirectTimer);
    }
  }, [url]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800">
      <ImSpinner2 className="animate-spin text-5xl mb-4" />
      <p className="text-lg font-medium flex items-center gap-2">
        Redirecting you <FaExternalLinkAlt /> please wait...
      </p>
    </div>
  );
};

export default ShortenUrlPage;
