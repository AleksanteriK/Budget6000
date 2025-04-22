import '../App.css';
import { useAuth } from '../AuthContext';
import { NavLink } from "react-router";
import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

function Account() {
  const { isLoggedIn, user, token, refreshUser, setToken } = useAuth();

  if (!isLoggedIn || !user) {
    return <p>Et ole kirjautunut sisään</p>;
  }

  const handlePasswordChange = (values: { oldPassword: string; newPassword: string; newPasswordAgain: string;}) => {
    const { oldPassword, newPassword, newPasswordAgain } = values;

    if (!oldPassword || !newPassword) {
      toast.error("Anna vanha ja uusi salasana!");
      return;
    }

    if (newPassword !== newPasswordAgain) {
      toast.error("Uudet salasanat eivät täsmää!");
      return;
    }

    const payload = {
      username: user.username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };

    fetch('https://budgetapi.tonitu.dev/api/user/newpassword', options)
      .then(response => {
        if (response.status === 200) {
          toast.success("Salasana vaihdettu onnistuneesti!");
        } else {
          toast.error("Salasanan vaihto epäonnistui!");
        }
      })
      .catch(() => toast.error("Virhe palvelimessa"));
  };

  const handleDelete = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    fetch('https://budgetapi.tonitu.dev/api/user/myinformation', options)
      .then(response => {
        if (response.status === 204) {
          toast.success("Kaikki tietosi ovat poistettu");
          setToken(null);
        } else {
          toast.error("Ongelma tietojen poistossa");
          console.log(response);
        }
      })
      .catch(() => toast.error("Virhe palvelimessa"));
  };

  return (
    <>
      <h2>Omat tiedot</h2>
      <NavLink to="/">Takaisin</NavLink>
      <Toaster />
      <Formik
        initialValues={{
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          oldPassword: '',
          newPassword: '',
          newPasswordAgain: '',
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
              refreshUser();
            })
            .catch(() => {
              toast.error("Tietojen tallentaminen epäonnistui!");
            });
        }}
      >
        {({ values }) => (
          <>
            <Form className="form-group">
              <br />
              <br />
              <label htmlFor="firstname">Käyttäjätunnus</label>
              <h3>{user.username}</h3>
              <br />
              <br />
              <label htmlFor="firstname">Etunimi</label>
              <Field name="firstname" type="text" placeholder="Etunimi" />
              <br />
              <br />
              <label htmlFor="lastname">Sukunimi</label>
              <Field name="lastname" type="text" placeholder="Sukunimi" />
              <br />
              <br />
              <label htmlFor="email">Sähköposti</label>
              <Field name="email" type="email" placeholder="Sähköposti" />
              <br />
              <br />
              <label htmlFor="phone">Puhelinnumero</label>
              <Field name="phone" type="text" placeholder="Puhelin" />
              <button className='general-button' type="submit">Tallenna</button>
            </Form>

            <Form className="form-group">
              <label htmlFor="oldPassword">Vanha salasana</label>
              <Field name="oldPassword" type="password" placeholder="Vanha salasana" />
              <br />
              <br />
              <label htmlFor="newPassword">Uusi salasana</label>
              <Field name="newPassword" type="password" placeholder="Uusi salasana" />
              <br />
              <br />
              <label htmlFor="newPasswordAgain">Uusi salasana uudestaan</label>
              <Field name="newPasswordAgain" type="password" placeholder="Uusi salasana uudestaan" />
              <button 
                className='general-button' 
                type="button" 
                onClick={() => handlePasswordChange({
                  oldPassword: values.oldPassword, 
                  newPassword: values.newPassword, 
                  newPasswordAgain: values.newPasswordAgain
                })}
              >
                Vaihda salasana
              </button>
            </Form>

            <a onClick={() => {
              if (window.confirm("Haluatko varmasti poistaa kaikki tietosi?")) {
                handleDelete();
              }
            }}>Poista kaikki data</a>
          </>
        )}
      </Formik>
    </>
  );
}

export default Account;
