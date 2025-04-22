import './App.css'
import { useAuth } from './AuthContext';
import { NavLink } from "react-router";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

function MyInformation() {
  let navigate = useNavigate();

  const { isLoggedIn, user, token } = useAuth();

  if (!isLoggedIn || !user) {
    return <p>Et ole kirjautunut sisään</p>;
  }

  return (
    <>
      <h2>Omat tiedot</h2>
      <NavLink to="/">Takaisin</NavLink>
      <Toaster/>
      <Formik
        initialValues={{
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        }}
        onSubmit={(values) => {
          const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          };

          fetch('https://budgetapi.tonitu.dev/api/user/myinformation', options)
            .then(response => {
              if (!response.ok) {
                toast.error("Tietojen tallentaminen epäonnistui!");
                return;
              }

              toast.success("Tietojen tallentaminen onnistui!");
            })
            .catch(() => {
              toast.error("Tietojen tallentaminen epäonnistui!");
            });
        }}
      >
        {() => (
          <Form className="form-group">
            <br/>
            <label htmlFor="firstname">Etunimi</label>
            <Field name="firstname" type="text" placeholder="Etunimi" />
            <br/>
            <br/>
            <label htmlFor="lastname">Sukunimi</label>
            <Field name="lastname" type="text" placeholder="Sukunimi" />
            <br/>
            <br/>
            <label htmlFor="email">Sähköposti</label>
            <Field name="email" type="email" placeholder="Sähköposti" />
            <br/>
            <br/>
            <label htmlFor="phone">Puhelinnumero</label>
            <Field name="phone" type="text" placeholder="Puhelin" />
            <button type="submit">Tallenna</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default MyInformation;

