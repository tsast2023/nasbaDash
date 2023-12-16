import logo from './logo.svg';
import './App.css';
import Home from './Components/home';
import Users from './Components/Users';
import Avis from './Components/Avis';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import {Route , Routes , BrowserRouter as Router} from "react-router-dom"
import Services from './Components/Services';
import 'bootstrap/dist/css/bootstrap.min.css';
import Catégories from './Components/Catégories';
import Cookies from "js-cookie"
function App() {
  
  const token = Cookies.get('token');
  if(token){
  return (
   
     <div className="g-sidenav-show  bg-gray-100">
      <Router>
      
        <Routes>
        <Route path='/' element={<><Sidebar/><Home/></>}/>
        <Route path='/users' element={<><Sidebar/><Users/></>} />
        <Route path='/Services' element={<><Sidebar/><Services/></>} />
        <Route path='/Catégories' element={<><Sidebar/><Catégories/></>} />
        <Route path='/avis' element={<><Sidebar/><Avis/></>} />
        <Route path='/login' element={<Login/>}/>
        </Routes>
        
      </Router>
      
    
     {/* <Login/> */}
     </div>
    
    );
  }else{
    return(
      <div className="g-sidenav-show  bg-gray-100">
      <Login/>
      </div>
    )
  }
 
}


export default App;
