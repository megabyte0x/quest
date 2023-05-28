import express from "express";

const router = express.Router();

router.get("/artHistory", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is artHistory route");
});

export default router;
