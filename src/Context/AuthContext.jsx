import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const token = Cookies.get("token");
  const [Users, setUsers] = useState();
  const [Produit, setProduit] = useState();
  const [Categorie, setCategorie] = useState();
  const [Avis, setAvis] = useState();
  const [stats, setStats] = useState();

  useEffect(() => {
    console.log(token);
    if (token) {
      const getUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/user/all-users");
        console.log(res.data);
        setUsers(res.data);
      };
      const getProduit = async () => {
        const res = await axios.get("http://localhost:5000/api/product");
        console.log(res.data);
        setProduit(res.data);
      };
      const getCategorie = async () => {
        const res = await axios.get("http://localhost:5000/api/category");
        console.log("category data:",res.data);
        setCategorie(res.data);
      };
      const getAvis = async () => {
        const res = await axios.get("http://localhost:5000/api/review/reviews");
        console.log("avis data:",res.data);
        setAvis(res.data);
      };
      const getstats = async () => {
        try{
          const res = await axios.get("http://localhost:5000/api/user/users/monthly-count");
          console.log("count month data:",res.data);
          setStats(res.data)
        }catch(eer){
          console.log(eer)
        }
       
      };
      getUsers();
      getProduit();
      getCategorie();
      getAvis();
      getstats();
      
    }
  }, [token]);
  const state = {
    UserApi: Users,
    ProduitApi:Produit,
    CategorieApi:Categorie,
    AvisApi:Avis,
    StatsApi:stats,
  };

  return (
    <AuthContext.Provider value={state}>
      {/* value ={state} */}
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
