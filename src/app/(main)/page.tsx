'use client';

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductService } from "@/services/ProductService";

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Orders */}
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="block text-green-500 font-medium mb-1">Orders</span>
                            <div className="text-gray-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex items-center justify-center bg-blue-100 rounded-full w-10 h-10">
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-gray-500">since last visit</span>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="block text-gray-500 font-medium mb-3">Revenue</span>
                            <div className="text-gray-900 font-medium text-xl">$2.100</div>
                        </div>
                        <div className="flex items-center justify-center bg-orange-100 rounded-full w-10 h-10">
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-gray-500">since last week</span>
                </div>

                {/* Customers */}
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="block text-gray-500 font-medium mb-3">Customers</span>
                            <div className="text-gray-900 font-medium text-xl">28441</div>
                        </div>
                        <div className="flex items-center justify-center bg-cyan-100 rounded-full w-10 h-10">
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 </span>
                    <span className="text-gray-500">newly registered</span>
                </div>

                {/* Comments */}
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="block text-gray-500 font-medium mb-3">Comments</span>
                            <div className="text-gray-900 font-medium text-xl">152 Unread</div>
                        </div>
                        <div className="flex items-center justify-center bg-purple-100 rounded-full w-10 h-10">
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-gray-500">responded</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl shadow p-4">
                    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                </div>
            </div>
        </>
    );
};

export default Dashboard;
