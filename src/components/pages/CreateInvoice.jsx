import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Plus } from "lucide-react";

const CreateInvoice = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Example Invoice ID
  const invoiceID = "MGL524874";

  // Fake invoice data for now
  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro Max",
      orderType: "01",
      rate: 244,
      amount: 244.0,
    },
    {
      id: 2,
      name: "Netflix Subscription",
      orderType: "01",
      rate: 420,
      amount: 420.0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", orderType: "", rate: 0, amount: 0 },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} invoiceID={invoiceID} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gray-900 text-white rounded-lg p-4 flex justify-between">
                    <div className="flex flex-col">
                      <div className="flex item-center gap-2 items-center">
                        <img
                          src="/assets/maglo.png"
                          alt="logo"
                          className="h-11"
                        />
                        <div>
                          <h2 className="text-lg font-semibold">Maglo</h2>
                          <p className="text-sm text-gray-300">
                            sales@maglo.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm">1333 Grey Fox Farm Road,</p>
                      <p className="text-sm">Houston, TX 77056</p>
                      <p className="text-sm">
                        Bloomfield Hills, Michigan(MI), 48301
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <div>
                      <h3 className="font-medium text-gray-700">
                        Invoice Number
                      </h3>
                      <p className="text-sm text-gray-500">{invoiceID}</p>
                      <p className="text-xs text-gray-400">
                        Issued: 10 Apr 2022 <br />
                        Due: 20 Apr 2022
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">Billed To</h3>
                      <p className="text-sm text-gray-500">Sajib Rahman</p>
                      <p className="text-xs text-gray-400">
                        3471 Rainy Day Drive,
                      </p>
                      <p className="text-xs text-gray-400">Needham, MA 02192</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ITEM DETAILS TABLE */}
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-4 text-sm font-medium text-gray-600 border-b pb-2">
                    <span>ITEM</span>
                    <span>ORDER/TYPE</span>
                    <span>RATE</span>
                    <span>AMOUNT</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 gap-3 text-sm"
                    >
                      <Input value={item.name} placeholder="Item name" />
                      <Input value={item.orderType} placeholder="Type" />
                      <Input value={item.rate} type="number" />
                      <Input value={item.amount} type="number" />
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    className="text-[#C8EE44] flex items-center gap-2 mt-2"
                    onClick={addItem}
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>

                  {/* Subtotal Section */}
                  <div className="mt-4 border-t pt-3 text-right text-sm">
                    <p>Subtotal: ₦664.00</p>
                    <p>Discount: ₦0.00</p>
                    <p>Tax: ₦0.00</p>
                    <p className="font-semibold text-gray-900">
                      Total: ₦664.00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* Client Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/invoice1.png"
                      alt="Client"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">Sajib Rahman</p>
                      <p className="text-xs text-gray-500">
                        rahman.sajib@uihut.com
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    UIHUT Agency LTD <br /> 3471 Rainy Day Drive, Tulsa, USA
                  </p>
                  <Button className="w-full text-sm text-[#29A073] bg-[#EEFEF2] hover:bg-[#E5F7F0]">
                    Add Customer
                  </Button>
                </CardContent>
              </Card>

              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">
                      Invoice Date
                    </label>
                    <div className="relative">
                      <Input type="date" className="pr-8" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Due Date</label>
                    <div className="relative">
                      <Input type="date" className="pr-8" />
                    </div>
                  </div>

                  <Button className="w-full bg-[#C8EE44] text-gray-900 hover:bg-lime-300">
                    Send Invoice
                  </Button>

                  <div className="flex justify-between">
                    <Button className="text-sm bg-[#F8F8F8] text-[#29A073] hover:bg-[#F8F8F8]">
                      <img src="/assets/Download.png" alt="download icon" />
                      Preview
                    </Button>
                    <Button className="text-sm bg-[#F8F8F8] text-[#29A073] hover:bg-[#F8F8F8]">
                      <img src="/assets/Eye.png" alt="eye icon" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateInvoice;
