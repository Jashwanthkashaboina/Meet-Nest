import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeet from './pages/VideoMeet';
import Home from './pages/Home';
import History from './pages/History';
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

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
          <Route path="/*" element={ <NotFound /> } />
        </Routes>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} 
          toastOptions={{
          style: {
            zIndex: 99999,
          },
        }} 
      />
    </BrowserRouter>
  );
}

export default App;
