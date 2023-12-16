import React, { useContext, useEffect, useState } from "react";
import Eam from "./Sidebar/SidebarRes";
import "./User.css";
import Humberger from "./Humberger";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";

function Categorie(props) {
  const [isMobile, setIsMobile] = useState(false);
  const state = useContext(AuthContext);
  const data = state.CategorieApi;
  const token = Cookies.get("token");
  const { user } = props;
  const [data1, setData1] = useState({
    title: "",
  });

  const [newuser, setNewuser] = useState({
    title: "",
  });

  const removeCategorie = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          console.log(id);
          try {
            const res = await axios.delete(
              `  http://localhost:5000/api/category/${id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
          swalWithBootstrapButtons
            .fire("Deleted!", "Your file has been deleted.", "success")
            .then((result) => {
              if (result.isConfirmed) {
                console.log('Action after "OK" in the alert');
                // window.location.reload(); // Example action: reload the page
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const updateCategorie = async (categorieid) => {
    console.log(categorieid);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/category/${categorieid}`,
        data1,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User has been updated",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addCategorie = async (id) => {
    console.log("new Data:", data);
    console.log(id);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/category`,
        newuser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User has been updated",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [isUpdatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);

  const openUpdatePopup = () => {
    setUpdatePopupVisible(true);
  };

  const closeUpdatePopup = () => {
    setUpdatePopupVisible(false);
  };
  const openAddPopup = () => {
    setAddPopupVisible(true);
  };

  const closeAddPopup = () => {
    setAddPopupVisible(false);
  };

  useEffect(() => {
    console.log(data);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end" style ={{margin:"20px"}}>
                <Humberger />
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navbar */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Categorie</h6>
                </div>

                {isMobile ? (
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive">
                      <table className="table align-items-center mb-0">
                        <thead></thead>
                        <tbody>
                          {data?.map((item) => {
                            return (
                              <tr
                                key={item._id}
                                className="row"
                                style={{ textAlign: "center" }}
                              >
                                <th
                                  style={{
                                    backgroundColor: "rgba(107,197,216,0.5)",
                                  }}
                                ></th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Nom
                                </th>
                                <td className="col-sm-12">
                                  <div className="align-middle">
                                    <div></div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {item.title}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Description
                                </th>
                                <td className="col-sm-12">
                                  <div className="align-middle">
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">the best</h6>
                                    </div>
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Nombre des Etoiles
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">5</div>
                                </td>

                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Ajouter
                                </th>
                                <td data-label="ADD">
                                  <button
                                    className="utilisateur-butt"
                                    onClick={openAddPopup}
                                  >
                                    <i
                                      className="fa-solid fa-plus"
                                      style={{ color: "#2CA300" }}
                                    ></i>
                                  </button>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Update
                                </th>
                                <td data-label="Update">
                                  <button
                                    className="utilisateur-butt"
                                    onClick={openUpdatePopup}
                                  >
                                    <i
                                      className="fa-solid fa-arrows-rotate"
                                      style={{ color: "#66c3d7" }}
                                    ></i>
                                  </button>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Supprimer
                                </th>
                                <td data-label="Remove">
                                  <button
                                    onClick={() => {
                                      removeCategorie(item._id);
                                    }}
                                    className="utilisateur-butt"
                                  >
                                    <i
                                      className="fa-solid fa-trash-can"
                                      style={{ color: "#e90707" }}
                                    ></i>
                                  </button>
                                </td>
                                {isUpdatePopupVisible && (
                                  <div className="popup-container">
                                    <div className="update-popup">
                                      <button
                                        className="close-button"
                                        onClick={closeUpdatePopup}
                                      >
                                        <i className="fa-solid fa-circle-xmark"></i>
                                      </button>
                                      <h2>Update Categorie</h2>
                                      <div className="input-container">
                                        <input
                                          type="text"
                                          placeholder="New Name"
                                          className="popup-input"
                                          value={data1.title}
                                          onChange={(e) =>
                                            setData1({
                                              ...data1,
                                              title: e.target.value,
                                            })
                                          }
                                        />
                                        {/* <input type="text" placeholder="New Email" className="popup-input" value={data1.email} onChange={e=>setData1({...data1 , email:e.target.value})} />
              <input type="text" placeholder="New Adresse" className="popup-input" value={data1.password} onChange={e=>setData1({...data1 , password:e.target.value})} />    */}
                                        {/* <input type="text" placeholder="New Nb d'achats" className="popup-input" />    */}
                                      </div>
                                      <button
                                        onClick={() =>
                                          updateCategorie(item._id)
                                        }
                                        className="Add-button"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {isAddPopupVisible && (
                        <div className="popup-container">
                          <div className="update-popup">
                            <button
                              className="close-button"
                              onClick={closeAddPopup}
                            >
                              <i className="fa-solid fa-circle-xmark"></i>
                            </button>
                            <h2>Add Categorie</h2>
                            <div className="input-container">
                              <input
                                type="text"
                                placeholder="New Name"
                                className="popup-input"
                                value={newuser.title}
                                onChange={(e) =>
                                  setNewuser({
                                    ...newuser,
                                    title: e.target.value,
                                  })
                                }
                              />
                              {/* <input type="text" placeholder="New Email" className="popup-input" value={newuser.email} onChange={e=>setNewuser({...newuser , email:e.target.value})} />
              <input type="text" placeholder="New Adresse" className="popup-input" value={newuser.password} onChange={e=>setNewuser({...newuser , password:e.target.value})} />    */}
                              <input
                                type="text"
                                placeholder="New Nb d'achats"
                                className="popup-input"
                              />
                            </div>
                            <button
                              onClick={() => addCategorie()}
                              className="Add-button"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nom
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Description
                            </th>

                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nb d'etoile
                            </th>
                            <th className="text-secondary opacity-7">
                              Ajouter
                            </th>
                            <th className="text-secondary opacity-7">Update</th>
                            <th className="text-secondary opacity-7">
                              Supprimer
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((item) => {
                            return (
                              <tr key={item._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      {/* <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1" /> */}
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {item.title}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                    the best
                                  </p>
                                </td>

                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">
                                    69
                                  </span>
                                </td>
                                <td data-label="ADD">
                                  <button
                                    className="utilisateur-butt"
                                    onClick={openAddPopup}
                                  >
                                    <i
                                      className="fa-solid fa-plus"
                                      style={{ color: "#2CA300" }}
                                    ></i>
                                  </button>
                                </td>
                                <td data-label="Update">
                                  <button
                                    className="utilisateur-butt"
                                    onClick={openUpdatePopup}
                                  >
                                    <i
                                      className="fa-solid fa-arrows-rotate"
                                      style={{ color: "#66c3d7" }}
                                    ></i>
                                  </button>
                                </td>
                                <td data-label="Remove">
                                  <button
                                    onClick={() => {
                                      removeCategorie(item._id);
                                    }}
                                    className="utilisateur-butt"
                                  >
                                    <i
                                      className="fa-solid fa-trash-can"
                                      style={{ color: "#e90707" }}
                                    ></i>
                                  </button>
                                </td>
                                {isUpdatePopupVisible && (
                                  <div className="popup-container">
                                    <div className="update-popup">
                                      <button
                                        className="close-button"
                                        onClick={closeUpdatePopup}
                                      >
                                        <i className="fa-solid fa-circle-xmark"></i>
                                      </button>
                                      <h2>Update Utilisateur</h2>
                                      <div className="input-container">
                                        <input
                                          type="text"
                                          placeholder="New Name"
                                          className="popup-input"
                                          value={data1.title}
                                          onChange={(e) =>
                                            setData1({
                                              ...data1,
                                              title: e.target.value,
                                            })
                                          }
                                        />
                                        {/* <input type="text" placeholder="New Email" className="popup-input" value={data1.email} onChange={e=>setData1({...data1 , email:e.target.value})} />
              <input type="text" placeholder="New Adresse" className="popup-input" value={data1.password} onChange={e=>setData1({...data1 , password:e.target.value})}/>    */}
                                        {/* <input type="text" placeholder="New Nb d'achats" className="popup-input" />    */}
                                      </div>
                                      <button
                                        onClick={() =>
                                          updateCategorie(item._id)
                                        }
                                        className="Add-button"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {isAddPopupVisible && (
                      <div className="popup-container">
                        <div className="update-popup">
                          <button
                            className="close-button"
                            onClick={closeAddPopup}
                          >
                            <i className="fa-solid fa-circle-xmark"></i>
                          </button>
                          <h2>Add Utilisateur</h2>
                          <div className="input-container">
                            <input
                              type="text"
                              placeholder="New Name"
                              className="popup-input"
                              value={newuser.title}
                              onChange={(e) =>
                                setNewuser({
                                  ...newuser,
                                  title: e.target.value,
                                })
                              }
                            />
                            {/* <input type="text" placeholder="New Email" className="popup-input" value={newuser.email} onChange={e=>setNewuser({...newuser , email:e.target.value})} />
              <input type="text" placeholder="New password" className="popup-input" value={newuser.password} onChange={e=>setNewuser({...newuser , password:e.target.value})} />    */}
                            {/* <input type="text" placeholder="New Nb d'achats" className="popup-input" /> */}
                          </div>
                          <button
                            onClick={() => addCategorie()}
                            className="Add-button"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
    </>
  );
}

export default Categorie;
