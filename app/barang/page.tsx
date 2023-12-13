"use client";

import React, { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import axiosInstance from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface Barang {
  NamaBarang: string;
  Deskripsi: string;
}

export default function BarangPage() {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const token = useSelector((state: RootState) => state.auth.dataLogin?.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosInstance.get("/barang", headers);
        setBarangList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <h1 className={title()}>Barang List</h1>
      <div className="cards grid grid-cols-5 mt-5 gap-5">
        {barangList.map((barang, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={barang.NamaBarang}
                className="w-full object-cover h-[140px]"
                src={barang.NamaBarang}
              />
            </CardBody>
            <CardFooter className="text-small flex flex-col">
              <b>{barang.NamaBarang}</b>
              <p className="text-default-500">{barang.Deskripsi}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
