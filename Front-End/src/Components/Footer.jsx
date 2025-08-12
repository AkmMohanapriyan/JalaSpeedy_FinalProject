import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/Css/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container-fluid text-md-left">
        <div className="row text-md-left">
          {/* Column 1: Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="mb-4 font-weight-bold text-warning"><span className='jala'>Jala</span><span className='speedy'>Speedy</span></h5>
            <p>
              JalaSpeedy Water Supply delivers clean, safe, and reliable water for homes, businesses, and industries. We’re committed to timely service and sustainable solutions that support healthy communities.
            </p>
          </div>

          {/* Column 2: Social Media */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow Us</h5>
            <p><a href="#" className="text-light text-decoration-none"><i className="bi bi-facebook me-2"></i>Facebook</a></p>
            <p><a href="#" className="text-light text-decoration-none"><i className="bi bi-instagram me-2"></i>Instagram</a></p>
            <p><a href="#" className="text-light text-decoration-none"><i className="bi bi-telegram me-2"></i>Telegram</a></p>
            <p><a href="#" className="text-light text-decoration-none"><i className="bi bi-whatsapp me-2"></i>WhatsApp</a></p>
          </div>

          {/* Column 3: Navigation Links */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="#home" className="text-light text-decoration-none">Home</a></p>
            <p><a href="#about" className="text-light text-decoration-none">About</a></p>
            <p><a href="#services" className="text-light text-decoration-none">Services</a></p>
            <p><a href="#features" className="text-light text-decoration-none">Features</a></p>
            <p><a href="#contact" className="text-light text-decoration-none">Contact</a></p>
          </div>

          {/* Column 4: Contact Details */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="bi bi-geo-alt-fill me-2"></i>Neithal, Thuraimugam, Karainagar, Jaffna, Sri Lanka</p>
            <p><i className="bi bi-envelope-fill me-2"></i>info@jalaspeedy.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i>+94 77 123 4567</p>
            <p><i className="bi bi-whatsapp me-2"></i>+94 76 198 9195</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Footer Bottom */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">
              © {new Date().getFullYear()} <strong className="text-warning">JalaSpeedy</strong>. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="#" className="text-light text-decoration-none me-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light text-decoration-none me-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light text-decoration-none me-4"><i className="bi bi-telegram"></i></a>
              <a href="#" className="text-light text-decoration-none"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
