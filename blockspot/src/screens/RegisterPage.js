import addStyles from "./modules/AddProductPage.module.css";
import loginStyles from "./modules/LoginPage.module.css";
import registerStyles from "./modules/RegisterPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../components/ModalPopup";

function RegisterPage() {  
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [userSelecter, setUserSelector] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("LoggedIn"))!==null && JSON.parse(localStorage.getItem('LoggedIn'))==true) {
        navigate("/discover");
    }
}, []);

  const finalSubmit = () => {
    if (name==="" || email==="" || password==="" || userType==="" || (userType==="Other" && userSelecter==="")) {
      setShowModal(true);
      return;
    }
    const data = {
        user_name: name,
        user_email: email,
        user_password: password,
        user_type: userType==="Other" ? userSelecter : userType,
        user_social_handles: {
          linkedin, twitter
        }
    };

    axios.post('https://api.futurex.club:8080/api/users/', data)
    .then(function (response) {
      // console.log(response);
      navigate("/login");
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <div>

      <div>
        <Navbar />
      </div>

      {showModal && <ModalPopup
        title={"Incomplete Information"}
        description={"Please fill all the required information to continue"}
        handleClose={() => setShowModal(false)}
      />}
      
      <div className={loginStyles.parentAdder}>
        <div className={loginStyles.adder}>
          
          <div style={{marginTop: "20px"}}>
            <h1>Register</h1>
          </div>

          <div className={loginStyles.oneFill}>
            <label>Name*</label>
            <input type="name" spellCheck={false} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className={loginStyles.oneFill}>
            <label>Email ID*</label>
            <input type="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className={loginStyles.oneFill}>
            <label>Password*</label>
            <input type="password" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className={loginStyles.oneFill}>
            <label>Type of User*</label>

            <div style={{marginTop: "15px"}} className={loginStyles.outOption}>

              <div className={loginStyles.inOption}>
                <div className={registerStyles.button} style={{backgroundColor: "#E0B0E1"}} onClick={(e) => setUserType("VC")}>
                    <div>VC</div>
                </div>
                <div className={registerStyles.button} style={{backgroundColor: "#EB8A84"}} onClick={(e) => setUserType("Angel Investor")}>
                    <div>Angel Investor</div>
                </div>
              </div>

              <div className={loginStyles.inOption}>
                  <div className={registerStyles.button} style={{backgroundColor: "#ECBE88"}} onClick={(e) => setUserType("Founder")}>
                      <div>Founder</div>
                  </div>
                  <div className={registerStyles.button} style={{backgroundColor: "#B5AEFF"}} onClick={(e) => setUserType("Researcher")}>
                      <div>Researcher</div>
                  </div>
              </div>

              <div className={loginStyles.inOption}>
                  <div className={registerStyles.button} style={{backgroundColor: "#8BECA6"}} onClick={(e) => setUserType("Other")}>
                      <div>Other</div>
                  </div>
              </div>

            </div>

            <div className={loginStyles.oneFill} style={{marginTop: "15px"}}>
              <input type="text" spellCheck={false} value={userType==="Other" ? userSelecter : userType} disabled={userType!="Other"} onChange={(e) => setUserSelector(e.target.value)}/>
            </div>

          </div>

          <div className={loginStyles.oneFill}>
            <label>Link to LinkedIn Profile</label>
            <input type="url" value={linkedin} onChange={(e) => setLinkedIn(e.target.value)} required />
          </div>

          <div className={loginStyles.oneFill}>
            <label>Link to Twitter Profile</label>
            <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} required />
          </div>

          <div className={loginStyles.oneFill} style={{marginLeft: "20px"}}>
            <small>By using this website, you agree to our terms and conditions</small>  
          </div>

          <div className={addStyles.oneFill}>
            <button className={addStyles.submit} onClick={finalSubmit}>Submit</button>
          </div>

          <div className={loginStyles.oneFill}>
            <label style={{fontWeight: 600, fontSize: "1em"}}>Already registered? <span onClick={() => {navigate("/login")}} style={{cursor: "pointer", fontWeight: 700, color: "#38B6FF"}}>Login</span> here</label>
          </div>

        </div>
      </div>

      <div>
        <Footer />
      </div>
      
    </div>
  )
}

export default RegisterPage
