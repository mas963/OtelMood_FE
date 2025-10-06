'use client';

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const RoomPage = () => {
  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        toast.current?.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        toast.current?.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
      }
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {
        window.location.href = 'https://reactjs.org/';
      }
    },
    {
      label: 'Upload',
      icon: 'pi pi-upload',
      command: () => {
        //router.push('/fileupload');
      }
    }
  ];

  const save = () => {
    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
  };


  return (
    <>
      <Toast ref={toast}></Toast>
      <Card title="Room Rack">
        <Fieldset legend="1. Kat" className="mb-3">
          <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-3">

            <div className="grid content-between p-2 bg-gray-100 text-center rounded-xl shadow cursor-default hover:bg-gray-200 hover:text-gray-50">
              <div>
                <span className="font-bold text-3xl">101</span>
                <p>Aile</p>
              </div>
              <Button className="h-[50px]" label="Yeni Giriş" text />
            </div>

            <div className="grid content-between p-2 bg-green-200 text-center rounded-xl shadow cursor-default hover:bg-green-300 hover:text-gray-50">
              <div>
                <span className="font-bold text-3xl">102</span>
                <p>Aile</p>
              </div>

              <div className="flex justify-between">
                <p><i className="pi pi-calendar mr-2"></i>Suat Can</p>
                <p className="font-bold">1 / 2</p>
              </div>
              <SplitButton className="h-[50px]" label="Detay" onClick={save} model={items} text />
            </div>

          </div>
        </Fieldset>
      </Card>
    </>
  )
};

export default RoomPage