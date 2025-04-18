import './App.css'
import { useAuth } from './AuthContext';
import { NavLink } from "react-router";

function App() {
  const { token, isLoggedIn, setToken } = useAuth();

  return (
    <>
    <h1>Budget6000</h1>
    <p>Pieniä testailuja</p>

    <div>
      {isLoggedIn ? <p>Token: {token}</p> : <p>Et ole kirjautunut sisään</p>}
    </div>

    {isLoggedIn ? (
      <NavLink to="logout">Kirjaudu ulos</NavLink>
    ) : (
      <>
        <NavLink to="login">Kirjaudu</NavLink>
        <br />
        <NavLink to="signup">Luo käyttäjä</NavLink>
      </>
    )}
  </>
  );
}

export default App;
