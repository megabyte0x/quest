import express from "express";

const router = express.Router();

router.get("/uploadImage", (_req, res) => {
  // res.cookie("bleh", "ayush", {
  //     httpOnly: true
  // })
  res.status(200).json("This is uploadImage route");
});

export default router;