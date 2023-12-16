import "./login.css";
import axios from "axios";
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie';
import { useAvis } from "./AvisContext";
function Login() {
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  // const state = useContext(GlobalState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", { email, password });
      if (res && res.data) {
        console.log(res.data);
        console.log(res.data.role)
        if (res.data.role) {
          Cookies.set('token', res.data.token, { expires: 7 });
          window.location.href = "/";

        } else {
          alert("you must be admin to enter");
        }
      } else {
        alert("Failed to fetch data from the server");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.msg);
        alert(err.response.data.msg);
      } else {
        console.log(err);
        alert("An error occurred. Please try again later.");
      }
    }

  };
  

  return (
    <>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-12 d-flex flex-column mx-auto">
                  <img
                    src="../assets/img/logo-ct-dark.svg"
                    style={{ width: "100%", height: "10%", marginTop: "137px" }}
                  />
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="titre">Welcome back</h3>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit} role="form">
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            onChange={e=>setEmail(e.target.value)}
                          />
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={e=>setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                            style={{ background: "rgba(165, 209, 111, 0.9)" }}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-4 mt-2">
              <a
                href=""
                target="_blank"
                className="text-secondary me-xl-4 me-4"
              >
                <span className="text-lg fab fa-dribbble" />
              </a>
              <a
                href=""
                target="_blank"
                className="text-secondary me-xl-4 me-4"
              >
                <span className="text-lg fab fa-twitter" />
              </a>
              <a
                href=""
                target="_blank"
                className="text-secondary me-xl-4 me-4"
              >
                <span className="text-lg fab fa-instagram" />
              </a>
              <a
                href=""
                target="_blank"
                className="text-secondary me-xl-4 me-4"
              >
                <span className="text-lg fab fa-pinterest" />
              </a>
              <a
                href=""
                target="_blank"
                className="text-secondary me-xl-4 me-4"
              >
                <span className="text-lg fab fa-github" />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-8 mx-auto text-center mt-1">
              <p className="mb-0 text-secondary">Copyright 2023 E.Nasba by Tsast © .</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Login;
