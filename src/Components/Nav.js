import React, {useState} from "react";
import './ComponentStyles/Nav.css';
import Sidebar from '../Components/Sidebar'
import MyLogo from '../images/mylogo.svg';
import Lightmode from '../images/SunDim.svg';
import Darkmode from '../images/darkmode.svg';
import { Link } from "react-router-dom";



function Nav(props){
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [isMode, setIsMode] = useState(`${Lightmode}`)
    function changeMode(){
        setIsMode((ModeContainer) => 
        ModeContainer === `${Lightmode}`? `${Darkmode}` : `${Lightmode}`)
    }
    const [isBurger, setIsBurger] = useState(props.Burger)
function Clickme(){
setIsBurger((BurgerContainer) => 
BurgerContainer ===  props.Burger ? props.BurgerClose : props.Burger)
setIsComponentVisible((isVisible) => !isVisible)
;
}

    return(
        <nav id="nav">
            <div className="logo_container"><img className="logo" src={MyLogo} alt="my logo"/></div>
            <ul>
                <li><ActiveLink className='link' to="/" > Home</ActiveLink></li>
                <li><ActiveLink className='link' to="/projects"> Project</ActiveLink></li>
                <li><ActiveLink className='link' to="/blog"> Blog</ActiveLink></li>
                <li><ActiveLink className='link' to="/about" > About</ActiveLink></li>
                <li><ActiveLink className='link' to='/contact' > Contact</ActiveLink></li>

              <div>
<div className="mode">
<img onClick={changeMode} src={isMode} />
</div>
<div>
   
</div>
              </div>
            </ul>
         <div  className="Burger">
         <img onClick={Clickme} id="burger" src={isBurger}/>
        {isComponentVisible && <Sidebar/>}
         </div>
        </nav>
        
    )
}
function ActiveLink({to, children, ...props}){
const path = window.location.pathname

return(
    <li className={path === to ? "active" : ""}>
         <Link to={to} {...props}>{children}</Link></li>
)
}

export default Nav;