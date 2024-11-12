import {  Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";


const AppLayout = () => {
 
  return (
    <>
      <NavBar />
      <CartDrawer/>
      <Outlet />
    </>
  );
};
export default AppLayout;
