import React from "react";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/AboutPage/About";
import Home from "./Pages/Home/Home";
import Projects from "./Pages/Project";
import Blog from "./Pages/Blog";
import Contacts from "./Pages/Contacts/Contacts";
import PdfViewer from "./Pages/pdfview/PdfView";

export default function Root(){
 return(
    <main>
        <Routes>
   
      <Route path='My_Portfolio/' element={<Home />}/>
     <Route path="/about" element={<About />}/>
     <Route path="/projects" element={<Projects/>}/>
     <Route path="/blog" element={<Blog/>}/>
     <Route path="/contact" element={<Contacts/>}/>
     <Route path="/pdfview" element={<PdfViewer/>}/>
     </Routes>
    </main>
 )

}