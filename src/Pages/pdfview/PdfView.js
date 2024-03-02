import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';


export default function PdfView() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <h2>PDF Viewer</h2>
      {/* <Document file='../../images/frontendengineer.pdf' onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
      <p>Page {pageNumber} of {numPages}</p>
      <iframe src='../../images/frontendengineer.pdf' width="100%" height="500px" title="PDF Viewer"></iframe>
      <a href='../../images/frontendengineer.pdf' download>Download Resume</a>
    </div>
  );
};


