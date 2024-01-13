import React from "react";
import "./ComponentStyles/AboutSection.css"
import techgirl from "../images/techgirl.svg"
import CVlogo from "../images/ReadCvLogo.svg"

export default  function AboutSection(){
    return(
     <div className="About__Section">
           <div className="AboutSection" id="AboutSection">
            
            <img className="Aboutimg" src={techgirl} alt="tech girl and her cat"/>
           
            <div className="aboutme">
   <div className="aboutme_text">
   <span>
       About me
   </span>
   <h1>I'm a passionate software developer on the lookout for my first opportunity</h1>
   <p>
   Beyond coding, 
   I'm an amime fan,an african fantasy novel lover,
    and a Writer who spends all my free time writing about lifestyle and all the things which interests me. 
    I'm also a certified green digital skills developer.
    I advocate for a more sustainable use of the web in design, marketing, development and much more.
    Currently chasing a degree in Computer science and currently seeking opportunities to bring my skills and enthusiasm to a tech company.
   </p>
   </div>
   <div role="button" className="btn"> <img src={CVlogo} alt="resume icon"/> My resume</div>
   
            </div>
           
           </div>
     </div>
    )
}