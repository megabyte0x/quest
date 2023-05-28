import { TypedEthereumSigner } from "arbundles";
import express from "express";

const router = express.Router();
const key = process.env.PRIVATE_KEY; // your private key
if (!key) throw new Error("Private key is undefined!");
const signer = new TypedEthereumSigner(key);

/*
    @returns Server Private Key
*/
router.get("/publickey", async (_req, res) => {
  const publicKey = signer.publicKey;
  res.status(200).json({ pubKey: publicKey.toString("hex") });
});

export default router;
