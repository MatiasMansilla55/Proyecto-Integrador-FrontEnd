import React from "react";
import "../App.css";
import AdminTable from "../components/AdminTable";
import NavAdmin from "../components/NavAdmin";

const AdminPage = () => {
    return (
      <>
      <NavAdmin />
      <div className="container mt-3 mb-4">
        <h1 className="text-center d-flex d-lg-none">Panel bloqueado para celular o tablet</h1>
        <AdminTable />
      </div>
      </>
    );
};

export default AdminPage;
