import express from "express";

const router = express.Router();

router.get("/fetchTokenId", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is fetchTokenId route");
});

export default router;
