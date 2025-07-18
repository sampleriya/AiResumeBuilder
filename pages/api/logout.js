// pages/api/logout.js
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      await signOut(auth);
      res.status(200).json({ message: "User signed out" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
