import express from "express";

const router = express.Router();

router.get("/generateArt", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is generateArt route");
});

export default router;
