import "./Footer.css";
function Footer() {
  return (
    <>
      
      <footer className="footer">
      <div className="f-container">
        <div className="row">
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li><a href="#a1">About us</a></li>
              <li><a href="#a2">How It Work</a></li>
              <li><a href="#a3">Popular Quiz</a></li>
              <li><a href="#a4">Create Quiz</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contactez-nous</h4>
            <ul>
              <li><a href="#">something</a></li>
              <li><a href="#">something</a></li>
              <li><a href="#">something</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Suivez-nous</h4>
            <div className="social-links">
				<i className="fa-brands fa-facebook" id="i1" ></i>
                <i className="fa-brands fa-instagram" id="i2"></i>
                <i className="fa-brands fa-linkedin" id="i4"></i>
            </div>
          </div>
        </div>
      </div>
    
    </footer>
    </>
  );
}

export default Footer;