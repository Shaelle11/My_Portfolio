import React from "react";
import ArrowUp from "../images/ArrowUp.svg"
import "./ComponentStyles/footer.css"

export default function Footer(){
    return(
        <div className="footer">
            <div className="footer_name">
                Nanji Lakan, 2026. 
            </div>
            <div className="footer_links">
                <a href="https://github.com/Shaelle11" target="blank" rel="noopener noreferrer">
                 GitHub   
                </a>
                <a target="blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nanji-lakan-theshaelle/">
               LinkedIn  
                </a>
                <a href="https://www.instagram.com/the_shaelle/" >
               instagram  
                </a>
                <a href="#nav"><img src={ArrowUp} alt="Back to top"/></a>
            </div>
        </div>
    )
}