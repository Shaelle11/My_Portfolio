import React from "react";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/AboutPage/About";
import Home from "./Pages/Home/Home";
import Projects from "./Pages/Project";
import BlogList from "./Pages/Blog/BlogList";
import BlogPost from "./Pages/Blog/BlogPost";
import Contacts from "./Pages/Contacts/Contacts";
import PdfView from "./Pages/pdfview/PdfView";
import Admin from "./Pages/Admin/Admin";

export default function Root(){
 return(
    <main>
        <Routes>
   
      <Route path='My_Portfolio/' element={<Home />}/>
     <Route path="My_Portfolio/about" element={<About />}/>
     <Route path="My_Portfolio/projects" element={<Projects/>}/>
     <Route path="My_Portfolio/blog" element={<BlogList/>}/>
     <Route path="My_Portfolio/blog/:id" element={<BlogPost/>}/>
     <Route path="My_Portfolio/contact" element={<Contacts/>}/>
     <Route path="/pdfview" element={<PdfView/>}/>
     <Route path="My_Portfolio/admin" element={<Admin/>}/>
     </Routes>
    </main>
 )

}