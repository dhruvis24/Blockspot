import rStyles from "./modules/ResearchBox.module.css";
import { Link } from "react-router-dom";

function ResearchBox(props) {
  return (
    <div className={rStyles.mainBox}>
        <div className={rStyles.innerBox}>

            <div>
                <img src={props.imgLink} className={rStyles.firstImage}></img>
            </div>

            <div>
                <h3>{props.name}</h3>
            </div>

            <div>
                <div className={rStyles.oneFill}>
                <Link to={props.link} target="_blank">
                    <button className={rStyles.submit}>Read More</button>
                </Link>
               
                </div>    
            </div>

        </div>
    </div>
  )
}

export default ResearchBox
