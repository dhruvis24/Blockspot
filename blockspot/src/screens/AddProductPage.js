import addStyles from "./modules/AddProductPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginStyles from "./modules/LoginPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../components/ModalPopup";

function AddProductPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [oneLine, setOneLine] = useState("");
    const [website, setWebsite] = useState("");
    const [industry, setIndustry] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [description, setDescription] = useState("");
    const [raising, setRaising] = useState("");
    const [logoLink, setLogoLink] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [status, setStatus] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if (JSON.parse(localStorage.getItem('LoggedIn'))===true) {
          setToken(localStorage.getItem("Token"));
      }
      else navigate("/login");
    }, []);

    const finalSubmit = () => {

      if (name==="" || oneLine==="" || website=== "" || industry==="" || twitter==="" || description==="" || raising==="" || logoLink==="" || status==="") {
        setShowModal(true);
        return;
      }

      const data = {
        product_name: name,
        product_email: email,
        product_info: oneLine,
        product_url: website,
        product_status: status,
        product_categories: [industry],
        product_info_media_url: spotifyLink,
        product_social_handles: {
          twitter: twitter,
          linkedin: linkedIn,
        },
        product_description: description,
        product_raising_funds: raising,
        product_image_url: logoLink,
        product_founders: [],
        product_reactions: {
          upvote: 0
        }
      };

      console.log(data);

      const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
      }

      axios.post("https://api.futurex.club:8080/api/products/", data, config)
      .then(function (response) {
        console.log(response.data.data.product_id);

        axios.put(`https://api.futurex.club:8080/api/products/${response.data.data.product_id}`, {product_reactions: {upvote: 1}}, config)
        .then(function (response) {
          if (response.data.success===true) {
            navigate("/discover?domain=All");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
        
        <div className={addStyles.parentAdder}>
          <div className={addStyles.adder}>
            
            <div style={{marginTop: "25px"}}>
              <h1>Add a Event to Future<span style={{color: "#38B6FF"}}>X</span></h1>
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Name*</label>
              <input type="text" spellCheck={false} value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Website*</label>
              <input type="text" spellCheck={false} value={website} onChange={(e) => setWebsite(e.target.value)}/>
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Email ID*</label>
              <input type="text" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Industry*</label>

                <div style={{marginTop: "15px", marginLeft: "-15px"}} className={loginStyles.outOption}>

                  <div className={loginStyles.inOption}>
                    <div className={addStyles.button} style={{backgroundColor: "#E0B0E1"}} onClick={() => setIndustry("Infrastructure")}>
                        <div>Comedy Show {industry.indexOf("Infrastructure")!==-1 ? "✔️" : ""}</div>
                    </div>
                    <div className={addStyles.button} style={{backgroundColor: "#EB8A84"}} onClick={(e) => setIndustry("Gaming")}>
                        <div>Performance {industry.indexOf("Gaming")!==-1 ? "✔️" : ""}</div>
                    </div>
                  </div>

                  <div className={loginStyles.inOption}>
                      <div className={addStyles.button} style={{backgroundColor: "#3BBEC7"}} onClick={(e) => setIndustry("Music")}>
                          <div>Concerts {industry.indexOf("DAO/Community")!=-1 ? "✔️" : ""}</div>
                      </div>
                      <div className={addStyles.button} style={{backgroundColor: "#B5AEFF"}} onClick={(e) => setIndustry("ZK/Privacy")}>
                          <div>Kids {industry.indexOf("ZK/Privacy")!=-1 ? "✔️" : ""}</div>
                      </div>
                  </div>

                  <div className={loginStyles.inOption}>
                      <div className={addStyles.button} style={{backgroundColor: "#c78da6"}} onClick={(e) => setIndustry("Tools/SaaS")}>
                          <div>FLEA Markets {industry.indexOf("Tools/SaaS")!==-1 ? "✔️" : ""}</div>
                      </div>
                      <div className={addStyles.button} style={{backgroundColor: "#f4f2bb"}} onClick={(e) => setIndustry("NFTs")}>
                          <div>NFTs {industry.indexOf("NFTs")!==-1 ? "✔️" : ""}</div>
                      </div>
                  </div>

                </div>
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Location*</label>
              <input type="text" value={oneLine} onChange={(e) => setOneLine(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <label>Are you raising?*</label>
              <div className={addStyles.selectButtons}>
                <button onClick={() => setRaising(true)} className={addStyles.selectFields} style={
                  raising===true ? {backgroundColor:  "#CECECE", color: "black"} : {}}>Yes</button>
                  
                <button onClick={() => setRaising(false)} className={addStyles.selectFields} style={
                  raising===false ? {backgroundColor:  "#CECECE", color: "black"} : {}}>No</button>
                  
              </div>
            </div>

            <div className={addStyles.oneFill}>
              <label>Event Description*</label>
              <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <label>Link to Video Teaser</label>
              <input type="url" value={spotifyLink} onChange={(e) => setSpotifyLink(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <label>Link to Twitter Handle*</label>
              <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <label>Link to LinkedIn Profile*</label>
              <input type="url" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}/>
            </div>

            <div className={addStyles.oneFill}>
              <label>Link to Event Logo*</label>
              <input type="url" placeholder="Twitter Profile Photo Link (Copy Image Address)" value={logoLink} onChange={(e) => setLogoLink(e.target.value)} />
            </div>

            <div className={addStyles.oneFill}>
              <button className={addStyles.submit} onClick={() => navigate("iblfuer329eejhhbefe7877")}>Submit</button>
            </div>

          </div>
        </div>

        <div>
          <Footer />
        </div>
        
      </div>
    )
}

export default AddProductPage;
