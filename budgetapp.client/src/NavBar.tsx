import { NavLink } from "react-router";
import { FaArrowLeft, FaBars, FaHome, FaUser, FaDoorOpen, FaCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

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
              <FaHome className="icon" />
              {expanded && <span>{user?.firstname}</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics">
              <FaCalendar className="icon" />
              {expanded && <span>Tulot ja menot</span>}
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
