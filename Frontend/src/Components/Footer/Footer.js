import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small mdb-color lighten-3 pt-4 main-footer">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">
                &Agrave; propos
              </h5>
              <p>
                Cette application a été développée dans le cadre du MOD 4.6
                Systèmes de bases de données.
              </p>
              <p></p>
            </div>

            <hr className="clearfix w-100 d-md-none" />

            <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">
                Maxime Peter
              </h5>

              <ul className="list-unstyled">
                <li>
                  <p>Etudiant en Data Science</p>
                </li>
                <li>
                  <p>maxime.peter@ecl17.ec-lyon.fr</p>
                </li>

                <li>
                  <p>
                    <a
                      type="button"
                      className="btn-floating btn-tw"
                      href="https://www.linkedin.com/in/maxime-peter-85b51a155/"
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/174/174857.png"
                        alt="LinkedIn"
                        width="24px"
                        height="24px"
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;LinkedIn
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <a
                      type="button"
                      className="btn-floating btn-tw"
                      href="https://github.com/maximepeter"
                    >
                      <img
                        src="https://pngimg.com/uploads/github/github_PNG40.png"
                        alt="GitHub"
                        width="24px"
                        height="24px"
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;GitHub
                    </a>
                  </p>
                </li>
              </ul>
            </div>

            <hr className="clearfix w-100 d-md-none" />

            <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">
                Julien Verdun
              </h5>

              <ul className="list-unstyled">
                <li>
                  <p>Etudiant en Data Science</p>
                </li>
                <li>
                  <p>julien.verdun@ecl17.ec-lyon.fr</p>
                </li>

                <li>
                  <p>
                    <a
                      type="button"
                      className="btn-floating btn-tw"
                      href="https://www.linkedin.com/in/julien-verdun"
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/174/174857.png"
                        alt="LinkedIn"
                        width="24px"
                        height="24px"
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;LinkedIn
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <a
                      type="button"
                      className="btn-floating btn-tw"
                      href="https://github.com/Julien-Verdun"
                    >
                      <img
                        src="https://pngimg.com/uploads/github/github_PNG40.png"
                        alt="GitHub"
                        width="24px"
                        height="24px"
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp; GitHub
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright
        </div>
      </footer>
    );
  }
}

export default Footer;
