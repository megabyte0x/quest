import express from "express";

const router = express.Router();

router.get("/mint", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is mint route");
});

export default router;
