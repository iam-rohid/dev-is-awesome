import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Sidebar from "@/components/Sidebar";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Newsletter />
      <Footer />
      <Sidebar />
    </>
  );
};

export default DefaultLayout;
