import express from "express";
import { ethers } from "ethers";

const router = express.Router();
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.mumbai.polygon.vision/"
);

router.get("/safeBatchTransferFromTxn", async (_req, res) => {
  const body = _req.body;
  const txnData = body.txnData;

  try {
    await provider.sendTransaction(txnData).then((tx) => {
      tx.wait().then((receipt) => {
        const link = `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`;
        res.status(200).json({ txnLink: link });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  } finally {
    console.log("safeBatchTransferFromTxn route called");
  }
});

export default router;
