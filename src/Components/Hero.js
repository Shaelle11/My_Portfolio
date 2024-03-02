import React from "react";
import "./ComponentStyles/Hero.css";
import keyboard from "../images/system.svg";
import CVlogo from "../images/ReadCvLogo.svg"
import arrowRight from "../images/ArrowRight.svg";
import { Link } from "react-router-dom"; 

export default function Hero(){
 return(
   <div className="hero__section">
     <section className="hero">
        <div className="hero_text">
<div>
<span className="headtext"><p className="small">Hi I'm </p> <span className="containerparent">
<span className="parent"> <span className="kid"> "The Shaelle" </span>
<span className="kid long"> "Nanji Lakan"</span></span>
</span>
</span>

</div>
<h1 >Computer Science Undergraduate and Frontend Engineer</h1>
<p>I specialize in building innovative web applications using technologies such as HTML, CSS, JS, React, Vue and Node.js.</p>
<div className="btn_container">
<a href="/pdfview">  <div className="resume" role="button">
   
        <img src={CVlogo} alt="resume icon"/><p>My resume</p>
       
         </div> </a>
    <div className="touch" role="button"><p>Get in touch</p>
    <img className="arrowRight" src={arrowRight} alt="right arrow"/></div>
    
</div>
        </div>
        <div className="Hero_img">
<img className="heroimg" src={keyboard} alt="a system"/>
        </div>
    </section>
    <div className="next"> 
        <a href="#AboutSection">
        <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
<g clip-path="url(#clip0_512_1746)">
<path d="M17.1153 98.7133C17.8232 96.2842 19.3131 94.1566 21.3536 92.6607C22.4479 91.8362 23.6594 91.1803 24.948 90.7147C26.3441 90.1865 27.8006 89.8343 29.2838 89.6662C30.147 89.554 29.6838 89.0907 28.601 88.6907C24.7578 87.3739 20.8171 85.979 16.8374 84.7305C17.0112 84.1444 17.2163 83.5681 17.4518 83.004L18.1395 81.2727L18.954 79.5998C19.2272 79.0438 19.4759 78.4731 19.7978 77.9464C20.4269 76.8783 20.9927 75.7761 21.7194 74.7665L22.7386 73.2205L23.8605 71.7378C26.8657 67.806 30.3803 64.2913 34.3121 61.2861C38.2676 58.311 42.5222 55.7563 47.0072 53.6632C51.4866 51.5788 56.0896 49.7708 60.7901 48.2495C65.9258 46.5572 71.1394 45.0989 76.3335 43.6016C78.9282 42.8505 81.5179 42.1043 84.0979 41.3093C86.6779 40.5143 89.2482 39.6999 91.7258 38.6757C94.2103 37.6913 96.5511 36.3774 98.6854 34.7691C100.818 33.2011 102.516 31.1167 103.621 28.7118C104.139 27.5082 104.476 26.2344 104.621 24.932C104.784 23.6382 104.746 22.327 104.509 21.0449C104.036 18.5234 102.68 16.1044 100.461 14.8997C99.9779 14.6022 99.1926 16.1678 99.5438 16.4214C99.7443 16.5412 99.9352 16.6765 100.115 16.8261C100.275 16.9871 100.436 17.1481 100.627 17.2895C100.817 17.431 100.914 17.6455 101.07 17.8211C101.215 18.0064 101.345 18.202 101.461 18.4063C101.959 19.2574 102.3 20.1906 102.47 21.1619C102.818 23.3351 102.542 25.5623 101.675 27.5852C101.466 28.0799 101.221 28.559 100.944 29.019L100.5 29.6676C100.353 29.8919 100.149 30.1065 99.973 30.3309C99.2257 31.2082 98.3942 32.0102 97.4906 32.7256C95.5271 34.1939 93.3789 35.3976 91.1014 36.3055C88.6833 37.2832 86.2172 38.1378 83.7126 38.866C73.4999 42.0264 62.9165 44.6307 52.5965 48.6104C48.4672 50.1803 44.449 52.0281 40.5695 54.1411C39.6038 54.6776 38.6478 55.2532 37.687 55.8043L34.8681 57.6477L32.1467 59.6376L29.552 61.7934C26.1459 64.7573 23.1261 68.1375 20.5635 71.8548C17.9565 75.6089 15.9644 79.7545 14.6621 84.1356C11.9031 83.2993 9.09708 82.6267 6.25878 82.1213C6.04859 82.0797 5.83077 82.1036 5.63454 82.1896C5.39069 81.5458 4.11286 81.3897 4.15676 82.1261C4.20491 82.922 4.29453 83.7147 4.42508 84.5013C4.59578 85.306 4.79082 86.0863 5.04443 86.8764C5.27502 87.6535 5.55688 88.4143 5.88817 89.154C6.23932 89.9051 6.6246 90.6318 7.0294 91.3293C7.42626 92.0364 7.87287 92.7144 8.36579 93.3582C8.87301 94.002 9.39968 94.6262 9.94592 95.2115C10.4834 95.7993 11.0585 96.3516 11.6676 96.8648C12.2919 97.3818 12.9308 97.8646 13.5697 98.3084L13.594 98.4695C13.6281 98.728 13.9501 98.8254 14.3012 98.7961L14.9889 99.2302C15.5693 99.518 16.9398 99.2693 17.1153 98.7133ZM11.2676 88.3592C11.3436 88.4201 11.4273 88.4709 11.5164 88.5103L11.8285 88.6274L11.3652 88.5444L11.2676 88.3592ZM10.9603 87.7788C10.5653 87.0813 10.1702 86.3742 9.77029 85.6719C10.2921 85.8718 10.8189 86.0474 11.3457 86.223C11.1213 86.5351 11.3311 87.0082 12.1114 87.1642L12.4674 87.2373L11.4822 87.3935C11.3676 87.4018 11.2579 87.4423 11.1655 87.5105C11.0731 87.5787 11.002 87.6718 10.9603 87.7788ZM25.9429 88.8615L25.7088 88.9103C25.6379 88.8535 25.5591 88.8074 25.4748 88.7737C25.2797 88.6956 25.0846 88.6274 24.8846 88.5543L25.9429 88.8615ZM24.3286 89.2857L24.1189 89.3491C24.1517 89.3309 24.1787 89.304 24.1969 89.2711L24.3286 89.2857ZM23.7969 89.4565C22.7164 89.8303 21.6745 90.3072 20.6854 90.8806C20.6289 90.8311 20.5666 90.7886 20.5 90.7538C20.0513 90.5685 19.6027 90.3928 19.1589 90.2124C19.393 89.9783 19.2563 89.637 18.6272 89.4175L17.3201 88.9492C19.2668 88.8983 21.2131 89.062 23.124 89.437C23.3456 89.4815 23.5731 89.4881 23.7969 89.4565ZM19.7733 91.5293C19.4319 91.7732 19.1052 92.0316 18.7931 92.3047C17.9104 92.0462 17.0226 91.7731 16.1399 91.4756C16.4049 91.5164 16.6759 91.4929 16.93 91.4073L19.7733 91.5293ZM17.3202 93.7971C16.6361 94.6318 16.0517 95.5435 15.579 96.5137C15.4606 96.4252 15.3555 96.32 15.2669 96.2016C15.6571 96.0943 15.9253 95.8845 15.7351 95.6163L15.4376 95.1823C15.6965 94.9058 16.0128 94.6893 16.3642 94.5482C16.8568 94.2507 16.5837 93.8995 16.0814 93.7386L17.3202 93.7971ZM13.3307 95.7188C12.4658 94.9248 11.6529 94.076 10.897 93.1777C10.1741 92.2565 9.51258 91.2888 8.91685 90.2807C8.2964 89.2552 7.7582 88.1822 7.30737 87.0716C6.81936 85.9456 6.40552 84.7888 6.06856 83.6088C6.06856 83.6088 6.10761 83.6478 6.16125 83.6429L7.44883 83.955C7.3751 84.013 7.3237 84.0947 7.30326 84.1862C7.28282 84.2778 7.29454 84.3736 7.3366 84.4575C8.14621 85.9889 8.9998 87.4958 9.746 88.8761C9.66796 89.1199 9.80452 89.4126 10.1703 89.6126L10.5459 90.2125C10.4093 90.4466 10.4922 90.7343 10.9409 90.9001C11.3749 91.6366 11.7749 92.3486 12.1553 93.0412C12.1553 93.0412 12.1211 93.0753 12.1065 93.09C12.1631 94.0322 12.5869 94.9146 13.2868 95.548L13.3307 95.7188ZM14.2768 85.6328L14.2036 85.9108C12.9601 85.5779 11.7371 85.1724 10.5409 84.6964L14.2768 85.6328ZM16.4081 86.1839L16.5642 86.2229C16.4968 86.2353 16.4323 86.2601 16.374 86.2961L16.4081 86.1839Z" fill="#7DFFAF"/>
</g>
<defs>
<clipPath id="clip0_512_1746">
<rect width="121.069" height="33.7072" fill="white" transform="matrix(-0.707107 0.707107 0.707107 0.707107 86 0)"/>
</clipPath>
</defs>
</svg></a>
        </div> 
   </div>
 )
}