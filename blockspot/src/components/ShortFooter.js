import footStyles from "./modules/Footer.module.css";
import shortFootStyles from "./modules/ShortFooter.module.css";
import { useNavigate } from "react-router-dom";

function ShortFooter() {
    const navigate = useNavigate();

    return (
        <div className={shortFootStyles.mainFooter}>
            <div className={footStyles.actualFooter}>

                <div className={footStyles.lineOne}>
                    <div onClick={() => {navigate("/")}}>
                        <div className={footStyles.button} style={{marginLeft: "-40px", marginRight: "-22px"}}>
                            <div>Home</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/discover")}} >
                        <div className={footStyles.button}>
                            <div>Discover</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/connect")}} >
                        <div className={footStyles.button}>
                            <div>Add Event</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/research")}} >
                        <div className={footStyles.button}>
                            <div>Research</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/t&c")}} >
                        <div className={footStyles.button}>
                            <div>Terms & Conditions</div>
                        </div>
                    </div>

                    <div onClick={() => {navigate("/about")}} >
                        <div className={footStyles.button}>
                            <div>About Us</div>
                        </div>
                    </div>
                
                </div>


                <div className={footStyles.lineTwo}>

                    <div className={footStyles.mainLogo} onClick={() => {navigate("/")}}>
                        Block<span style={{color: "#38B6FF"}}>Spot</span>
                    </div>

                    <div >
                        <div className={footStyles.bottomRight}>
                            <a href="mailto:connect.futurex@gmail.com" style={{color: "#CECECE"}}>✉️ connect.futurex@gmail.com</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
  )
}

export default ShortFooter
