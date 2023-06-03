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

router.get("/createAccountTxnData", getCreateAccTxnData);

router.get("/executeTxn", getExecuteTxn);

router.get("/transferAssetsTxnData", getTransferAssetTxnData);

router.post("/fetchAccount", getFetchAccount);

export default router;
