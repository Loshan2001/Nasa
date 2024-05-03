 import React from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import Header from './pages/Header&Footer/Header'
 import Home from './pages/Home/Home'
 import { BrowserRouter as Router,  Routes,Route,Link } from 'react-router-dom';
 import Apod from './pages/APOD/Apod'
 import Mrp from './pages/MRP/Mrp'
 import Epic from './pages/EPIC/Epic'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import '@fortawesome/fontawesome-svg-core/styles.css';

 
 function App() {
   return (
     <div>
        <Router>
          <div>
          <Header/>
          <Link to="/login" />
          </div>
          <Routes>
            <Route>
            <Route exact path="/" element={<Home/>} />
            <Route path="/apod" element={<Apod/>} />
            <Route path="/mars" element={<Mrp/>} />
            <Route path="/epic" element={<Epic/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            
            <Route path ='*' element={  <div className="container d-flex justify-content-center align-items-center vh-100"> <h1 style={{ color: 'white' }}>Page doesn't exist !!</h1></div>}/>
            </Route>
          </Routes>
        </Router>
       
       
     </div>
   )
 }
 
 export default App
 