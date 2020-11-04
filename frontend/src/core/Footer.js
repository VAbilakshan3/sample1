import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";


const Footer = () => (
    
     <footer className="footer-area section_gap fcol mt-5 pt-5 pb-1">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-lg-4 col-md-6 single-footer-widget">
          <h4>Top Products</h4>
          <ul>
            <li><Link className="flinkk"to="/">Metal </Link></li>
            <li><Link className="flinkk"to="/">Plastic</Link></li>
            <li><Link className="flinkk"to="/">Glass</Link></li>
            {/* <li><Link className="flinkk"to="/">Marketing Service</Link></li> */}
          </ul>
        </div>
        {/* <div className="col-sm-12 col-lg-2 col-md-6 single-footer-widget">
          <h4>Quick Links</h4>
          <ul>
            <li><Link className="flinkk"to="/">Jobs</Link></li>
            <li><Link className="flinkk"to="/">Brand Assets</Link></li>
            <li><Link className="flinkk"to="/">Investor Relations</Link></li>
            <li><Link className="flinkk"to="/">Terms of Service</Link></li>
          </ul>
        </div> */}
        <div className="col-sm-12 col-lg-4 col-md-6 single-footer-widget">
          <h4>Features</h4>
          <ul>
            <li><Link className="flinkk"to="/cart" target="_blank">Cart</Link></li>
            <li><Link className="flinkk"to="/">View Service</Link></li>
            <li><Link className="flinkk"to="/create/detail" target="_blank" >Send Details to us</Link></li>
            <li><Link className="flinkk"to="/create/contact" target="_blank">Contact Us</Link></li>
          </ul>
        </div>
        {/* <div className="col-sm-12 col-lg-2 col-md-6 single-footer-widget">
          <h4>Resources</h4>
          <ul>
            <li><Link className="flinkk"to="/">Guides</Link></li>
            <li><Link className="flinkk"to="/">Research</Link></li>
            <li><Link className="flinkk"to="/">Experts</Link></li>
            <li><Link className="flinkk"to="/">Agencies</Link></li>
          </ul>
        </div> */}
        <div className="col-sm-12 col-lg-4 col-md-6 single-footer-widget">
          <h4>Newsletter</h4>
          <p>You can trust us.</p>
          <p>To <Link className="flinkk" to="/create/contact" target="_blank">Contact Us.</Link></p>
          
        </div>
      </div>
      <hr style={{width:"100%"}}></hr>
      <div className="footer-bottom row align-items-center">
        <p className="footer-text m-0 col-sm-12 col-lg-12 col-md-12 mt- text-center">
Copyright &copy; 2020. 
{/* <script>  document.write(new Date().getFullYear()); </script> */}
 All rights reserved | <i className="fa fa-heart-o" aria-hidden="true"></i> <Link className="flinkk"to="/" target="_blank">CleanLife</Link>
</p>
        <div className="col-sm-12 col-lg-4 col-md-12 footer-social">
          <Link className="flinkk"to="/"><i className="fa fa-facebook"></i></Link>
          <Link className="flinkk"to="/"><i className="fa fa-twitter"></i></Link>
          <Link className="flinkk"to="/"><i className="fa fa-dribbble"></i></Link>
          <Link className="flinkk"to="/"><i className="fa fa-behance"></i></Link>
        </div>
      </div>
    </div>
  </footer>
    
  )
  
  export default Footer;