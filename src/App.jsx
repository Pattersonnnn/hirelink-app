import { BrowserRouter, Routes, Route } from "react-router-dom"
import Jobs from "./pages/Jobs"
import Apply from "./pages/Apply"
import ThankYou from "./pages/ThankYou"
import Admin from "./pages/Admin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
