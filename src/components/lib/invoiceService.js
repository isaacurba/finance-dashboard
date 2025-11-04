// src/lib/invoiceService.js
import { databases, ID } from "./appwrite";

// Replace with your own Appwrite Database & Collection IDs
export const DATABASE_ID = "690a3a8f002de096c86c";
export const COLLECTION_ID = "invoice";

export const createInvoice = async (data) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export const getInvoices = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};
