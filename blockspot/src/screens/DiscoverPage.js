import ShortNavbar from "../components/ShortNavbar";
import ShortFooter from "../components/ShortFooter";
import dStyles from "./modules/DiscoverPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

function DiscoverPage() {

  const [raising, setRaising] = useState(null);
  const [stage, setStage] = useState(null);
  const [searchFor, setSearchFor] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);

  const navigate=useNavigate();
  let url= new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  if (params.get("domain")===null) navigate("?domain=All");
  const [category, setCategory] = useState(params.get("domain") || "All");
  const [requireCategory, setRequireCategoery] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [login, setLoggedIn] = useState(false);
  const [completed, setCompleted] = useState(false);

  const updateData = () => {
    if (loaded || data.length<15 || login===false || completed) return;
    setLoaded(true);
    axios.get(`https://api.futurex.club:8080/api/products/unverified?limit=15&offset=${page*15}`)
    .then(function (response) {
      if (response.data.data.length===0) setCompleted(true);
      setAllData(prevData => prevData.concat(response.data.data));
      if (params.get("domain")!=="All") {
        setData(prevData => prevData.concat(response.data.data.filter((oneProject) => oneProject.product_categories.indexOf(params.get("domain"))!==-1)));
        setAllCategoryData(prevData => prevData.concat(response.data.data.filter((oneProject) => oneProject.product_categories.indexOf(params.get("domain"))!==-1)));
      }
      else {
        setData(prevData => prevData.concat(response.data.data));
        setAllCategoryData(prevData => prevData.concat(response.data.data));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    setPage(prevPage => prevPage+1);
    setLoaded(false);
  }

  const scrollRef = useBottomScrollListener(updateData, {
    offset: 70
  });

  useEffect(() => {
    navigate(`?domain=${category}`);
    let url= new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    setRequireCategoery(params.get("domain"));
  }, [category]);

  useEffect(() => {
    if (requireCategory!=="All") {
      setData(allData.filter((oneProject) => oneProject.product_categories.indexOf(requireCategory)!==-1));
      setAllCategoryData(allData.filter((oneProject) => oneProject.product_categories.indexOf(requireCategory)!==-1))
    }
    else {
      setData(allData);
      setAllCategoryData(allData);
    }
    setStage(null);
    setRaising(null);

  }, [requireCategory])

  useEffect(() => {
    if (requireCategory!=="All") {
      setData(allData.filter((oneProject) => oneProject.product_categories.indexOf(requireCategory)!==-1));
      setAllCategoryData(allData.filter((oneProject) => oneProject.product_categories.indexOf(requireCategory)!==-1))
    }
  }, [page]);


  useEffect(() => {
    if (stage===null && raising===null) {
      if (requireCategory==="All") {
        setData(allCategoryData);
      }
      else setData(allData.filter((oneProject) => oneProject.product_categories.indexOf(requireCategory)!==-1))
    }
    else if (stage===null && raising!==null) setData(allCategoryData.filter((oneProject) => oneProject.product_raising_funds===raising))
    else if (stage!==null && raising===null) setData(allCategoryData.filter((oneProject) => oneProject.product_status===stage))
    else if (stage!==null && raising!==null) setData(allCategoryData.filter((oneProject) => oneProject.product_status===stage && oneProject.product_raising_funds===raising))
  }, [raising, stage]);

  useEffect(() => {
    let result = [], toSearch = searchFor.trim().toLowerCase();
    for (let i=0; i<allCategoryData.length; ++i) {
      if (allCategoryData[i].product_name.toLowerCase().includes(toSearch)) result.push(allCategoryData[i]);
    }
    setData([...result]);
  }, [searchFor])

  function getStageColor(stage) {
    if (stage==="Pre-funding") return "#E0B0E1";
    if (stage==="Pre-seed") return "#9998EF";
    if (stage==="Seed") return "#86dfe6";
    if (stage==="Series A+") return "#E5A170";
    else return "#fff"
  }

  const getData = () => {
    axios.get("https://api.futurex.club:8080/api/products/unverified?limit=15")
    .then(function (response) {
      setAllData(response.data.data);
      if (params.get("domain")!==null && params.get("domain")!=="All") {
        setData(response.data.data.filter((oneProject) => oneProject.product_categories.indexOf(params.get("domain"))!==-1));
        setAllCategoryData(response.data.data.filter((oneProject) => oneProject.product_categories.indexOf(params.get("domain"))!==-1));
      }
      else {
        setData(response.data.data);
        setAllCategoryData(response.data.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("LoggedIn"))===null || JSON.parse(localStorage.getItem('LoggedIn'))!==true) {
        // navigate("/login");
    }
    else setLoggedIn(true)
    getData();
  }, []);

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
  }

  const increaseLike = (product) => {

    axios.put(`https://api.futurex.club:8080/api/products/${product}/reaction`, {product_reaction: "upvote"})
    .then(function (response) {
      if (response.data.success===true) {
        let updateLikeCountData = data;
        for (let i=0; i<updateLikeCountData.length; ++i) {
          if (updateLikeCountData[i].product_id === product) {
            updateLikeCountData[i].product_reactions.upvote += 1;
            setData([...updateLikeCountData]);
            break;
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (

    <BottomScrollListener onBottom={() => {}}>
  {(scrollRef) => <div ref={scrollRef}>

    <div className={dStyles.main} >

      <div className={dStyles.leftCategories} >

        <div className={dStyles.fullLeft}>

          <div style={{marginBottom: "10px"}}>
            <h2>Domains</h2>
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="All" ? "#E3FFFC" : "", color: category==="All" ? "black" : ""}} onClick={() => setCategory("All")}>
            All
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="Infrastructure" ? "#E3FFFC" : "", color: category==="Infrastructure" ? "black" : ""}} onClick={() => setCategory("Infrastructure")}>
            Comedy Shows 🪛
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="Gaming" ? "#E3FFFC" : "", color: category==="Gaming" ? "black" : ""}} onClick={() => setCategory("Gaming")}>
            Workshops 🎮
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="DAO/Community" ? "#E3FFFC" : "", color: category==="DAO/Community" ? "black" : "", fontSize: "1.1em"}} onClick={() => setCategory("DAO/Community")}>
            Music Shows 🌐
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="ZK/Privacy" ? "#E3FFFC" : "", color: category==="ZK/Privacy" ? "black" : ""}} onClick={() => setCategory("ZK/Privacy")}>
            Spirituality 🔐
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="Tools/SaaS" ? "#E3FFFC" : "", color: category==="Tools/SaaS" ? "black" : ""}} onClick={() => setCategory("Tools/SaaS")}>
            Performances ⚒️
          </div>

          <div className={dStyles.category} style={{backgroundColor: category==="NFTs" ? "#E3FFFC" : "", color: category==="NFTs" ? "black" : ""}} onClick={() => setCategory("NFTs")}>
            Kids 💎
          </div>
          
        </div>

      </div>

      <div>
        <div><ShortNavbar /></div>

        <div className={dStyles.allInfo}>
          <div className={dStyles.tableSection}>

            <div className={dStyles.searchSection}>
              <input type="text" placeholder="Search . . ." value={searchFor} onChange={(e) => setSearchFor(e.target.value)}/>
              <button className={dStyles.button}> Search </button>
            </div>

            
            <div className={dStyles.actualTable} >
              <div className={dStyles.headingRow}>

                <div className={dStyles.tableLeft}>
                  <div>Event</div>
                  <div>Domain</div>
                  <div>Location</div>
                </div>

                <div className={dStyles.tableRight}>
                  <div>Upvotes</div>
                  <div></div>
                </div>

              </div>

              <hr style={{backgroundColor: "white", width: "96%", marginLeft: "-25px"}}/>

              <div className={dStyles.rows}>

                {data.map((oneProject, index) => {
                  return (
                    <div className={dStyles.oneRow} key={index}>
                      <div className={dStyles.rowLeft}>
                        <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >{oneProject.product_name.slice(0, 16)}</div>
                        <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor(oneProject.product_categories[0])}}>{oneProject.product_categories[0] === "Infrastructure" ? "Comedy" : oneProject.product_categories[0]=== "Gaming" ? "Spiritual" : "Kids"}</div>
                      </div>
      
                      <div className={dStyles.rowRight}>
                        <div className={dStyles.stageButton} style={{backgroundColor: getStageColor(oneProject.product_status)}}>{oneProject.product_status === "Seed" ? "Mumbai" : oneProject.product_status === " Series A" ? "Banglore" : "Delhi"}</div>
                        <div className={dStyles.likeSection} onClick={() => increaseLike(oneProject.product_id)}>{oneProject.product_reactions?.upvote} 
                          <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                        </div>
                        <button className={dStyles.moreInfoButton} onClick={() => navigate(`/product/${oneProject.product_id}`)}>More Info</button>
                      </div>
                    </div>
                  )
                })}

                {login===false && 

                <div>

                  <div style={{filter: "blur(5px)", pointerEvents: "none", cursor: "default", userSelect: "none"}}>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}}>Login BlockSpot</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("Gaming")}}>Gaming</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Pre-seed")}}>Pre-seed</div>
                      <div className={dStyles.likeSection}>180 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >BlockSpot GetSetGo</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("NFTs")}}>NFTs</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Seed")}}>Seed</div>
                      <div className={dStyles.likeSection}>150 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  </div>

                  <div style={{position: "absolute", zIndex: "1000", fontWeight: "800", fontSize: "24px", backgroundColor: "#131313", width: "50%", padding: "35px 25px", borderRadius: "25px"}}>
                    <span><span style={{color: "#38B6FF"}}>Login</span> to <span style={{color: "#38B6FF"}}>BlockSpot</span> to see more products</span>
                    <br /><br />
                    {/* <a> tag used purposely to avoid useless scrolled page initaily without any operation */}
                    {/* this can be afforded in terms of latency too since no heavy assets are used to load */}
                    <a href="/login">
                      <button className={dStyles.moreInfoButton} style={{marginLeft: "0px"}}>Login</button>  
                    </a>
                    <a href="/register">
                      <button className={dStyles.moreInfoButton} style={{marginLeft: "15px"}}>Register</button>  
                    </a>
                  </div>

                  <div style={{filter: "blur(5px)", pointerEvents: "none", cursor: "default", userSelect: "none"}}>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >Rock Futurex</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("Infrastructure")}}>Infrastructure</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Series A+")}}>Series A+</div>
                      <div className={dStyles.likeSection}>600 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >Trial</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("DeFi")}}>DeFi</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Seed")}}>Seed</div>
                      <div className={dStyles.likeSection}>100 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >Trial</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("DAO")}}>DAO</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Pre-funding")}}>Pre-funding</div>
                      <div className={dStyles.likeSection}>100 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >Trial</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("Gaming")}}>Gaming</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Other")}}>Pre-seed</div>
                      <div className={dStyles.likeSection}>100 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  <div className={dStyles.oneRow}>
                    <div className={dStyles.rowLeft}>
                      <div className={dStyles.oneField + " " + dStyles.name} style={{marginTop: "8px"}} >Trial</div>
                      <div className={dStyles.oneField + " " + dStyles.industry + " " + dStyles.stageButton} style={{width: "200px", backgroundColor: getIndustryColor("DeFi")}}>DeFi</div>
                    </div>

                    <div className={dStyles.rowRight}>
                      <div className={dStyles.stageButton} style={{backgroundColor: getStageColor("Seed")}}>Seed</div>
                      <div className={dStyles.likeSection}>100 
                        <img src="/fireicon.png" style={{width: "29px", transform: "translateY(7px)", marginLeft: "8px"}}/>
                      </div>
                      <button className={dStyles.moreInfoButton}>More Info</button>
                    </div>
                  </div>

                  </div>

                </div>

                  }

              </div>

            </div>


          </div>
          
        </div>

        <div><ShortFooter /></div>
      </div>
      
    </div>
    </div>}
    </BottomScrollListener>
  )
}


export default DiscoverPage
