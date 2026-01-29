import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
import '../videoMeet.css';

const server_url = 'http://localhost:5000';
const peerConfigConnections = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
}

export default function VideoMeet() {
    const socketRef = useRef();
    const socketIdRef = useRef();

    const localVideoRef = useRef();

    const [videoAvailable, setVideoAvailable] = useState(false);
    const [audioAvailable, setAudioAvailable] = useState(false);

    const [video, setVideo] = useState();
    const [audio, setAudio] = useState();

    const [screenShare, setScreenShare] = useState();
    const [showModal, setShowModal] = useState();
    const [screenAvailable, setScreenAvailable] = useState();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [newMessages, setNewMessages] = useState(0);

    const [akUserName, setAskUserName] = useState(true);
    const [userName, setUserName] = useState('');

    const videoRef = useRef([]);
    const [videos, setVideos] = useState([]);

    const [localStream, setLocalStream] = useState(null);

    // Get user media
    const getPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            setLocalStream(stream);
            setVideoAvailable(stream.getVideoTracks().length > 0);
            setAudioAvailable(stream.getAudioTracks().length > 0);

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            if (navigator.mediaDevices.getDisplayMedia) setScreenShare(true);
            else setScreenShare(false);

            // Initialize video/audio toggle states
            setVideo(stream.getVideoTracks().length > 0);
            setAudio(stream.getAudioTracks().length > 0);

        } catch (err) {
            console.error("Media permission error:", err);
            setVideoAvailable(false);
            setAudioAvailable(false);
        }
    }

    // Stop media tracks on unmount
    useEffect(() => {
        getPermissions();
        return () => {
            localStream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    // Toggle video/audio tracks when state changes
    useEffect(() => {
        if (!localStream) return;

        localStream.getVideoTracks().forEach(track => {
            if (video !== undefined) track.enabled = video;
        });
        localStream.getAudioTracks().forEach(track => {
            if (audio !== undefined) track.enabled = audio;
        });
    }, [video, audio, localStream]);

    let connectToSocketServer = () =>{
        socketRef.current = io.connect(server_url);
        
        socketRef.current.on('connect', () => {
            console.log('connected to : ', socketRef.current.id);
        });

        socketRef.current.on('disconnect', () =>{
            console.log('Disconnected from Server');
        })
    }
    // Initialize video/audio states manually
    const getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    return (
        <div>
            {akUserName ? (
                <div>
                    <h2>Enter into Lobby</h2>
                    <TextField
                        id='outlined-basic'
                        label='Username'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        variant='outlined'
                    />
                    <Button variant="contained" onClick={getMedia}>Connect</Button>
                    <div>
                        <video
                            ref={localVideoRef}
                            muted
                            autoPlay
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
