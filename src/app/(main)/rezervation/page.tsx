'use client';

import { RezervationService } from "@/services/RezervationService";
import { Rezervation } from "@/types/rezervation";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

const RezervationPage = () => {
  const [rezervations, setRezervations] = useState<Rezervation[]>([]);

  useEffect(() => {
    const data = RezervationService.getRezervations();
    setRezervations(data);
  }, []);

  return (
    <>
      <Card title="Rezervasyonlar">
        <DataTable value={rezervations} tableStyle={{ minWidth: '50rem' }}>
          <Column field="roomNo" header="Oda No"></Column>
          <Column field="agent" header="Acenta"></Column>
          <Column field="customerName" header="Misafir Adı"></Column>
          <Column field="arrival" header="Giriş"></Column>
          <Column field="departure" header="Çıkış"></Column>
          <Column field="roomType" header="Oda Tipi"></Column>
          <Column field="rezervationId" header="Rez Id"></Column>
        </DataTable>
      </Card>
    </>
  )
};

export default RezervationPage