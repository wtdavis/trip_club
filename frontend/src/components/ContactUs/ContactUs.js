import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact_us_container_main">
      <div className="contact_us_container">
      
        <div className="contact_us_greeting">
          <h2>meet our team</h2>
        </div>

        <div className="contact_us_grid">
          <div className="item one">
            <img src={require("../../assets/contactus/will.jpg")} alt=""></img>
          </div>
          <div className="item two">
            <img src={require("../../assets/contactus/olga.jpg")} alt=""></img>
          </div>
          <div className="item three">
            <img src={require("../../assets/contactus/zane.jpg")} alt=""></img>
          </div>
          <div className="item four">4</div>
          <div className="item five">5</div>
          <div className="item six">6</div>
          <div className="item feven">7</div>
          <div className="item eight">8</div>
          <div className="item nine">9</div>
          <div className="item ten">10</div>
          <div className="item eleven">11</div>
          <div className="item twelve">12</div>
        </div>
        

        {/* <div className="contact_us_row_container">
          <div className="contact_us_row_item">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/will.jpg")} alt=""></img>
            </div>
            <div className="contact_us_role">
              <p>Team Lead</p>
            </div>
            <div className="contact_us_links">

            </div>
          </div>

          <div className="contact_us_row_item">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/olga.jpg")} alt=""></img>
            </div>
            <div className="contact_us_role">
              <p>Frontend Lead</p>
            </div>
            <div className="contact_us_links">

            </div>
          </div>

          <div className="contact_us_row_item">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/zane.jpg")} alt=""></img>
            </div>
            <div className="contact_us_role">
              <p>Backend Lead</p>
            </div>
            <div className="contact_us_links">

            </div>
          </div>
        </div> */}

      </div>

    </div>

  )
};

export default ContactUs;