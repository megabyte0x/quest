import express from "express";

const router = express.Router();

router.get("/executeCall", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is Execute call route");
});

export default router;
