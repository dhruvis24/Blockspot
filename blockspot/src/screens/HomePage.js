import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import homeStyle from "./modules/HomePage.module.css";
import { Link } from "react-router-dom";
import ImageSlider from '../components/ImageSlider';
import { SliderData } from "../DATA";

function HomePage() {

  return (
    <div>

    <div>
      <Navbar />
    </div>

    <div className={homeStyle.upperHalf}>
      <div className={homeStyle.upperLeftHalf}>
        <span className={homeStyle.introText}>Explore, Discover & Participate in Grand Events 🚀</span>
      </div>
      <div className={homeStyle.upperRightHalf}>

        <ImageSlider slides={SliderData}/>

      </div>
    </div>

    <div className={homeStyle.main}>

      <div className={homeStyle.mainHead}>
        <div className={homeStyle.leftcat}><div className={homeStyle.leftcatin}>
          Event Types <img src="/fireicon.png" style={{width: "35px", transform: "translateY(5px)", marginLeft: "5px"}}/>
        </div></div>
        <div className={homeStyle.rightcat}>
          <Link to="/discover" style={{color: "#CECECE"}}>
            <div className={homeStyle.exploreAll}>
              <big>Explore all</big> <div style={{
            width: "0",
            height: "0", 
            marginTop: "9px",
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent", 
            borderLeft: "21px solid #38B6FF"
          }} ></div>
            </div>
          </Link>
          <div className={homeStyle.categories}>

          <Link to="/discover?domain=Infrastructure" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, rgba(222,205,14,1) 5%, rgba(241,209,100,1) 35%, rgba(215,118,27,1) 67%)"
              }}>Comedy Shows</span> 🪛</div> 
            </Link>

            <Link to="/discover?domain=Gaming" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, #95E0FF 0%, #E72CF9 100%)"
              }}>Workshops</span> 🎮</div>
            </Link>

            <Link to="/discover?domain=DAO/Community" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, #D4FC79 0%, #96E6A1 100%)"
              }}>Music Shows </span> 🌐</div>
            </Link>

            <Link to="/discover?domain=ZK/Privacy" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, #F2994A 0%, #F2C94C 100%)"
              }}>Spirituality</span> 🔐</div>
            </Link>

            <Link to="/discover?domain=DeFi" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, #FFEFBA 0%, #FFFFFF 100%)"
              }}>Performances</span> 💰</div>
            </Link>

            <Link to="/discover?domain=NFTs" className={homeStyle.category}>
              <div className={homeStyle.textSpace}><span style={{
                backgroundImage: "linear-gradient(90deg, #D4FC79 0%, #96E6A1 100%)"
              }}>Kids</span> 💎</div>
            </Link>
  
          </div>
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
    
  </div>
  )
}

export default HomePage
