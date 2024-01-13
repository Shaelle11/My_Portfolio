import React, { useState } from "react";
import "./ComponentStyles/card.css";

export default function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseOver() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div className="card">
      <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="image_background">
        <img src={props.img} />
        <div className={`Visit ${isHovered ? 'Show' : ''}`}>
          <a className="source" href={props.SourceCode}>
            See SourceCode
          </a>
          <a className="site" href={props.Site}>
            Visit Site
          </a>
        </div>
      </div>
      <div className="time_tag">
        <div className="date_time">
          <h1>{props.DateTime}</h1>
        </div>
        <div className="tags">
          {props.tag.javascript && <img src="JavaScript.svg" alt="JavaScript" />}
          {props.tag.sass && <img src="sass-1.svg" alt="Sass" />}
          {props.tag.css && <img src="css3-seeklogo.svg" alt="CSS" />}
        </div>
      </div>
      <div className="name_desc">
        <h1>{props.name}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
