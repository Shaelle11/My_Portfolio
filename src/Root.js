import React from "react";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/AboutPage/About";
import Home from "./Pages/Home/Home";
import Projects from "./Pages/Project";
import Blog from "./Pages/Blog";
import Contacts from "./Pages/Contacts/Contacts";
import PdfView from "./Pages/pdfview/PdfView";

export default function Root(){
 return(
    <main>
        <Routes>
   
      <Route path='My_Portfolio/' element={<Home />}/>
     <Route path="My_Portfolio/about" element={<About />}/>
     <Route path="My_Portfolio/projects" element={<Projects/>}/>
     <Route path="My_Portfolio/blog" element={<Blog/>}/>
     <Route path="My_Portfolio/contact" element={<Contacts/>}/>
     <Route path="My_Portfolio/pdfview" element={<PdfView/>}/>
     </Routes>
    </main>
 )

}