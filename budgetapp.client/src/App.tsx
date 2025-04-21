import './App.css'
import { useAuth } from './AuthContext';
import { NavLink } from "react-router";

function App() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
    <h1>Budget6000</h1>
    <p>Pieniä testailuja</p>

    <div>
      {isLoggedIn && user ? (
        <h2>Hyvää päivää, {user.firstname} {user.lastname}!</h2>
      ) : (
        <p>Et ole kirjautunut sisään</p>
      )}
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
