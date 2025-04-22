import '../App.css'
import { useAuth } from '../AuthContext';
import { NavLink } from "react-router";
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Analytics() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user) {
    return <p>Et ole kirjautunut sisään</p>;
  }

    const ShowPerYear = () => {
        const [year] = useState(new Date().getFullYear());

        //lasketaan kaikki tulot vuodelta
        let totalOtherIncome = 0;

        if (user.otherIncome && Array.isArray(user.otherIncome)) {
            for (let i = 0; i < user.otherIncome.length; i++) {
            totalOtherIncome += user.otherIncome[i];
            }
        }

        let totalOtherExpenses = 0;

        if (user.otherExpenses && Array.isArray(user.otherExpenses)) {
            for (let j = 0; j < user.otherExpenses.length; j++) {
            totalOtherExpenses += user.otherExpenses[j];
            }
        }

        const totalIncome = (user.salary ?? 0) + 
                            (user.studyAllowance ?? 0) * (user.studyAllowanceMonths ?? 0) + 
                            (totalOtherIncome ?? 0);

        const totalExpenses = (user.rent ?? 0) + 
                              (user.food ?? 0) + 
                              (user.electricityBill ?? 0) + 
                              (user.mortage ?? 0) + 
                              (totalOtherExpenses ?? 0);

        let incomeExpenseDifference = totalIncome - totalExpenses;

        // Lasketaan kela tuloraja (opintotuki kk * 1118 + tulottomat kk * 3355x3)
        let allowanceMonths = user.studyAllowanceMonths ?? 0;
        let incomeLimit = (1118 * allowanceMonths) + (3355 * (12 - allowanceMonths));
        
        return (
            <>
                <Card className='analytics-card'>
                    <Card.Body>
                    <Card.Title>Vuosi {year}</Card.Title>
                    <Row>
                        <br></br>
                        <Col>
                        Tienaat yhteensä <span className='analytics-card-income'>{totalIncome} € </span>
                        </Col>
                        <br></br>
                        <Col>
                        Menoja yhteensä <span className='analytics-card-expenses'>{totalExpenses} € </span>
                        </Col>
                        <br></br>
                        <Col>
                        {incomeExpenseDifference < 0 ? (
                        <>
                        <span className="analytics-card-expenses">Menosi ovat suuremmat kuin tulot!</span>
                        </>
                        ) : (
                        <>
                            <span className="analytics-card-income">Tulosi ovat suuremmat kuin menot!</span>
                        </>
                        )}
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
                <br></br>
                <Card className='analytics-card'>
                    <Card.Body>
                    <Card.Title>Kela</Card.Title>
                    <Row>
                        <br></br>
                        <Col>
                        Tuloraja vuodelle {year}: <span className='analytics-card-income'>{incomeLimit} € </span>
                        </Col>
                        <br></br>
                        <Col>
                        {totalIncome > incomeLimit ? (
                        <>
                        <span className="analytics-card-expenses">Ylität tulorajan! Tienaat {(incomeLimit - totalIncome) * -1} € liikaa!</span>
                        </>
                        ) : (
                        <>
                            <span className="analytics-card-income">Et ylitä tulorajaa! Voit tienata vielä {incomeLimit - totalIncome} €!</span>
                        </>
                        )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </>
        );
    }

    const ShowPerMonth = () => {
        return (
            <Card>
                <Card.Body>
                <Card.Title>{}</Card.Title>
                <Row>
                    <Col>Tulot  € </Col>
                    <Col>Menot  € </Col>
                </Row>
                </Card.Body>
            </Card>
        );
    }

    const ShowPerWeek = () => {
        return (
            <Card>
                <Card.Body>
                <Card.Title>{}</Card.Title>
                <Row>
                    <Col>Tulot  € </Col>
                    <Col>Menot  € </Col>
                </Row>
                </Card.Body>
            </Card>
        );
    }

    function togglePerYear() {
        setActiveSection(activeSection === "perYear" ? null : "perYear");
    }

    function togglePerMonth() {
        setActiveSection(activeSection === "perMonth" ? null : "perMonth");
    }

    function togglePerWeek() {
        setActiveSection(activeSection === "perWeek" ? null : "perWeek");
    }

  return (
    <>
    <h2>Tarkastele tuloja ja menoja vuosi, kuukausi ja viikkotasolla</h2>
    <NavLink to="/">Takaisin</NavLink>
    <br></br> <br></br>
    <button className='general-button' onClick={togglePerYear}>Vuosi</button>
    <button className='general-button' onClick={togglePerMonth}>Kuukausi</button>
    <button className='general-button' onClick={togglePerWeek}>Viikko</button>
    <br></br> <br></br>
    {activeSection === "perYear" && <ShowPerYear key="perYear" />}
    {activeSection === "perMonth" && <ShowPerMonth key="perMonth" />}
    {activeSection === "perWeek" && <ShowPerWeek key="perWeek" />}
    </>
  );
}

export default Analytics;

