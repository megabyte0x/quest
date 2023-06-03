import express from "express";
import {
  getExecuteTxn,
  getCreateAccTxnData,
  getFetchAccount,
  getTransferAssetTxnData,
} from "../controllers/account.controller";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json("This is nft route");
});

router.post("/createAccountTxnData", getCreateAccTxnData);

router.post("/executeTxn", getExecuteTxn);

router.post("/transferAssetsTxnData", getTransferAssetTxnData);

router.post("/fetchAccount", getFetchAccount);

export default router;
