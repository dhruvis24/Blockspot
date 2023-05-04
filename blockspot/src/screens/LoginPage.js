import addStyles from "./modules/AddProductPage.module.css";
import loginStyles from "./modules/LoginPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../components/ModalPopup";
import axios from "axios";

function LoginPage() {
  const navigate=useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("LoggedIn"))!==null && JSON.parse(localStorage.getItem('LoggedIn'))===true) {
        navigate("/discover");
    }
  }, []);

  const finalSubmit = () => {

    if (email==="" || password==="") {
      setShowModal(true);
      return;
    }

    const data = {
      user_email: email,
      user_password: password
    }
    
    axios.post('https://api.futurex.club:8080/api/login', data)
    .then(function (response) {
      console.log(response.data.data);
      localStorage.setItem('Token', response.data.data);
      localStorage.setItem('LoggedIn', true);
      setTimeout(() => {navigate("/discover");}, 400);
    })
    .catch(function (error) {
      console.log(error.response.data.data);
        if (error.response.data.data.status_code === 401) setWrongPassword(true);
        else if (error.response.data.data.status_code === 404) setInvalidUser(true);
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

      {wrongPassword && <ModalPopup
        title={"Wrong Password"}
        description={"Please enter correct password to continue"}
        handleClose={() => setWrongPassword(false)}
      />}

      {invalidUser && <ModalPopup
        title={"Invalid User"}
        description={"Please register first to login"}
        handleClose={() => setInvalidUser(false)}
      />}
      
      <div className={loginStyles.parentAdder}>
        <div className={loginStyles.adder}>
          
          <div style={{marginTop: "20px"}}>
            <h1>Login</h1>
          </div>

          <div className={loginStyles.oneFill}>
            <label>Email ID*</label>
            <input type="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className={loginStyles.oneFill}>
            <label>Password*</label>
            <input type="password" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className={loginStyles.oneFill} style={{marginLeft: "20px"}}>
            <small>By using this website, you agree to our terms and conditions</small>  
          </div>

          <div className={addStyles.oneFill}>
            <button className={addStyles.submit} onClick={finalSubmit}>Submit</button>
          </div>

          <div className={loginStyles.oneFill}>
            <label style={{fontWeight: 600, fontSize: "1em"}}>Not yet registered? <span onClick={() => {navigate("/register")}} style={{cursor: "pointer", fontWeight: 700, color: "#38B6FF"}}>Register</span> here</label>
          </div>

        </div>
      </div>

      <div>
        <Footer />
      </div>
      
    </div>
  )
}

export default LoginPage
