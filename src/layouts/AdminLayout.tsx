import React, { ReactNode } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

export type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default AdminLayout;
