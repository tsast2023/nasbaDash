import React, { useContext, useEffect, useState } from "react";

import "./User.css";
import Humberger from "./Humberger";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";

function Services(props) {
  const [isMobile, setIsMobile] = useState(false);
  const state = useContext(AuthContext);
  const data = state.ProduitApi;
  const token = Cookies.get("token");
  const { user } = props;
  const [data1, setData1] = useState({
    product: {
      title: "",
      img: "",
      price: "",
      description: "",
      colors: "",
      quantity: "",
      sizes: "",
      category: "",
      old_price: "",
      brand: "",
      dimention: "",
      weight: "",
    },
  });

  console.log(data1);

  const updateProduit = async (id) => {
    console.log("new Data:", data1);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/product/${id}`,
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

  const [newuser, setNewuser] = useState({
    product: {
      title: "",
      img: "",
      price: "",
      description: "",
      colors: "",
      quantity: "",
      sizes: "",
      category: "",
      old_price: "",
      brand: "",
      dimension: "",
      weight: "",
    },
  });
  console.log(newuser);
  // const addProduit = async () => {
  //   console.log("new Data:", newuser);

  //   try {
  //     const res = await axios.post(
  //       ` http://localhost:5000/api/product`,
  //       newuser,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     console.log(res.data);
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "User has been updated",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {

  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const removeProduit = async (id) => {
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
              ` http://localhost:5000/api/product/${id}`,
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
                window.location.reload(); // Example action: reload the page
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewuser((prevUser) => ({
      ...prevUser,
      product: {
        ...prevUser.product,
        [name]: value,
      },
    }));
  };
  
  // Modify addProduit function to use newuser state for adding a product
  const addProduit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/product`,
        newuser.product, // Use the product object from newuser state
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product has been added",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Optional: Perform any additional action after adding the product
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input name
    setData1((prevUser) => ({
      ...prevUser,
      product: {
        ...prevUser.product,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
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
                  <h6>Produit</h6>
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
                                    <div>
                                      <div className="">
                                        {/* <i className="ni ni-chat-round text-lg opacity-10" aria-hidden="true" /> */}
                                      </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {item.product.title}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Image
                                </th>
                                <td className="col-sm-12">
                                  <div className="align-middle">
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        <img
                                          src={`data:image/jpeg;base64,${item.product.img}`}
                                         
                                        ></img>
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Price
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.price}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Description
                                </th>
                                <td className="align-middle text-center text-sm">
                                  <div className="avatar-group mt-2">
                                    {item.product.description}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Color
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.colors}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Size
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.sizes}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Qantité
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.quantity}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Category
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.category}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Brand
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.brand}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Weight
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.weight}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Old_Price
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.old_price}
                                  </div>
                                </td>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Dimention
                                </th>
                                <td className="col-sm-12">
                                  <div className="avatar-group mt-2">
                                    {item.product.dimension}
                                  </div>
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
                                      removeProduit(item._id);
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
                                      <h2>Update Produit</h2>
                                      <div className="row">
                                        <div className="input-container ">
                                          <input
                                            type="text"
                                            placeholder="New Name"
                                            className="popup-input col-6"
                                            name="title"
                                            value={data1.product.title}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="sizes"
                                            type="text"
                                            placeholder="New size"
                                            className="popup-input col-6"
                                            value={data1.product.sizes}
                                            onChange={handleInput}
                                          />

                                          <textarea
                                            type="text"
                                            placeholder="New Description"
                                            className="popup-input col"
                                            name="description"
                                            value={data1.product.description}
                                            onChange={handleInput}
                                          />
                                          <input
                                            type="text"
                                            placeholder="New Prix"
                                            className="popup-input col-6"
                                            name="price"
                                            value={data1.product.price}
                                            onChange={handleInput}
                                          />
                                          <input
                                            type="text"
                                            placeholder="New Couler"
                                            className="popup-input col-6"
                                            name="colors"
                                            value={data1.product.colors}
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="img"
                                            type="file"
                                            placeholder="New Image"
                                            className="popup-input col"
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="quantity"
                                            type="text"
                                            placeholder="New quantity"
                                            className="popup-input col-6"
                                            value={data1.product.quantity}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="brand"
                                            type="text"
                                            placeholder="New brand"
                                            className="popup-input col-6"
                                            value={data1.product.brand}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="category"
                                            type="text"
                                            placeholder="New category"
                                            className="popup-input "
                                            value={data1.product.category}
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="weight"
                                            type="text"
                                            placeholder="New weight"
                                            className="popup-input col-6"
                                            value={data1.product.weight}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="dimension"
                                            type="text"
                                            placeholder="New dimention"
                                            className="popup-input col-6"
                                            value={data1.product.dimension}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="old_price"
                                            type="text"
                                            placeholder="New old_price"
                                            className="popup-input"
                                            value={data1.product.old_price}
                                            onChange={handleInput}
                                          />
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => updateProduit(item._id)}
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
                            <h2>Add Produits</h2>
                            <div className="row">
                              <div className="input-container ">
                                <input
                                  type="text"
                                  placeholder="New Name"
                                  className="popup-input col-6"
                                  name="title"
                                  value={data1.product.title}
                                  onChange={handleInput}
                                />
                                <input
                                  name="sizes"
                                  type="text"
                                  placeholder="New size"
                                  className="popup-input col-6"
                                  value={data1.product.sizes}
                                  onChange={handleInput}
                                />

                                <textarea
                                  type="text"
                                  placeholder="New Description"
                                  className="popup-input col"
                                  name="description"
                                  value={data1.product.description}
                                  onChange={handleInput}
                                />
                                <input
                                  type="text"
                                  placeholder="New Prix"
                                  className="popup-input col-6"
                                  name="price"
                                  value={data1.product.price}
                                  onChange={handleInput}
                                />
                                <input
                                  type="text"
                                  placeholder="New Couler"
                                  className="popup-input col-6"
                                  name="colors"
                                  value={data1.product.colors}
                                  onChange={handleInput}
                                />

                                <input
                                  name="img"
                                  type="file"
                                  placeholder="New Image"
                                  className="popup-input col"
                                  onChange={handleInput}
                                />

                                <input
                                  name="quantity"
                                  type="text"
                                  placeholder="New quantity"
                                  className="popup-input col-6"
                                  value={data1.product.quantity}
                                  onChange={handleInput}
                                />
                                <input
                                  name="brand"
                                  type="text"
                                  placeholder="New brand"
                                  className="popup-input col-6"
                                  value={data1.product.brand}
                                  onChange={handleInput}
                                />
                                <input
                                  name="category"
                                  type="text"
                                  placeholder="New category"
                                  className="popup-input "
                                  value={data1.product.category}
                                  onChange={handleInput}
                                />

                                <input
                                  name="weight"
                                  type="text"
                                  placeholder="New weight"
                                  className="popup-input col-6"
                                  value={data1.product.weight}
                                  onChange={handleInput}
                                />
                                <input
                                  name="dimension"
                                  type="text"
                                  placeholder="New dimention"
                                  className="popup-input col-6"
                                  value={data1.product.dimension}
                                  onChange={handleInput}
                                />
                                <input
                                  name="old_price"
                                  type="text"
                                  placeholder="New old_price"
                                  className="popup-input"
                                  value={data1.product.old_price}
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => addProduit()}
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
                              Image
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Description
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Price
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Color
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Quantity
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Size
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Category
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Brand
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Weight
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              old_price
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Dimention
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
                                      {/* <img src="../assets/img/team-3.jpg" className="avatar avatar-sm me-3" alt="user2" /> */}
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {item.product.title}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <img
                                    src={`data:image/jpeg;base64,${item.product.img}` }
                                    height={"80px"} width={"80px"}
                                  ></img>
                                </td>

                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.description}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.price}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.colors}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.quantity}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.sizes}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.category}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.brand}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.weight}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.old_price}</p>
                                </td>

                                <td className="align-middle text-center text-sm">
                                  <p>{item.product.dimension}</p>
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
                                      removeProduit(item._id);
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
                                      <h2>Update Produit</h2>
                                      <div className="row">
                                        <div className="input-container ">
                                          <input
                                            type="text"
                                            placeholder="New Name"
                                            className="popup-input col-6"
                                            name="title"
                                            value={data1.product.title}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="sizes"
                                            type="text"
                                            placeholder="New size"
                                            className="popup-input col-6"
                                            value={data1.product.sizes}
                                            onChange={handleInput}
                                          />

                                          <textarea
                                            type="text"
                                            placeholder="New Description"
                                            className="popup-input col"
                                            name="description"
                                            value={data1.product.description}
                                            onChange={handleInput}
                                          />
                                          <input
                                            type="text"
                                            placeholder="New Prix"
                                            className="popup-input col-6"
                                            name="price"
                                            value={data1.product.price}
                                            onChange={handleInput}
                                          />
                                          <input
                                            type="text"
                                            placeholder="New Couler"
                                            className="popup-input col-6"
                                            name="colors"
                                            value={data1.product.colors}
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="img"
                                            type="file"
                                            placeholder="New Image"
                                            className="popup-input col"
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="quantity"
                                            type="text"
                                            placeholder="New quantity"
                                            className="popup-input col-6"
                                            value={data1.product.quantity}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="brand"
                                            type="text"
                                            placeholder="New brand"
                                            className="popup-input col-6"
                                            value={data1.product.brand}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="category"
                                            type="text"
                                            placeholder="New category"
                                            className="popup-input "
                                            value={data1.product.category}
                                            onChange={handleInput}
                                          />

                                          <input
                                            name="weight"
                                            type="text"
                                            placeholder="New weight"
                                            className="popup-input col-6"
                                            value={data1.product.weight}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="dimension"
                                            type="text"
                                            placeholder="New dimention"
                                            className="popup-input col-6"
                                            value={data1.product.dimension}
                                            onChange={handleInput}
                                          />
                                          <input
                                            name="old_price"
                                            type="text"
                                            placeholder="New old_price"
                                            className="popup-input"
                                            value={data1.product.old_price}
                                            onChange={handleInput}
                                          />
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => updateProduit(item._id)}
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
                          <h2>Add Produits</h2>
                          <div className="row">
                            <div className="input-container ">
                              <input
                                type="text"
                                placeholder="New Name"
                                className="popup-input col-6"
                                name="title"
                                value={newuser.product.title}
                                onChange={handleInputChange}
                              />
                              <input
                                name="sizes"
                                type="text"
                                placeholder="New size"
                                className="popup-input col-6"
                                value={newuser.product.sizes}
                                onChange={handleInputChange}
                              />

                              <textarea
                                type="text"
                                placeholder="New Description"
                                className="popup-input col"
                                name="description"
                                value={newuser.product.description}
                                onChange={handleInputChange}
                              />
                              <input
                                type="text"
                                placeholder="New Prix"
                                className="popup-input col-6"
                                name="price"
                                value={newuser.product.price}
                                onChange={handleInputChange}
                              />
                              <input
                                type="text"
                                placeholder="New Couler"
                                className="popup-input col-6"
                                name="colors"
                                value={newuser.product.colors}
                                onChange={handleInputChange}
                              />

                              <input
                                            name="img"
                                            type="file"
                                            placeholder="New Image"
                                            className="popup-input col"
                                            value={newuser.product.img}
                                            onChange={handleInputChange}
                              />

                              <input
                                name="quantity"
                                type="text"
                                placeholder="New quantity"
                                className="popup-input col-6"
                                value={newuser.product.quantity}
                                onChange={handleInputChange}
                              />
                              <input
                                name="brand"
                                type="text"
                                placeholder="New brand"
                                className="popup-input col-6"
                                value={newuser.product.brand}
                                onChange={handleInputChange}
                              />
                              <input
                                name="category"
                                type="text"
                                placeholder="New category"
                                className="popup-input "
                                value={newuser.product.category}
                                onChange={handleInputChange}
                              />

                              <input
                                name="weight"
                                type="text"
                                placeholder="New weight"
                                className="popup-input col-6"
                                value={newuser.product.weight}
                                onChange={handleInputChange}
                              />
                              <input
                                name="dimension"
                                type="text"
                                placeholder="New dimention"
                                className="popup-input col-6"
                                value={newuser.product.dimension}
                                onChange={handleInputChange}
                              />
                              <input
                                name="old_price"
                                type="text"
                                placeholder="New old_price"
                                className="popup-input"
                                value={newuser.product.old_price}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => addProduit()}
                          className="Add-button"
                        >
                          Add
                        </button>
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
                      {" "}
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

export default Services;
