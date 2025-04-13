import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import { MammaMoves } from './pages/MammaMoves';
import { VideoPage } from './pages/VideoPage';
import { PricingPage } from './pages/PricingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
          }}
        >
          <Routes>
            <Route path="/" element={<h1>Welcome to Mamma Moves</h1>} />
            <Route path="/mamma-moves" element={<MammaMoves />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;