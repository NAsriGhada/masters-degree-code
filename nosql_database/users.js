// users.js
import { ObjectId } from "mongodb";

export const userExample = {
  _id: new ObjectId(),

  email: "user@mail.com", // unique
  passwordHash: "...",
  name: "Ghada",
  phone: "+47...",

  addresses: [
    {
      _id: new ObjectId(),
      label: "Home",
      line1: "...",
      city: "...",
      zip: "...",
      country: "NO",
      isDefault: true,
    },
  ],

  createdAt: new Date(),
  updatedAt: new Date(),
};
