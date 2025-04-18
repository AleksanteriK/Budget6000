import './App.css'
import { NavLink } from "react-router";
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";

function Signup() {
    let navigate = useNavigate();

    const handleSignup = async (
    values: {
        username: any;
        password: any;
        firstname: any;
        lastname: any;
        email: any;
        phone: any;
    }) => {
        const username = values.username;
        const password = values.password;
        const firstname = values.firstname;
        const lastname = values.lastname;
        const email = values.email;
        const phone = values.phone;

        if(!username || !password || !firstname || !lastname || !email)
        {
            toast.error("Anna käyttäjätunnus, salasana, etu- ja sukunimi, sähköposti sekä puhelinnumero!");
            return;
        }

        const payload = {
            Username: username,
            Password: password,
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Phone: phone
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        const response = await fetch('https://budgetapi.tonitu.dev/api/user/new', options);

        if (response.status === 201) {
            toast.success("Käyttäjä luotu onnistuneesti!");
            navigate("/login");
        }

        else {
            toast.error("something went wrong!");
            const data = await response.json();
            const stringedData = JSON.stringify(data);
            toast.error(stringedData);
        }
    }

    return (
        <div>
            <Toaster />
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                }}
                onSubmit={handleSignup}
            >
                <Form className="form-group">
                    <label htmlFor="username">Käyttäjänimi</label>
                    <Field id="username" name="username" placeholder="Käyttäjätunnus" className="form-control" />
                    <br/>
                    <br/>
                    <label htmlFor="password">Salasana</label>
                    <Field id="password" name="password" type="password" placeholder="Salasana" className="form-control" />
                    <br/>
                    <br/>
                    <label htmlFor="firstname">Etunimi</label>
                    <Field id="firstname" name="firstname" placeholder="Etunimi" className="form-control" />
                    <br/>
                    <br/>
                    <label htmlFor="lastname">Sukunimi</label>
                    <Field id="lastname" name="lastname" placeholder="Sukunimi" className="form-control" />
                    <br/>
                    <br/>
                    <label htmlFor="email">Sähköposti</label>
                    <Field id="email" name="email" type="email" placeholder="Sähköposti" className="form-control" />
                    <br/>
                    <br/>
                    <label htmlFor="phone">Puhelinnumero</label>
                    <Field id="phone" name="phone" placeholder="Puhelinnumero" className="form-control" />
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Luo käyttäjä</button>
                </Form>
            </Formik>
            <NavLink to="/">Takaisin</NavLink>
        </div>
    );

}

export default Signup;