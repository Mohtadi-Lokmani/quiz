import { Link } from "react-router-dom";
import "./Work.css";
import work from "../../image/work1.png";


export default function Hero() {
  return (
    <>
    <div className="work-container">
        <h1 className="work-title">
            How It Work
        </h1>
        <div className="work-image"><img src={work} alt="" /></div>
        
        <div className="work-etape">
            
        </div>
    </div>
    </>
  )
}