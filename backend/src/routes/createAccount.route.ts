import express from "express";

const router = express.Router();

router.get("/createAccount", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is create account route");
});

export default router;
