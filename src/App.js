import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavbarComp from "./components/NavbarComp";
import CarouselComp from "./components/CarouselComp";
import ProductsGrid from "./components/ProductsCards";
import FooterComp from "./components/FooterComp";
import VendorRegistration from "./Registration/VendorRegistration";
import CustomerRegistration from "./Registration/CustomerRegistration";
import Login from "./Registration/VendorLogin"; // Vendor Login
import CustomerLogin from "./Registration/CustomerLogin";   // ✅ Added
import VendorDashboard from "./Dashboards/VendorDashboard";
import CustomerDashboard from "./Dashboards/CustomerDashboard"; // ✅ Added

// Wrapper to handle conditional navbar rendering
function Layout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/vendor-dashboard" ||
    location.pathname === "/customer-dashboard"; // ✅ hide navbar for both dashboards

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

        {/* Customer Registration */}
        <Route path="/customer-registration" element={<CustomerRegistration />} />

        {/* Vendor Login */}
        <Route path="/login" element={<Login />} />

        {/* Customer Login ✅ */}
        <Route path="/customer-login" element={<CustomerLogin />} />

        {/* Vendor Dashboard */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

        {/* Customer Dashboard ✅ */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2 className="text-center mt-5">Page Not Found</h2>} />
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
