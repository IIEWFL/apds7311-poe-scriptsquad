
import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';

import Login from './Pages/Login'
import Register from './Pages/Register'
import LocalPayments from './Pages/LocalPayments';
import InternationalPayments from './Pages/InternationalPayments';

const App = () => {
    return(
     <div>
      <h1>Hi world</h1>
     </div>
    );
}


export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import './App.css';

// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import LocalPayments from './Pages/LocalPayments';
// import InternationalPayments from './Pages/InternationalPayments';

// const App = () => {
//   return (
//     <BrowserRouter> {/* Wrap the app with BrowserRouter */}
//       <div>
//         <h1>International Payments Portal</h1>

//         {/* Navigation links */}
//         <nav>
//           <ul>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//             <li>
//               <Link to="/local-payments">Local Payments</Link>
//             </li>
//             <li>
//               <Link to="/international-payments">International Payments</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Routing setup using Routes and element prop */}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/local-payments" element={<LocalPayments />} />
//           <Route path="/international-payments" element={<InternationalPayments />} />
          
//           {/* Default Route */}
//           <Route path="/" element={<h2>Welcome to the Portal</h2>} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
