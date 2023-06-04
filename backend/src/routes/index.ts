import express from "express";
import accountRoutes from "../routes/account.route";
import nftRoutes from "../routes/nft.route";

// import uploadImageRoutes from "./uploadImage.route";

const router = express.Router();

router.get("/", (_, res) => res.status(200).send("Healthy"));

router.use("/account", accountRoutes);
router.use("/nft", nftRoutes);

export default router;
