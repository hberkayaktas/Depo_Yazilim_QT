import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './Page/Home'
import DetailPage from './Page/Detail'
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <div className='container'>
    <div className="row mt-3">
    {/* İİçerik Paneli */}
    <div className="row justify-content-center">
         <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/product/:id' element={<DetailPage />} />
          </Routes>
        

    </div>
    {/*  İçerik paneli  Bitişi */}
   </div>
   </div>
  </BrowserRouter>
  </>
  );
}

export default App;
