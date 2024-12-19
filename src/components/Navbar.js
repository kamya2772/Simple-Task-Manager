import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar" style={{ backgroundColor: "#F4D9D0" }}>
        <div className="container-fluid">
          <a href="/form" className="navbar-brand">
            Form
          </a>
          <a
            href="/display"
            className="navbar-brand"
            style={{ marginRight: "70%" }}
          >
            Display
          </a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
