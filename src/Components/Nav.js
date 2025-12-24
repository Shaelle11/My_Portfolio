import React, {useState, useEffect} from "react";
import './ComponentStyles/Nav.css';
import Sidebar from '../Components/Sidebar'
import MyLogo from '../images/mylogo.svg';
import Lightmode from '../images/SunDim.svg';
import Darkmode from '../images/darkmode.svg';
import { Link } from "react-router-dom";
import themeService from '../services/ThemeService';


function Nav(props){
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(themeService.isDarkMode());

    // Initialize theme and set up listener
    useEffect(() => {
        // Set initial theme state
        setIsDarkMode(themeService.isDarkMode());

        // Listen for theme changes (useful if theme is changed from other components)
        const observer = themeService.onThemeChange((newTheme) => {
            setIsDarkMode(newTheme === 'dark');
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    function toggleTheme() {
        const newTheme = themeService.toggleTheme();
        setIsDarkMode(newTheme === 'dark');
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
                <li><ActiveLink className='link' to="My_Portfolio/" > Home</ActiveLink></li>
                <li><ActiveLink className='link' to="My_Portfolio/projects"> Project</ActiveLink></li>
                <li><ActiveLink className='link' to="My_Portfolio/blog"> Blog</ActiveLink></li>
                <li><ActiveLink className='link' to="My_Portfolio/about" > About</ActiveLink></li>
                <li><ActiveLink className='link' to='My_Portfolio/contact' > Contact</ActiveLink></li>

              <div>
<div className="mode">
<img 
    onClick={toggleTheme} 
    src={isDarkMode ? Lightmode : Darkmode} 
    alt={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    className="theme-toggle"
/>
</div>
<div>
   
</div>
              </div>
            </ul>
         <div  className="Burger">
         <img onClick={Clickme} id="burger" src={isBurger} alt="Menu toggle"/>
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