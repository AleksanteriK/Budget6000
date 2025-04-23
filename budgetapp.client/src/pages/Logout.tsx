import '../App.css'
import { NavLink } from "react-router";
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';

function Logout() {

  const { setToken } = useAuth();
  
  useEffect(() => {
    setToken(null);
  }, [setToken]);

  return (
    <>
      <p>Kirjauduit ulos!</p>
      <NavLink to="/">Takaisin</NavLink>
    </>
  )
}

export default Logout;
