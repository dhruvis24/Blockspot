import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import singleStyles from "./modules/SingleProductPage.module.css";
import productStyle from "../components/modules/ProductInfo.module.css";
// import ProductInfo from "../components/ProductInfo";
import { useState, useEffect, useRef  } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleProductPage() {
  const params = useParams()
  const productID = params.productID;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [liked, setLiked] = useState(false);
  const [data, setData] = useState({});
  const [embedSpotify, setEmbedSpotify] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {

    axios.get(`https://api.futurex.club:8080/api/products/${productID}`)
    .then(function (response) {
      if (response.data.success===true) {
        setData(response.data.data);
      }
    })
    .catch(function (error) {
      console.log(error);
      navigate("/");
    });

    if (JSON.parse(localStorage.getItem('LoggedIn'))===true) {
      setToken(localStorage.getItem("Token"));
      setLogin(true);

      const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`
          }
      }
  
      axios.get("https://api.futurex.club:8080/api/info", config)
      .then(function (response) {
        setUserData(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }, [])

  useEffect(() => {
    if (data?.product_info_media_url!==undefined && data?.product_info_media_url!=="")
    {
    const arr0 = data.product_info_media_url.split("track/");
    const str0 = arr0[1];
    const arr1 = str0.split("?");
    const str1 = arr1[0];
    setEmbedSpotify(str1);
    }
  }, [data])

  const increaseLike = () => {
    if (liked===true) return;

      axios.put(`https://api.futurex.club:8080/api/products/${productID}/reaction`, {product_reaction: "upvote"})
      .then(function (response) {
        if (response.data.success===true) {
          let increaseLikeCountData = data;
          increaseLikeCountData.product_reactions.upvote += 1;
          setData(increaseLikeCountData);
          setLiked(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getIndustryColor = (industry) => {
    if (industry==="Infrastructure") return "#E0B0E1";
    if (industry==="Gaming") return "#EB8A84";
    if (industry==="DAO/Community") return "#3BBEC7";
    if (industry==="ZK/Privacy") return "#B5AEFF";
    if (industry==="Tools/SaaS") return "#c78da6";
    if (industry==="NFTs") return "#f4f2bb";
    if (industry==="Protocols") return "#a5d1a7";
    if (industry==="Consumer") return "#5991D3";
    if (industry==="DeFi") return "#d6aa9f";
    if (industry==="Climate") return "#94c4d6";
    if (industry==="Social") return "#ECBE88";
    if (industry==="AI/Data") return "#a8ad8b";
    else return "white";
  }

  return (
    <div>

      <div>
        <Navbar />
      </div>

      <div className={singleStyles.main}>

        <div className={singleStyles.upper}> 
          <div className={singleStyles.data}>

            <div className={singleStyles.image1}>
              <img src={data.product_image_url} className={singleStyles.firstImage} alt="Logo" />
            </div>

            <div className={singleStyles.sec2}>

              <div>
                <h2>{data.product_name}</h2>
              </div>

              <div className={singleStyles.allLinkLogos}>
                <a href={data.product_social_handles?.Twitter} target="_blank">
                  <img src="/twitter-logo.png" className={singleStyles.linkLogos} alt="Twitter Logo" />
                </a>
                { data.product_social_handles?.LinkedIn !== "" && 
                <a href={data.product_social_handles?.LinkedIn} target="_blank">
                  <img src="/linkedin-logo.png" className={singleStyles.linkLogos} alt="Linkedin Logo"/>
                </a>
                }
                <a href={data.product_url} style={{marginTop: "-7px", fontSize: "1.9em"}} target="_blank">
                  🌐
                </a>
              </div>

              <div className={singleStyles.oneLine}>
                <span>{data.product_info}</span>
              </div>

            </div>

          </div>
          
          {data.product_info_media_url!=="" && <div className={singleStyles.sec3}>
            <div><h2>🎧 Audio Pitch 🚀</h2></div>
            <div >
              <iframe style={{borderRadius: "12px"}} src={`https://open.spotify.com/embed/track/${embedSpotify}?theme=0`} width="400px" height="122" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>}

        </div>  {/* upper ends here */}

        <a href="http://localhost:3000/create" target="_blank"><div><h2>RSVP</h2></div></a>

        <div className={singleStyles.tags}>
          <div style={{display: "flex", gap: "25px"}}>
            {Array.isArray(data.product_categories) && data.product_categories.map((industry, index) => {
              return <div style={{backgroundColor: getIndustryColor(industry)}} className={singleStyles.singleTag} key={index}>{industry}</div>
            })}
            {data.product_raising_funds===true && <div style={{backgroundColor: "white"}} className={singleStyles.singleTag}>Raising</div>}
          </div>

          <div style={{
            display: "flex"
          }}>
           
            <div className={singleStyles.likeSection} onClick={increaseLike}>
              <big style={{fontWeight: "700"}}>{data.product_reactions?.upvote}</big>
              <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
            </div>

            <Link to={login===true ? `https://mail.google.com/mail/u/0/?fs=1&to=${data.product_email}&su=${userData.user_name} <> ${data.product_name} | FutureX Connect&body=Hey ${data.product_name} Team, %0a%0aI discovered your project on FutureX (www.futurex.club) - found it interesting! %0a%0aWould love to chat more!&cc=connect.futurex@gmail.com&tf=cm`: `/login`} target="_blank" style={{marginLeft: "12px"}}>
              <button className={singleStyles.connectButton}>Connect with {data.product_name}</button>
            </Link>
          </div>

        </div>

        <div className={singleStyles.info}>
          {/* <ProductInfo /> */}
          <div>
          
            <div className={productStyle.up}>
                <div className={productStyle.secTag} style={{cursor: "default"}}>Info</div>
            </div>

            <div style={{margin: "16px 10px 35px 0px"}}><hr /></div>

            <div style={{whiteSpace: "pre-line"}}>
                {data.product_description}
            </div>

          </div>

        </div>

      </div>  {/* main ends here */}

      <div>
          <Footer />
      </div>

    </div>

    
  )
}

export default SingleProductPage
