import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Humberger() {
  const handleLogout = () => {
    // Clear the token to log the user out
    Cookies.remove("token", { path: "/" });
    window.location.href = "/login";
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span style={{ width: "100%" }} variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-bars"></i>
      </span>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <a
              href="index.html"
              style={{ textAlign: "center" }}
              className="logo"
            >
              <img
                src="../assets/img/logo-ct-dark.svg"
                style={{ width: "70%", marginTop: "37px" }}
              />
            </a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav style={{ background: "" }} className="main-nav">
            {/* ***** Logo Start ***** */}

            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <div>
              <Link style={{ color: "black", textDecoration: "none" }} to={"/"}>
                {" "}
                <h4>
                  {" "}
                  <i
                    class="fa-solid fa-house"
                    style={{ color: "#AED57D" }}
                  ></i>{" "}
                  Home
                </h4>{" "}
              </Link>{" "}
              <hr style={{ color: "#66afa5" }} />
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/Services"}
              >
                <h4>
                  {" "}
                  <i
                    class="fa-solid fa-cart-shopping"
                    style={{ color: "#AED57D" }}
                  ></i>{" "}
                  Produit
                </h4>
              </Link>
              <hr style={{ color: "#66afa5" }} />
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/Users"}
              >
                <h4>
                  {" "}
                  <i
                    class="fa-solid fa-user"
                    style={{ color: "#AED57D" }}
                  ></i>{" "}
                  Utilisateur
                </h4>
              </Link>
              <hr style={{ color: "#66afa5" }} />
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/Catégories"}
              >
                <h4>
                  {" "}
                  <i
                    class="fa-brands fa-shopify"
                    style={{ fontSize: "25px", color: "#AED57D" }}
                  ></i>{" "}
                  Catégories
                </h4>
              </Link>
              <hr style={{ color: "#66afa5" }} />
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/Avis"}
              >
                <h4>
                  {" "}
                  <i
                    class="fa-solid fa-comments "
                    style={{ fontSize: "25px", color: "#AED57D" }}
                  ></i>{" "}
                  Avis
                </h4>
              </Link>
              <hr style={{ color: "#66afa5" }} />
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/Catégories"}
              >
                <h4>
                  {" "}
                
                   <button  onClick={handleLogout} style={{border:"none" , backgroundColor:"transparent", color:"black", fontSize:"25px"}}  >
                      <i
                        style={{ fontSize: "25px", color: "#AED57D" }}
                        class="fa-solid fa-arrow-right-to-bracket"
                      ></i>{" "}
                    
                   </button>{" "}
                   Logout
                </h4>
              </Link>
              <hr style={{ color: "#66afa5" }} />
              {/* <a style={{color: 'black' , textAlign:"center"}}href="#video"><h4>Abonner</h4></a><hr style={{color:"#66afa5"}}/>  */}
            </div>

            {/* ***** Menu End ***** */}
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Humberger;
