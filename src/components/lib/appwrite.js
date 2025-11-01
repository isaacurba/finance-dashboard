import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6905e06e000252c40d54");

export const account = new Account(client);
export const ID = ID;
