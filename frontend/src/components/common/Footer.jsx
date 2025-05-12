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
            <h4>Contact us</h4>
            <ul>
              <li><a href="#">mohtadilokmani8@gmail.com</a></li>
              <li><a href="#"></a>eyayoussef344@gmail.com</li>
              <li><a href="#">salmahrabi91@gmail.com</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
				<i className="fa-brands fa-facebook" >lokmani mohtadi</i><br />
                <i className="fa-brands fa-instagram" >eya youssef</i><br />
                <i className="fa-brands fa-linkedin" >salma hrabi</i> <br />
            </div>
          </div>
        </div>
      </div>
    
    </footer>
    </>
  );
}

export default Footer;