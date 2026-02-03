import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import '../landingPage.css';



export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        const fetchHistory = async() => {
            try{
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch(err){
                toast.error(err.response?.data?.message || 'Failed to fetch history');
                console.error(err);
            }
        }
        fetchHistory();
    },[]);
    return (
        <>
          <div className="historyPage">
                <div className="historyHeader">
                    <IconButton onClick={() => navigate("/home")}>
                    <HomeIcon />
                    </IconButton>
                    <h2>Meeting History</h2>
                </div>

                <div className="historyList">
                    {meetings.map(e => (
                    <Card
                        key={e._id}
                        variant="outlined"
                        className="historyCard"
                    >
                        <CardContent>
                        <Typography className="meetingCode">
                            Meeting Code: {e.meetingCode}
                        </Typography>

                        <Typography className="meetingDate">
                            {new Date(e.createdAt).toLocaleString()}
                        </Typography>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
 
        </>
    );
}