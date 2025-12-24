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
    <div className={`card ${props.featured ? 'featured' : ''}`}>
      {props.featured && <div className="featured__badge">Featured</div>}
      <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="image_background">
        <img src={props.img} alt={props.name} />
        <div className={`Visit ${isHovered ? 'Show' : ''}`}>
          <a className="source" target="_blank" rel="noopener noreferrer" href={props.SourceCode}>
            Source Code
          </a>
          <a className="site" target="_blank" rel="noopener noreferrer" href={props.Site}>
            Live Demo
          </a>
        </div>
      </div>
      <div className="time_tag">
        <div className="date_time">
          <h1>{props.DateTime}</h1>
        </div>
        <div className="tags">
          {props.tag.react && <div className="tech__tag react">React</div>}
          {props.tag.javascript && <div className="tech__tag js">JS</div>}
          {props.tag.sass && <div className="tech__tag sass">SCSS</div>}
          {props.tag.css && <div className="tech__tag css">CSS3</div>}
        </div>
      </div>
      <div className="name_desc">
        <h1>{props.name}</h1>
        <p>{props.Description}</p>
        {props.technologies && (
          <div className="technologies">
            {props.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="technology__badge">{tech}</span>
            ))}
            {props.technologies.length > 3 && (
              <span className="technology__badge more">+{props.technologies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
