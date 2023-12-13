// admin/page.tsx
import React, { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import RootLayout from "../layout";
import axiosInstance from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import AdminLayout from "./layout";

export default function AdminPages() {
  return (
    <AdminLayout isAdmin={true}>
      <div className="w-full">
        <h1 className={title()}>Admin Page</h1>
      </div>
    </AdminLayout>
  );
}
