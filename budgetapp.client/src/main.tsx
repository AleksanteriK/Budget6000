import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Logout from './Logout.tsx'
import Signup from "./Signup.tsx";
import MyInformation from "./Myinformation.tsx";
import { AuthProvider } from './AuthContext';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="myinformation" element={<MyInformation />} />
          { /*TODO: Tiedostot puuttuu vielä */}
          <Route path="account" element={<App />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
