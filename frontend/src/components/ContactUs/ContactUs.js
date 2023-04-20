import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact_us_container_main">
      <div className="contact_us_container">
      
        <div className="contact_us_greeting">
          <h2>meet our team</h2>
        </div>

        {/* <div className="contact_us_grid">
          <div className="item one">
            <img src={require("../../assets/contactus/will.jpg")} alt=""></img>
          </div>
          <div className="item two">
            <img src={require("../../assets/contactus/olga.jpg")} alt=""></img>
          </div>
          <div className="item three">
            <img src={require("../../assets/contactus/zane.jpg")} alt=""></img>
          </div>
          <div className="item four">
            <h2>Team Lead</h2>
          </div>
          <div className="item five">
            <h2>Frontend Lead</h2>
          </div>
          <div className="item six">
            <h2>Backend Lead</h2>
          </div>
          <div className="item seven">
            <a className = 'github-link' href="https://github.com/olga-bessonova/BunnyHop">
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
          </div>
          <div className="item eight">
            <a className = 'linkedin-link' href="https://www.linkedin.com/in/olga-borovikova/">
              <i className="fa-brands fa-linkedin-in fa-2x"></i>
            </a>
          </div>
          <div className="item nine">
            <a className = 'github-link' href="https://github.com/olga-bessonova/BunnyHop">
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
          </div>
          <div className="item ten">
            <a className = 'linkedin-link' href="https://www.linkedin.com/in/olga-borovikova/">
                <i className="fa-brands fa-linkedin-in fa-2x"></i>
              </a>
          </div>
          <div className="item eleven">
            <a className = 'github-link' href="https://github.com/olga-bessonova/BunnyHop">
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
          </div>
          <div className="item twelve">
            <a className = 'linkedin-link' href="https://www.linkedin.com/in/olga-borovikova/">
                <i className="fa-brands fa-linkedin-in fa-2x"></i>
            </a>
          </div>
        </div> */}
        

        <div className="contact_us_grid_container">
          <div className="contact_us_column">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/will.jpg")} alt=""></img>
            </div>
            <div className="contact_us_name">
              <p>Will Davis</p>
            </div>
            <div className="contact_us_role">
              <p>team lead</p>
            </div>

            <div className="social_links">
              <div>
                <a className = 'github-link' href="https://github.com/wtdavis/">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a className = 'linkedin-link' href="https://www.linkedin.com/">
                  <i className="fa-brands fa-linkedin-in fa-2x"></i>
                </a>
              </div>

            </div>

          </div>

          <div className="contact_us_column">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/olga.jpg")} alt=""></img>
            </div>
            <div className="contact_us_name">
              <p>Olga Bessonova</p>
            </div>
            <div className="contact_us_role">
              <p>frontend lead</p>
            </div>
            <div className="social_links">
              <div>
                <a className = 'github-link' href="https://github.com/olga-bessonova/">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a className = 'linkedin-link' href="https://www.linkedin.com/in/olga-borovikova/">
                  <i className="fa-brands fa-linkedin-in fa-2x"></i>
                </a>
              </div>

            </div>
          </div>

          <div className="contact_us_column">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/zane.jpg")} alt=""></img>
            </div>
            <div className="contact_us_name">
              <p>Zane Eisen</p>
            </div>
            <div className="contact_us_role">
              <p>backend lead</p>
            </div>
            <div className="social_links">
              <div>
                <a className = 'github-link' href="https://github.com/zeisen33">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a className = 'linkedin-link' href="https://www.linkedin.com/in/zane-eisen-121856bb/">
                  <i className="fa-brands fa-linkedin-in fa-2x"></i>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>

  )
};

export default ContactUs;