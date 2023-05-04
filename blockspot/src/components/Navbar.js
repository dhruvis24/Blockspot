import navStyles from "./modules/Navbar.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar(props) {

    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('LoggedIn'))===true) {
            setShowLogin(false);
            setToken(localStorage.getItem("Token"));
        }
    }, []);

    const logout = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        axios.post('https://api.futurex.club:8080/api/logout', {}, config)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
        // console.log(response);
        localStorage.setItem("LoggedIn", false);
        localStorage.removeItem("Token");
        window.location.reload();
    }

    return (
        <div className={navStyles.majorNav}>
            <div className={navStyles.actualNav}>
                <div className={navStyles.mainLogo} onClick={() => {navigate("/")}}>
                    Block<span style={{color: "#38B6FF"}}>Spot</span>
                </div>
                <div className={navStyles.navButtons}>

                    <div onClick={() => {navigate("/discover?domain=All")}} style={{textDecoration: "none", marginTop: "-3px"}}>
                        <div className={navStyles.button}>
                            <div style={{color: "#38B6FF"}}><big>Discover</big></div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/research")}} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Past </div>
                        </div>
                    </div>

                    {showLogin===true ? 
                    
                    <div onClick={() => {navigate("/login")}} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Login</div>
                        </div>
                    </div> : 
                    
                    <div onClick={logout} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Logout</div>
                        </div>
                    </div>
                    }

                    <div onClick={() => {navigate("/connect")}} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Add Event</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/")}} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Home</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar
