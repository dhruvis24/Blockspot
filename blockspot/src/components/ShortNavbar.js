import navStyles from "./modules/Navbar.module.css";
import shortNavStyles from "./modules/ShortNavbar.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ShortNavbar(props) {

    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("LoggedIn"))!==null && JSON.parse(localStorage.getItem('LoggedIn'))===true) {
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
        <div className={shortNavStyles.majorNav}>
            <div className={navStyles.actualNav}>
                <div className={navStyles.mainLogo} onClick={() => {navigate("/")}} style={{marginLeft: "-35px"}}>
                    Block<span style={{color: "#38B6FF"}}>Spot</span>
                </div>
                <div className={navStyles.navButtons}>

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

                    <div onClick={() => {navigate("/research")}} style={{textDecoration: "none"}}>
                        <div className={navStyles.button}>
                            <div>Research</div>
                        </div>
                    </div>

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

export default ShortNavbar
