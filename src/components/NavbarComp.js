import React from "react";

function NavbarComp() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div class="container">
       
        <div class="navbar-brand">The Abstract Collective</div>

        
        <div class="ms-auto d-flex align-items-center">
        
          <div class="dropdown me-2">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="signupDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sign Up
            </button>
            <ul class="dropdown-menu" aria-labelledby="signupDropdown">
              <li>
                <a class="dropdown-item" href="#">As Vendor</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">As Customer</a>
              </li>
            </ul>
          </div>

        
          <button class="btn btn-success">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;


