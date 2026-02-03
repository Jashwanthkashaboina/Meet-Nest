import { useNavigate } from "react-router";
import { Card, CardContent, Button, Typography } from "@mui/material";
import '../landingPage.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFoundPage">
      <Card className="notFoundCard">
        <CardContent>
          <Typography variant="h1" className="notFoundTitle">
            404 
          </Typography>
          <Typography variant="h6" className="notFoundText">
            Oops! Page not found.
          </Typography>
          <Typography className="notFoundSubText">
            The page you are looking for might have been removed or is temporarily unavailable.
          </Typography>

          <Button
            variant="contained"
            className="notFoundButton"
            onClick={() => navigate("/home")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
