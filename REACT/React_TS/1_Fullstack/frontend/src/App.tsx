import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMemory from "./pages/AddMemory";
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMemory />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
