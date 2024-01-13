import React from "react";
import Card from "./Card";
import data from "./Projectdata"
import "./ComponentStyles/ProjectSection.css"
import ArrowRight from "../images/ArrowRight.svg"

export default function ProjectSection(){
    const cards = data.map( card => {
        return(
            <Card
            key = {card.id}
            {...card} />
        )
    })
return(
    <section className="ProjectSection">
        <div className="Project">
        <div className="text">
<p>Projects</p>
<h1>Take a look at my highlights Projects</h1>
        </div>
        <svg className="top_star" xmlns="http://www.w3.org/2000/svg" width="63" height="64" viewBox="0 0 63 64" fill="none">
  <g clip-path="url(#clip0_512_1696)">
    <path d="M31.6812 1.15643C30.3133 4.66787 30.7697 7.9234 30.9023 11.6305C31.0746 16.4442 31.2209 21.2275 31.5705 26.0327" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M31.2878 34.6526C30.2862 39.4753 30.7367 44.1761 31.1538 49.0521C31.55 53.6827 32.1059 58.2959 32.6527 62.9104" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M0.864136 35.784C3.93677 34.4168 6.83342 34.3613 10.1404 34.1369C15.1437 33.7973 19.9638 33.151 24.8808 32.1934" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M36.0099 30.7792C44.5059 30.2352 52.8682 28.8246 61.2932 27.6558" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M37.5946 26.6305L40.3177 21.6902" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M25.1265 38.5921L21.8199 41.8597" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40.1036 37.3085L43.3909 39.5258" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M24.0373 23.7324C20.4755 22.6545 17.3061 21.0713 13.9229 19.5507" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_512_1696">
      <rect width="62.4762" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
        <div className="Cards">
{cards}
        </div>
        <button>
            See All
            <img src={ArrowRight}/>
        </button>
        <svg className="bottom_star" xmlns="http://www.w3.org/2000/svg" width="69" height="104" viewBox="0 0 69 104" fill="none">
  <g clip-path="url(#clip0_512_1705)">
    <path d="M44.1525 13.8079C42.2615 20.5846 40.655 27.1911 37.2663 33.3677C35.523 36.5452 33.9818 39.7307 31.5095 42.4269C27.9847 46.2709 22.6702 50.6406 17.1578 50.87C16.3523 50.9036 14.625 50.6088 16.4368 50.6221C18.4026 50.6364 20.5578 50.8426 22.4794 51.2663C25.2675 51.8811 27.2129 54.4037 28.4596 56.8011C30.6889 61.0878 30.993 65.9536 30.9017 70.7217C30.8102 75.4915 29.8905 80.098 29.355 84.821C29.1618 86.5247 28.9448 88.2272 28.6713 89.9201C28.6499 90.0523 28.3239 91.9421 28.2068 91.5004C27.5532 89.0352 28.3445 85.7086 28.7318 83.2758C29.3514 79.3831 30.5621 75.6413 31.9769 71.9696C32.9639 69.4083 33.9839 66.6028 35.6867 64.4C37.7162 61.7744 40.9353 60.6147 44.0226 59.3104C44.0226 59.3104 52.0709 58.2905 51.2265 56.6288C49.2794 52.7976 41.1501 48.0382 40.4775 43.7276C39.7098 38.8068 40.7042 33.3819 41.8216 28.5904C43.0069 23.5085 44.0091 18.3567 45.7095 13.4241" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_512_1705">
      <rect width="45" height="95" fill="white" transform="translate(24.5879) rotate(15)"/>
    </clipPath>
  </defs>
</svg>
    </div>
    </section>
)
}