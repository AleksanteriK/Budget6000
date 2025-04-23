import '../App.css'
import { NavLink, useNavigate } from "react-router";
import { useAuth } from '../AuthContext';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const { setToken } = useAuth();
  let navigate = useNavigate();

  const handleLogin = (values: { username: any; password: any; }) => {
    const username = values.username;
    const password = values.password;

    if (!username || !password) {
      toast.error("Anna käyttäjätunnus ja salasana!");
      return;
    }

    const details = {
      username: username,
      password: password
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    };
    fetch('https://budgetapi.tonitu.dev/api/user/login', options)
      .then(response => response.json())
      .then(data => {
        // Check if login was successful
        if (data.token !== undefined) {
          toast.success("Kirjauduttu sisään!");
          setToken(data.token);
          navigate("/");
          return;
        }

        toast.error("Väärä käyttäjätunnus tai salasana!");
      })
      .catch(() => {
        // 401 -> Väärä käyttäjätunnus tai salasana
        toast.error("Väärä käyttäjätunnus tai salasana!");
      });
  }

  return (
    <>
      <div><Toaster /></div>
      <img src="/logo.png" alt="Logo" style={{ width: '25%', height: 'auto' }} />
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}
      >
        <Form className="form-group">
          <label htmlFor="username">Käyttäjätunnus</label>
          <Field
            id="username"
            name="username"
            placeholder="Käyttäjätunnus"
          />
          <br />
          <br />
          <label htmlFor="password">Salasana</label>
          <Field
            id="password"
            name="password"
            placeholder="Salasana"
            type="password"
          />
          <br />
          <br />
          <button type="submit">Kirjaudu sisään</button>
        </Form>
      </Formik>
      <NavLink to="/signup">Luo käyttäjä</NavLink>
    </>
  )
}

export default Login