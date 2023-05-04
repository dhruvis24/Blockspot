import sliderStyles from "./modules/SliderBox.module.css";
import { Link } from "react-router-dom";

function SliderBox(props) {
  return (
    <div className={sliderStyles.mainBox}>
        <div className={sliderStyles.innerBox}>

            <div className={sliderStyles.upperInnerBox}>
                <div>
                    <img src={props.imgLink} className={sliderStyles.firstImage}></img>
                </div>
                <div>
                    <h2>{props.name}</h2>
                </div>
            </div>

            <div>
                {props.description}
            </div>

            <div>
                <div className={sliderStyles.description}>
                <button className={sliderStyles.thisIndustry}>{props.industry}</button>
                <Link to={props.link} target="_blank">
                    <button className={sliderStyles.submit}>Read More</button>
                </Link>
               
                </div>    
            </div>

        </div>
    </div>
  )
}

export default SliderBox
