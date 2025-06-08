import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home" 
import BillboardMapPage from './pages/map'
import BillboardReservationPage from './pages/reservation'
import AIPromptPage from "./pages/prompt"
import Navbar from './components/navbar'
function App() {
  return (
    <div dir="rtl" className='bg-gradient-to-b from-gray-900 to-gray-800'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<BillboardMapPage />} />
        <Route path="/reservation" element={<BillboardReservationPage />} />
        <Route path="/ai" element={<AIPromptPage />} />
      </Routes>
    </div>
  );
}




export default App;