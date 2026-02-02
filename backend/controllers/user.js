import httpStatus from "http-status";
import  User  from "../models/user.js";
import bcrypt, { hash } from "bcrypt"
import  Meeting  from "../models/meeting.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ token });
};



const signup = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}


const getUserHistory = async (req, res) => {
    try {
        const username = req.user.username;
        const meetings = await Meeting.find({ user_id: user.username })
        res.status(200).json(meetings)
    } catch (e) {
        res.status(500).json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    
  const { meeting_code } = req.body; 
  const username = req.user.username;
  const newMeeting = new Meeting({
      user_id: username,
      meetingCode: meeting_code
  })

  await newMeeting.save();

  res.status(201).json({ message: "Added code to history" });
    
}


export { login, signup, getUserHistory, addToHistory }