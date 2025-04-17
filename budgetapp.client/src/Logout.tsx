import './App.css'
import { NavLink } from "react-router";
import { useAuth } from './AuthContext';

function Logout() {

  const { setToken } = useAuth();
  setToken(null);

  return (
    <>
      <p>Kirjauduit ulos!</p>

      <NavLink to="/">Takaisin</NavLink>
    </>
  )
}

export default Logout
