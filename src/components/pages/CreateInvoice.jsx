import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createInvoice } from "../lib/invoiceService"; // ✅ use your service

const CreateInvoice = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [loading, setLoading] = useState(false); // ✅ for loading state

  // Auto-generated invoice ID
  const [invoiceID, setInvoiceID] = useState(() => {
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `INV${datePart}${randomPart}`;
  });

  // Form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().slice(0, 10);
  });
  const [vat, setVat] = useState("0");

  // Items
  const [items, setItems] = useState([
    { id: Date.now(), name: "", orderType: "", rate: "", amount: "" },
  ]);

  // Totals
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );
  const vatAmount = (subtotal * Number(vat || 0)) / 100;
  const total = subtotal + vatAmount;

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", orderType: "", rate: "", amount: "" },
    ]);
  };

  // Remove item
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Update item field
  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        // Create updated item
        const updatedItem = { ...item, [field]: value };
        
        // Calculate amount based on rate and orderType
        if (field === "rate" || field === "orderType") {
          const rateValue = field === "rate" ? parseFloat(value) || 0 : parseFloat(updatedItem.rate) || 0;
          
          // Map orderType to numeric multiplier
          let multiplier = 1;
          switch (updatedItem.orderType) {
            case "10":
              multiplier = 1; // Standard
              break;
            case "15":
              multiplier = 1.5; // Express
              break;
            case "20":
              multiplier = 2; // Priority
              break;
            default:
              multiplier = 1;
          }
          
          updatedItem.amount = (rateValue * multiplier).toString();
        }
        
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  // ✅ Handle Create Invoice
  const handleCreateInvoice = async () => {
    try {
      if (!clientName || !clientEmail) {
        toast.error("Please fill in client details before saving");
        return;
      }

      // Validate items
      for (const item of items) {
        if (!item.name || !item.orderType || !item.rate || !item.amount) {
          toast.error("Please fill in all item details before saving");
          return;
        }
      }

      setLoading(true);

      // Transform items to include readable orderType
      const transformedItems = items.map(item => {
        let orderTypeName = "";
        switch (item.orderType) {
          case "10":
            orderTypeName = "Standard";
            break;
          case "15":
            orderTypeName = "Express";
            break;
          case "20":
            orderTypeName = "Priority";
            break;
          default:
            orderTypeName = item.orderType;
        }
        
        return {
          ...item,
          orderTypeName
        };
      });

      const invoiceData = {
        invoiceID,
        clientName,
        clientEmail,
        invoiceDate,
        dueDate,
        items: transformedItems,
        subtotal,
        vat: Number(vat),
        vatAmount,
        total,
        status: "Unpaid",
        createdAt: new Date().toISOString(),
      };

      // ✅ Save to Appwrite
      const res = await createInvoice(invoiceData);

      if (res) {
        toast.success("✅ Invoice created successfully!");

        // Reset form
        setInvoiceID(
          `INV${new Date()
            .toISOString()
            .slice(2, 10)
            .replace(/-/g, "")}${Math.floor(1000 + Math.random() * 9000)}`
        );
        setClientName("");
        setClientEmail("");
        setInvoiceDate(new Date().toISOString().slice(0, 10));
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setDueDate(nextWeek.toISOString().slice(0, 10));
        setVat("0");
        setItems([{ id: Date.now(), name: "", orderType: "", rate: "", amount: "" }]);
      }
    } catch (err) {
      console.error("Error creating invoice:", err);
      toast.error("❌ Failed to create invoice. Please check Appwrite IDs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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
                    <div className="flex item-center gap-2 items-center">
                      <img src="/assets/maglo.png" alt="logo" className="h-11" />
                      <div>
                        <h2 className="text-lg font-semibold">Maglo</h2>
                        <p className="text-sm text-gray-300">sales@maglo.com</p>
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
                      <h3 className="font-medium text-gray-700">Invoice Number</h3>
                      <p className="text-sm text-gray-500">{invoiceID}</p>
                      <div className="flex gap-4 mt-2">
                        <div>
                          <label className="text-xs text-gray-600">Issued</label>
                          <p className="text-sm text-gray-500">
                            {new Date(invoiceDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">Due</label>
                          <p className="text-sm text-gray-500">
                            {new Date(dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">Billed To</h3>
                      <Input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Client name"
                        className="mt-1 mb-1"
                      />
                      <Input
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Client email"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ITEM DETAILS TABLE */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Item Details</CardTitle>
                  <Button
                    variant="outline"
                    className="text-[#C8EE44] flex items-center gap-2"
                    onClick={addItem}
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-5 text-sm font-medium text-gray-600 border-b pb-2">
                    <span>ITEM</span>
                    <span>ORDER/TYPE</span>
                    <span>RATE</span>
                    <span>AMOUNT</span>
                    <span>ACTION</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-5 gap-3 text-sm items-center"
                    >
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(item.id, "name", e.target.value)
                        }
                        placeholder="Item name"
                      />
                      <select
                        value={item.orderType}
                        onChange={(e) =>
                          handleItemChange(item.id, "orderType", e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="10">Standard</option>
                        <option value="15">Express</option>
                        <option value="20">Priority</option>
                      </select>
                      <Input
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(item.id, "rate", e.target.value)
                        }
                        type="number"
                        min="0"
                      />
                      <Input
                        value={item.amount}
                        readOnly
                        type="number"
                        min="0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="mt-6 border-t pt-3 text-right text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>₦{subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">VAT ({vat}%):</span>
                      <span>₦{vatAmount.toFixed(2)}</span>
                    </p>
                    <p className="font-semibold text-gray-900 flex justify-between mt-2">
                      <span>Total:</span>
                      <span>₦{total.toFixed(2)}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Invoice Date
                    </label>
                    <Input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      VAT (%)
                    </label>
                    <Input
                      type="number"
                      value={vat}
                      onChange={(e) => setVat(e.target.value)}
                      placeholder="VAT (%)"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={handleCreateInvoice}
                      disabled={loading}
                      className="w-full bg-[#C8EE44] text-gray-900 hover:bg-lime-300 py-6 text-lg flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Send Invoice"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT ({vat}%):</span>
                    <span>₦{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 pt-1 border-t">
                    <span>Total:</span>
                    <span>₦{total.toFixed(2)}</span>
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