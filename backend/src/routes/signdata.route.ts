import { TypedEthereumSigner } from "arbundles";
import express from "express";

const router = express.Router();
const key = process.env.PRIVATE_KEY; // your private key
if (!key) throw new Error("Private key is undefined!");
const signer = new TypedEthereumSigner(key);

/**
 *
 * @returns A signed version of the data, signatureData, as sent by the client.
 */
router.post("/signdata", async (req, res) => {
  const body = JSON.parse(req.body);
  const signatureData = Buffer.from(body.signatureData, "hex");
  try {
    const sign = Buffer.from(await signer.sign(signatureData));

    res.status(200).json({ signature: sign.toString("hex") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    console.log("Signature sent");
  }
});
