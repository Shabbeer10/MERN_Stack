import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <div>
            <nav>
                <NavLink to='/'>
                    <img src="https://placehold.co/100" alt="MongoDB logo" />
                </NavLink>
                <NavLink className="text-emerald-500 bg-neutral-900" to='/create'>
                    Create Employee
                </NavLink>
            </nav>
        </div>
    )
}