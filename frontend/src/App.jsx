import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeet from './pages/VideoMeet';
import Home from './pages/Home';
import History from './pages/History';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/auth" element={<Authentication />} />
          <Route  path='/meet/:url' element={ <VideoMeet /> }/>
          <Route path="/history" element={ <History /> } />
        </Routes>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
