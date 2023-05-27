import express from "express";

const router = express.Router();

router.get("/getAllNFT", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is getAllNFT route");
});

export default router;
