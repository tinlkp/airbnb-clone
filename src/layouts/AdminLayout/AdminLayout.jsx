import React from "react";
import { Outlet } from "react-router-dom";
import Siderbar from "../../components/Siderbar/Siderbar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Siderbar />
      <Outlet />
    </div>
  );
}
