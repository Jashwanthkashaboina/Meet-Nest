import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth", { replace: true });
      } else {
        setAllowed(true);
      }
    }, [navigate]);

    if (!allowed) return null; 

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
