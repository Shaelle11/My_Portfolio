import React from 'react';
import Resume from "../../images/Nanji_Lakan_frontenddev_CV.pdf";
import "./pdfview.css";


export default function PdfView() {
  return (
    <div className='pdfview'>
      {/* <Document file={Resume}>
 <Page>Page {pageNumber} of {numPages}</Page>
 </Document> 
 <a href={Resume} download={Resume}></a> */}
  <div>
  <a className='resume' href={Resume} download={Resume}>
    Download Resume
  </a>
 </div>
 <div>
 {/* <p>Page {pageNumber} of {numPages}</p> */}
      <iframe src={Resume + "#toolbar=0"} width="100%" height="900px" title="PDF Viewer"></iframe>
 </div>

    </div>
  );
};



