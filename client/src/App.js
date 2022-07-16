import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './routes/Register'
import Login from './routes/Login'
import Quote from './routes/Quote'

const App = () => {
  return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="quote" element={<Quote />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App