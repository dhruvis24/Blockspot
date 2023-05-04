import ResearchBox from "../components/ResearchBox";
import Navbar from "../components/Navbar";
import rStyles from "./modules/ResearchPage.module.css"
import Footer from "../components/Footer"
import { ResearchData } from "../DATA";

function ResearchPage() {
  return (
    <div>

      <div>
        <Navbar />
      </div>

      <div className={rStyles.parentResearch}>

        <div style={{textAlign: false}}>
          <h1>Past Events &ensp;<img src="/research-icon.png" className={rStyles.rIcon}/></h1>
        </div>

        <div className={rStyles.researchBoxes}>
          {ResearchData.map((oneResearch, index) => {
            return (        
            <div>
              <ResearchBox name={oneResearch.name} link={oneResearch.link} imgLink={oneResearch.imgLink} />
            </div>
            )
            
          })}
 
        </div>
      </div>

      <div>
          <Footer />
      </div>

    </div>
  )
}

export default ResearchPage

