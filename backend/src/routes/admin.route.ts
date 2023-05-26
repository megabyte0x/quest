import express from "express"

const router = express.Router()

router.get('/', (_req, res) => {
    // res.cookie("bleh", "ayush", {
    //     httpOnly: true
    // })
    res.status(200).json("This is admin route")
})


export default router