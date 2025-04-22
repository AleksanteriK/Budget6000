import '../App.css'
import { useAuth } from '../AuthContext';
import { NavLink } from "react-router";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, FieldArray } from 'formik';

function Home() {
  const { isLoggedIn, user, token, refreshUser } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (!isLoggedIn || !user) {
    return <p>Et ole kirjautunut sisään</p>;
  }

  const OtherSection = () => {
    return (
    <Formik
      initialValues={{
        otherIncome: user.otherIncome || [],
        otherExpenses: user.otherExpenses || [],
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

          // Refresh user
          refreshUser();
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
    </Formik>)
  }

  const IncomeSection = () => {
    return (
    <Formik
      initialValues={{
        salary: user.salary || 0,
        housingAllowance: user.housingAllowance || 0,
        studyAllowance: user.studyAllowance || 0,
        studyAllowanceMonths: user.studyAllowanceMonths || 0
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

          // Refresh user
          refreshUser();
        })
        .catch(() => {
          toast.error("Tietojen tallentaminen epäonnistui!");
        });
      }}
    >
      {() => (
        <Form>
          <h2>Tulot</h2>
          
          <div>
            <label>Palkka (€ / Vuosi): </label>
            <Field type="number" name="salary" placeholder="Palkka" />
          </div>

          <div>
            <label>Asumistuki (€ / Vuosi): </label>
            <Field type="number" name="housingAllowance" placeholder="Asumistuki" />
          </div>

          <div>
            <label>Opintotuki (€ / Kuukausi): </label>
            <Field type="number" name="studyAllowance" placeholder="Opintotuki" />
          </div>

          <div>
            <label>Opintotukikuukausien lukumäärä: </label>
            <Field type="number" name="studyAllowanceMonths" placeholder="Opintotukikuukaudet" />
          </div>

          <br />
          <button type="submit">Tallenna tiedot</button>
        </Form>
      )}
    </Formik>)
  }

  const ExpenceSection = () => {
    return (
    <Formik
      initialValues={{
        rent: user.rent || 0,
        mortage: user.mortage || 0,
        electricityBill: user.electricityBill || 0,
        food: user.food || 0
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

          // Refresh user
          refreshUser();
        })
        .catch(() => {
          toast.error("Tietojen tallentaminen epäonnistui!");
        });
      }}
    >
      {() => (
        <Form>
        <h2>Menot</h2>
        
        <div>
          <label>Vuokra (€ / Vuosi): </label>
          <Field type="number" name="rent" placeholder="Vuokra" />
        </div>

        <div>
          <label>Lyhennys (€ / Vuosi): </label>
          <Field type="number" name="mortage" placeholder="Lyhennys" />
        </div>

        <div>
          <label>Sähkö (€ / Vuosi): </label>
          <Field type="number" name="electricityBill" placeholder="Sähkö" />
        </div>

        <div>
          <label>Ruoka (€ / Vuosi): </label>
          <Field type="number" name="food" placeholder="Ruoka" />
        </div>

        <br />
        <button type="submit">Tallenna tiedot</button>
      </Form>
      )}
    </Formik>)
  }

  function toggleOtherSection() {
    setActiveSection(prev => prev === "other" ? null : "other");
  }
  
  function toggleIncomeSection() {
    setActiveSection(prev => prev === "income" ? null : "income");
  }
  
  function toggleExpenseSection() {
    setActiveSection(prev => prev === "expenses" ? null : "expenses");
  }

  return (
    <>
    <div><Toaster/></div>
    {!isLoggedIn || !user ? (
      <>
        <NavLink to="login">Kirjaudu</NavLink>
        <br />
        <NavLink to="signup">Luo käyttäjä</NavLink>
      </>
    ) : (
      <>
        <h2>Hei {user.firstname} {user.lastname}!</h2>
        <button className='general-button' onClick={toggleIncomeSection}>Omat tulot</button>
        <button className='general-button' onClick={toggleExpenseSection}>Omat menot</button>
        <button className='general-button' onClick={toggleOtherSection}>Muut</button>
        {activeSection === "income" && <IncomeSection key="income" />}
        {activeSection === "expenses" && <ExpenceSection key="expenses" />}
        {activeSection === "other" && <OtherSection key="other" />}
      </>
    )}
  </>
  );
}

export default Home;
