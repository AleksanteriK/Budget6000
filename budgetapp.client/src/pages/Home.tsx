import toast from 'react-hot-toast';
import { useAuth } from '../AuthContext';
import { Formik, Form, Field, FieldArray } from 'formik';
import LoadingSpinner from "./LoadingSpinner";
import { updateUserData } from '../apiService';

export default function Home() {
    const { user, token } = useAuth();

    if (!user) {
        return <LoadingSpinner message="Tapahtui virhe." countdown={5} />;
    }

    return (
        <>
            <h1>Budget6000</h1>
            <p>Pieniä testailuja</p>
            <h2>Hyvää päivää, {user.firstname} {user.lastname}!</h2>

            <Formik
                initialValues={{
                    otherIncome: user.otherIncome || [],
                    otherExpenses: user.otherExpenses || [],
                }}

                onSubmit={(values) => {
                    updateUserData(token, values)
                        .then(() => toast.success("Tietojen tallennus onnistui!"))
                        .catch(() => toast.error("Tallennus epäonnistui!"));
                }}

            >
                {({ values }) => (
                    <Form>
                        {/* Income Fields */}
                        <h2>Muut tulot</h2>
                        <FieldArray name="otherIncome">
                            {({ push, remove }) => (
                                <>
                                    {values.otherIncome.map((_, i) => (
                                        <div key={i}>
                                            <Field name={`otherIncome[${i}]`} type="number" />
                                            € / vuosi
                                            <button type="button" onClick={() => remove(i)}>Poista</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push(0)}>+ Lisää tulo</button>
                                </>
                            )}
                        </FieldArray>

                        {/* Expense Fields */}
                        <h2>Muut menot</h2>
                        <FieldArray name="otherExpenses">
                            {({ push, remove }) => (
                                <>
                                    {values.otherExpenses.map((_, i) => (
                                        <div key={i}>
                                            <Field name={`otherExpenses[${i}]`} type="number" />
                                            € / vuosi
                                            <button type="button" onClick={() => remove(i)}>Poista</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push(0)}>+ Lisää meno</button>
                                </>
                            )}
                        </FieldArray>

                        <br />
                        <button type="submit">Tallenna tiedot</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
