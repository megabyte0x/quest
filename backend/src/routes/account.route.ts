import express from "express"
import { getBatchTransferFromTxn, getCreateAccTxn, getCreateAccTxnData, getFetchAccount, getTransferAssetTxnData } from "../controllers/account.controller";

const router = express.Router()

router.get('/', (_req, res) => {
    res.status(200).json("This is nft route")
})

router.get("/createAccountTxnData", getCreateAccTxnData);

router.get("/createAccountTxn", getCreateAccTxn);

router.get("/transferAssetsTxnData", getTransferAssetTxnData);

router.get("/fetchAccount", getFetchAccount)

router.get("/safeBatchTransferFromTxn", getBatchTransferFromTxn)


export default router