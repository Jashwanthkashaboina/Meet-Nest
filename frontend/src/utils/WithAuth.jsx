import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in first!");
         // Save the attempted path
        localStorage.setItem("redirectAfterLogin", location.pathname);
        navigate("/auth", { replace: true });
      } else {
        setAllowed(true);
      }
    }, [navigate, location]);

    if (!allowed) return null; 

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
