// pages/api/signup.js
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email,password, "both are here")
     console.log(req.body, "data is here")
     console.log("Request Method:", req.method); // Should log "POST"

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
      console.log(error, "error is printing")
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
