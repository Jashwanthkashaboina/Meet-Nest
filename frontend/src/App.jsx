import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeet from './pages/VideoMeet';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route  path='/meet/:url' element={ <VideoMeet /> }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
