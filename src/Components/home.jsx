import React, { useContext, useState, useEffect, useRef } from "react";
import ApexCharts from "react-apexcharts";
import Humberger from "./Humberger";
import MyChartComponent from "./MyChartComponent";
import MyChartComponent2 from "./MyChartComponent2";
import "./Home.css";
import AuthContext from "../Context/AuthContext";

import Chart from "react-apexcharts";

function Home() {
  const chartRef = useRef(null);
  const state = useContext(AuthContext);
  const products = state.ProduitApi || [];
  const users = state.UserApi || [];
  const avis = state.AvisApi || [];
  const categorie = state.CategorieApi || [];
  const stats = state.StatsApi;
  console.log(products);
  const fillMissingMonthsMap = (data) => {
    const result = new Map();
  
    Array.from({ length: 12 }, (_, index) => {
      const month = (index + 1).toString().padStart(2, '0');
      const foundData = data?.find(({ _id }) => {
        const dataMonth = typeof _id.month === 'number' ? _id.month.toString() : _id.month;
        return dataMonth === month;
      }) || {};
      result.set(month, foundData._id ? foundData.count : 0);
    });
  
    return result;
  };
  
  
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Fév",
        " Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Sept",
        "Oct",
        "Nov",
        "Déc",
      ],
    },
  };
  const options2 = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Fév",
        " Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Sept",
        "Oct",
        "Nov",
        "Déc",
      ],
    },
  };
  const res = fillMissingMonthsMap(stats);
  const valuesArray = Array.from(res.values());

  const series = [
    {
      name: "series-1",
      data: valuesArray,
      color: '#AED67D',
    },
  ];
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* Navbar */}
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
           
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group" >
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end " style ={{margin:"20px"}}>
                <Humberger />
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navbar */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Produit
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {products.length}
                          <span className="text-success text-sm font-weight-bolder">
                            {/* +55% */}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="fa-solid fa-cart-shopping"
                          style={{ fontSize: "17px", color: "white" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Users
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {users.length}
                          <span className="text-success text-sm font-weight-bolder">
                            {/* +3% */}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="fa-solid fa-user"
                          style={{ fontSize: "17px" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Catégories
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {categorie.length}
                          <span className="text-danger text-sm font-weight-bolder">
                            {/* -2% */}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="fa-brands fa-shopify"
                          style={{ fontSize: "17px" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Avis
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {avis.length}
                          <span className="text-success text-sm font-weight-bolder">
                            {/* +5% */}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="fa-solid fa-comments "
                          style={{ fontSize: "17px" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-dash">
            <div className="row mt-4 ">
              {/* <MyChartComponent option={stats}  /> */}
              {/* <MyChartComponent2 /> */}
              <ApexCharts
              className="col-6"
              options={options}
              series={series}
              type="line"
              width="500"
            />
               <ApexCharts
               className="col-6"
              options={options}
              series={series}
              type="bar"
              width="500"
            />
            </div>
          </div>

          <footer className="footer pt-3  ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-lg-between">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <div className="copyright text-center text-sm text-muted text-lg-start">
                    2023© , made with <i className="fa fa-heart" /> by
                    <a
                      href="https://www.creative-tim.com"
                      className="font-weight-bold"
                      target="_blank"
                    >
                      E.Nasba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
      <div className="fixed-plugin">
        <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
          <i className="fa fa-cog py-2"> </i>
        </a>
      </div>
    </>
  );
}

export default Home;
