// RouteGuard.js
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RouteGuard = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("coder");
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default RouteGuard;
