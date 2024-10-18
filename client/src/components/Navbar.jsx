import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <div>
            <nav>
                <navLink to='/'>
                    <img className="h-10-inline" src="https://placeholder.com" alt="MongoDB logo" />
                </navLink>
                <navLink>
                    Create Employee
                </navLink>
            </nav>
        </div>
    )
}