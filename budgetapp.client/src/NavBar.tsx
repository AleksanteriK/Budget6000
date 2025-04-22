import { NavLink } from "react-router";
import { FaArrowLeft, FaBars, FaUser, FaDoorOpen, FaChartPie, FaMoneyBillWave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(() => {
    const savedState = localStorage.getItem("sidebarExpanded");
    return savedState ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);
  
  return (
    <>
      <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
        <ul>
          <li>
            <a className={`toggle-btn ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
              <>
                <FaBars />
                {expanded && <FaArrowLeft className="menu-icon" />}
              </>
            </a>
          </li>
          <li>
            <NavLink to="/">
              <FaMoneyBillWave className="icon" />
              {expanded && <span>Tulot ja Menot</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics">
              <FaChartPie className="icon" />
              {expanded && <span>Tilastot</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/account">
              <FaUser className="icon" />
              {expanded && <span>Omat tiedot</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              <FaDoorOpen className="icon" />
              {expanded && <span>Kirjaudu ulos</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
