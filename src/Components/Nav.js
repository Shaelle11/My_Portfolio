import React, {useState} from "react";
import './ComponentStyles/Nav.css';
import Sidebar from '../Components/Sidebar'
import MyLogo from '../images/mylogo.svg';
import Lightmode from '../images/SunDim.svg';
import Darkmode from '../images/darkmode.svg';



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
                <li>Home</li>
                <li>About</li>
                <li>Project</li>
                <li>Blog</li>
                <li>Contacts</li>

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

export default Nav;