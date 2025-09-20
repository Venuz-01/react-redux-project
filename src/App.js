import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavbarComp from "./components/NavbarComp";
import CarouselComp from "./components/CarouselComp";
import ProductsGrid from "./components/ProductsCards";
import FooterComp from "./components/FooterComp";
import VendorRegistration from "./Registration/VendorRegistration";
import Login from "./Registration/Login";
import VendorDashboard from "./Dashboards/VendorDashboard";

// Wrapper to handle conditional navbar rendering
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/vendor-dashboard";

  return (
    <>
      {!hideNavbar && <NavbarComp />}
      <Routes>
        {/* Main Website */}
        <Route
          path="/"
          element={
            <>
              <CarouselComp />
              <ProductsGrid />
              <FooterComp />
            </>
          }
        />

        {/* Vendor Registration */}
        <Route path="/vendor-registration" element={<VendorRegistration />} />

        {/* Vendor Login */}
        <Route path="/login" element={<Login />} />

        {/* Vendor Dashboard */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
