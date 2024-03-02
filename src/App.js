// App.js
import './App.css';
import { useRef, useState } from 'react';
import Root from './Root';
import Burger from "./images/List.svg"
import BurgerClose from './images/X.svg'
import Footer from "./Components/Footer";
import Nav from './Components/Nav';

function App() {
  const defaultCursor = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  

  const changePosition = (e) => {
    setCursorPosition({ top: e.clientY, left: e.clientX });
  };


  return (
    <div onMouseMove={changePosition} className="App">
     
      <Nav tabindex="0" aria-label="Navbar" aria-labelledby="home" aria-controls="nav"
        Burger = {Burger}
        BurgerClose = {BurgerClose} 
        />
         <Root/>
        <Footer/>
       
      <div
        ref={defaultCursor}
        className='default'
        style={{ top: `${cursorPosition.top}px`, left: `${cursorPosition.left}px` }}
      >
         <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="#7DFFAF"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
       >
         <path d="M22 12l-20 12-1-24z" />
       </svg>
      </div>
    </div>
  );
}

export default App;
