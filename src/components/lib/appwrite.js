// src/lib/appwrite.js
import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6905e06e000252c40d54");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID }; 