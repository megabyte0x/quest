import express from "express";
import adminRoutes from "./admin.route";
import mintRoutes from "./mint.route";
import fetchAccountRoutes from "./fetchAccount.route";
import fetchTokenIdRoutes from "./fetchTokenId.route";
import getAllNFTRoutes from "./getAllNFT.route";
import safeBatchTransferFromTxnRoutes from "./safeBatchTransferFromTxn.route";
import transferAssetsTxnDataRoutes from "./transferAssetsTxnData.route";
// import uploadImageRoutes from "./uploadImage.route";

const router = express.Router();

router.get("/", (_, res) => res.status(200).send("Healthy"));

router.use("/admin", adminRoutes);
router.get("/mint", mintRoutes);
router.get("/fetchTokenId", fetchTokenIdRoutes);
router.get("/fetchAccount", fetchAccountRoutes);
router.get("/getAllNFT", getAllNFTRoutes);
router.get("/safeBatchTransferFromTxn", safeBatchTransferFromTxnRoutes);
router.get("/transferAssetsTxnData", transferAssetsTxnDataRoutes);
// router.get("/uploadImage", uploadImageRoutes);

export default router;
