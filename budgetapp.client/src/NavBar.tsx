import { NavLink } from "react-router";
import { FaArrowLeft, FaBars, FaHome, FaPlus, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {

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
                            {expanded && <span>Budget6000</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add">
                            <FaPlus className="icon" />
                            {expanded && <span>Add</span>}
                        </NavLink>
                        {expanded && <span className="note">income + expense</span>}
                    </li>
                    <li>
                        <NavLink to="/account">
                            <FaUser className="icon" />
                            {expanded && <span>Account</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}
