import '../App.css';
import { NavLink } from 'react-router';
import { useAuth } from '../AuthContext';

function Privacy() {
  const { isLoggedIn, user, token } = useAuth();

  if (!isLoggedIn || !user || !token) {
    return (
      <div>
        <h3>Tietosuojaseloste</h3>
        <h4>Päivitetty: 23.4.2025</h4>
        <p>Tämä tietosuojaseloste kuvaa, miten keräämme, käytämme ja suojaamme tietojasi käyttäessäsi Budget6000-sovellusta.</p>
        <h5>1. Rekisterinpitäjä</h5>
        <p>Yhteyshenkilö: Aleksanteri Koivisto</p>
        <p>Sähköposti: koivistoaleksanteri1@gmail.com</p>
        <h5>2. Rekisterin nimi</h5>
        <p>Budget6000 käyttäjätietorekisteri</p>
        <h5>3. Käsiteltävät tiedot</h5>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}> Käyttäjätunnus</li>
          <li style={{ marginBottom: '8px' }}> Salasana (salattuna)</li>
          <li style={{ marginBottom: '8px' }}> Etu- ja sukunimi</li>
          <li style={{ marginBottom: '8px' }}> Sähköposti</li>
          <li style={{ marginBottom: '8px' }}> Puhelinnumero</li>
          <li style={{ marginBottom: '8px' }}> Tulot ja menot, jotka käyttäjä kirjaa itse palvelussa</li>
        </ul>
        <h5>4. Tietojen käyttötarkoitus</h5>
        <span>Käyttäjän tietoja käsitellään sovelluksen toiminnallisuuksien toteuttamiseksi, </span>
        <span>kuten omien tulojen ja menojen seuraamiseksi. Tietoja ei käytetä markkinointiin </span>
        <span>eikä luovuteta kolmansille osapuolille pääsääntöisesti. </span>
        <span>Oikeusperuste henkilötietojen käsittelylle on käyttäjän antama suostumus tilin luomisen yhteydessä. </span>
        <h5>5. Tietojen säilyttäminen</h5>
        <span>Säilytämme tietoja niin kauan kuin on tarpeellista sovelluksen tarjoamiseksi käyttäjälle. </span>
        <span>Käyttäjällä on mahdollisuus muokata ja poistaa omia tietoja sekä koko käyttäjätilin halutessaan. </span>
        <span>Tietoja säilytetään kirjoitushetkellä Ruotsissa AWS:än Tukholman datakeskuksessa. </span>
        <span>Tietojen käsittelemiseen käytämme pilvipalveluja, jotka täyttävät GDPR:än vaatimukset. </span>
        <span>Mikäli tietoja siirrettäisi EU/ETA-alueen ulkopuolelle, se tehdään lainsäädännön edellyttämällä tavalla. </span>
        <h5>6. Rekisteröidyn oikeudet</h5>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>Oikeus saada pääsy omiin henkilötietoihinsa</li>
          <li style={{ marginBottom: '8px' }}>Oikeus pyytää virheellisten tietojen korjaamista</li>
          <li style={{ marginBottom: '8px' }}>Oikeus pyytää tietojen poistamista tai käsittelyn rajoittamista</li>
          <li style={{ marginBottom: '8px' }}>Oikeus siirtää tiedot toiseen palveluun</li>
          <li style={{ marginBottom: '8px' }}>Oikeus vastustaa tietojen käsittelyä</li>
        </ul>
        <span>Lisätietoja: </span> 
        <a href="https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX%3A32016R0679#d1e2144-1-1">EU:n yleisen tietosuoja-asetuksen mukaiset oikeudet</a>
        <p>Jos haluat käyttää näitä oikeuksiasi, ota yhteyttä rekisterinpitäjään sähköpostitse: koivistoaleksanteri1@gmail.com</p>
        <h5>7. Tietoturva</h5>
        <span>Sovellus käyttää salattua yhteyttä kommunikoidessaan palvelimen ja tietokannan kanssa. Salasanat ovat tallennettuina salattuna </span>
        <span>tietokantaan. Vain kehittäjillä on pääsy tietoihin ja pystyy hallinnoimaan tietokantaa.</span>
  
        <h5>8. Muutokset</h5>
        <p>Tietosuojaseloste voi päivittyä aika ajoin. Suositellaan, että tarkistat tämän sivun säännöllisesti saadaksesi tietoa mahdollisista muutoksista.</p>
        <h5>9. Yhteystiedot</h5>
        <p>Jos sinulla on kysymyksiä tai huolenaiheita tietosuojaselosteesta tai henkilötietojesi käsittelystä, ota yhteyttä rekisterinpitäjään: koivistoaleksanteri1@gmail.com</p>
        <br/>
        <br/>
        {/* takas signup sivulle jos ei oo kirjautunu*/}
        <NavLink to="/signup">Takaisin</NavLink>
      </div>
    );
  }

  return (
    <div>
      <h3>Tietosuojaseloste</h3>
      <h4>Päivitetty: 23.4.2025</h4>
      <p>Tämä tietosuojaseloste kuvaa, miten keräämme, käytämme ja suojaamme tietojasi käyttäessäsi Budget6000-sovellusta.</p>
      <h5>1. Rekisterinpitäjä</h5>
      <p>Yhteyshenkilö: Aleksanteri Koivisto</p>
      <p>Sähköposti: koivistoaleksanteri1@gmail.com</p>
      <h5>2. Rekisterin nimi</h5>
      <p>Budget6000 käyttäjätietorekisteri</p>
      <h5>3. Käsiteltävät tiedot</h5>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '8px' }}> Käyttäjätunnus</li>
        <li style={{ marginBottom: '8px' }}> Salasana (salattuna)</li>
        <li style={{ marginBottom: '8px' }}> Etu- ja sukunimi</li>
        <li style={{ marginBottom: '8px' }}> Sähköposti</li>
        <li style={{ marginBottom: '8px' }}> Puhelinnumero</li>
        <li style={{ marginBottom: '8px' }}> Tulot ja menot, jotka käyttäjä kirjaa itse palvelussa</li>
      </ul>
      <h5>4. Tietojen käyttötarkoitus</h5>
      <span>Käyttäjän tietoja käsitellään sovelluksen toiminnallisuuksien toteuttamiseksi, </span>
      <span>kuten omien tulojen ja menojen seuraamiseksi. Tietoja ei käytetä markkinointiin </span>
      <span>eikä luovuteta kolmansille osapuolille pääsääntöisesti. </span>
      <span>Oikeusperuste henkilötietojen käsittelylle on käyttäjän antama suostumus tilin luomisen yhteydessä. </span>
      <h5>5. Tietojen säilyttäminen</h5>
      <span>Säilytämme tietoja niin kauan kuin on tarpeellista sovelluksen tarjoamiseksi käyttäjälle. </span>
      <span>Käyttäjällä on mahdollisuus muokata ja poistaa omia tietoja sekä koko käyttäjätilin halutessaan. </span>
      <span>Tietoja säilytetään kirjoitushetkellä Ruotsissa AWS:än Tukholman datakeskuksessa. </span>
      <span>Tietojen käsittelemiseen käytämme pilvipalveluja, jotka täyttävät GDPR:än vaatimukset. </span>
      <span>Mikäli tietoja siirrettäisi EU/ETA-alueen ulkopuolelle, se tehdään lainsäädännön edellyttämällä tavalla. </span>
      <h5>6. Rekisteröidyn oikeudet</h5>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '8px' }}>Oikeus saada pääsy omiin henkilötietoihinsa</li>
        <li style={{ marginBottom: '8px' }}>Oikeus pyytää virheellisten tietojen korjaamista</li>
        <li style={{ marginBottom: '8px' }}>Oikeus pyytää tietojen poistamista tai käsittelyn rajoittamista</li>
        <li style={{ marginBottom: '8px' }}>Oikeus siirtää tiedot toiseen palveluun</li>
        <li style={{ marginBottom: '8px' }}>Oikeus vastustaa tietojen käsittelyä</li>
      </ul>
      <span>Lisätietoja: </span> 
      <a href="https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX%3A32016R0679#d1e2144-1-1">EU:n yleisen tietosuoja-asetuksen mukaiset oikeudet</a>
      <p>Jos haluat käyttää näitä oikeuksiasi, ota yhteyttä rekisterinpitäjään sähköpostitse: koivistoaleksanteri1@gmail.com</p>
      <h5>7. Tietoturva</h5>
      <span>Sovellus käyttää salattua yhteyttä kommunikoidessaan palvelimen ja tietokannan kanssa. Salasanat ovat tallennettuina salattuna </span>
      <span>tietokantaan. Vain kehittäjillä on pääsy tietoihin ja pystyy hallinnoimaan tietokantaa.</span>

      <h5>8. Muutokset</h5>
      <p>Tietosuojaseloste voi päivittyä aika ajoin. Suositellaan, että tarkistat tämän sivun säännöllisesti saadaksesi tietoa mahdollisista muutoksista.</p>
      <h5>9. Yhteystiedot</h5>
      <p>Jos sinulla on kysymyksiä tai huolenaiheita tietosuojaselosteesta tai henkilötietojesi käsittelystä, ota yhteyttä rekisterinpitäjään: koivistoaleksanteri1@gmail.com</p>
      <br/>
      <br/>
      {/* takas account sivulle jos on kirjautunu*/}
      <NavLink to="/account">Takaisin</NavLink>
    </div>
  );
}

export default Privacy;