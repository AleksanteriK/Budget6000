import './App.css'
import { useAuth } from './AuthContext';
import { NavLink } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, FieldArray } from 'formik';

function App() {
  const { isLoggedIn, user, token } = useAuth();

  return (
    <>
    <div><Toaster/></div>
    <h1>Budget6000</h1>
    <p>Pieniä testailuja</p>

    <div>
      {isLoggedIn && user ? (
        <h2>Hyvää päivää, {user.firstname} {user.lastname}!</h2>
      ) : (
        <p>Et ole kirjautunut sisään</p>
      )}
    </div>

    {!isLoggedIn || !user ? (
      <>
        <NavLink to="login">Kirjaudu</NavLink>
        <br />
        <NavLink to="signup">Luo käyttäjä</NavLink>
      </>
    ) : (
      <>
        <NavLink to="logout">Kirjaudu ulos</NavLink><br /><br />
        <Formik
          initialValues={{
            otherIncome: user.otherIncome,
            otherExpenses: user.otherExpenses,
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
              if(!response.ok) {
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
          {({ values }) => (
            <Form>
              <h2>Muut tulot</h2>
              <FieldArray name="otherIncome">
                {({ push, remove }) => (
                  <div>
                    {values.otherIncome.map((_, index) => (
                      <div key={index}>
                        <Field
                          name={`otherIncome[${index}]`}
                          type="number"
                          placeholder="Tulo"
                        />
                        € / vuosi
                        <button type="button" onClick={() => remove(index)}>
                          Poista
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push(0)}>
                      + Lisää tulo
                    </button>
                  </div>
                )}
              </FieldArray>

              <h2>Muut menot</h2>
              <FieldArray name="otherExpenses">
                {({ push, remove }) => (
                  <div>
                    {values.otherExpenses.map((_, index) => (
                      <div key={index}>
                        <Field
                          name={`otherExpenses[${index}]`}
                          type="number"
                          placeholder="Meno"
                        />
                        € / vuosi
                        <button type="button" onClick={() => remove(index)}>
                          Poista
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push(0)}>
                      + Lisää meno
                    </button>
                  </div>
                )}
              </FieldArray>

              <br />
              <button type="submit">Tallenna tiedot</button>
            </Form>
          )}
        </Formik>
      </>
    )}
  </>
  );
}

export default App;
