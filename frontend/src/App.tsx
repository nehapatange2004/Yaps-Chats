// // import { useState, useEffect } from "react";
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import { Button } from "@mui/material";
// import Home from "./components/home.tsx";
// import Dashboard from "./components/dashboard";
// import { auth } from "./wrapper/authWrapper.tsx";
// import "./App.css";
// import { createBrowserRouter } from "react-router";
// import Calculator from "./Calculator.tsx";


// function App() {
//   // const route = createBrowserRouter(
//     [
//       {
//         path: "/",
//         element: <Home />
//       },
//       {
//         path: "/register",
//         element: < Register/>
//       },
//       {
//         path: "/dashboard",
//         element: <Dashboard />
//       },
//       {
//         path: "/home/calulator",
//         element: <Calculator/>
//       }
//     ]
//   )
//   const { isUserLoggedIn,setIsUserLoggedIn, openForm, setOpenForm } = auth();
//   return (
//     <>
//       <Button
//         size="small"
//         color="info"
//         variant="outlined"
//         onClick={() => {
//           !isUserLoggedIn ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
//         }}
//       >
//         isUserLoggedIn: {String(isUserLoggedIn)}
//       </Button>
//       <br />
//       <Button
//         size="small"
//         color="info"
//         variant="outlined"
//         onClick={() => {
//           !openForm ? setOpenForm(true) : setOpenForm(false);
//         }}
//       >
//         openForm: {String(openForm)}
//       </Button>

     
//     </>
//   );
// }

// export default App;
