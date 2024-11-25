import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <div>
            <nav style={{ backgroundColor: "#FF6F00", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <NavLink style={{display: "flex"}} to='/'>
                    <img src="/client/public/favicon.svg" alt="MongoDB logo" style={{ width: "50px", height: "auto" }} />
                    <p style={{ fontSize:"2rem"}}>ReSource</p>
                </NavLink>
                <NavLink className="text-emerald-500 bg-neutral-900" to='/create' 
                    style={{
                        color: "#FFFFFF", 
                        backgroundColor: "green", 
                        padding: "0.5rem 1rem", 
                        borderRadius: "5px", 
                        textDecoration: "none", 
                        fontSize: "1rem"
                    }}>
                    Create Employee
                </NavLink>
            </nav>
        </div>
    )
}