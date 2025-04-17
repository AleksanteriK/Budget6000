import { NavLink } from "react-router";

export function NavBar() {
  return (
    <nav>
      <NavLink to="/" end>
        Koti
      </NavLink>
      <NavLink to="/account">Account</NavLink>
      <NavLink to="/logout">Kirjaudu ulos</NavLink>
    </nav>
  );
}