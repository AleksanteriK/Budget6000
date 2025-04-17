import './App.css'
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from './AuthContext';

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Logging in with:', username, password)
    // Here you'd usually send data to your backend
  }

  return (
    <>
      <p>Moro tää on login, en oo hyvä tekee designei</p>
      <p>Nää voi tehä myös jollai formi libraryllä, esim joskus käytin Formik. TÄÄ VAAN TESTINÄ!!</p>

      <div>
        <form onSubmit={handleLogin}>
          <h2>Kirjaudu sisään</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Kirjaudu sisään</button>
        </form>
      </div>

      <NavLink to="/">Takaisin</NavLink>
    </>
  )
}

export default Login