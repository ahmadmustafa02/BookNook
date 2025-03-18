import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen pt-10"> {/* Add padding-top to clear Navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;