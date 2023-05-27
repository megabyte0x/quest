import express from "express";

const router = express.Router();

router.get("/fetchAccount", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is fetchAccount route");
});

export default router;
