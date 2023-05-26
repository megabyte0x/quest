import express from "express"
import validate from "../middlewares/validateResources"
import { addAwardRequestSchema } from "../schemas/prize.schema"
import { addAwardController } from "../controllers/admin.controller"

const router = express.Router()

router.get('/', (_req, res) => {
    // res.cookie("bleh", "ayush", {
    //     httpOnly: true
    // })
    res.status(200).json("This is admin route")
})

router.post('/add-award', validate(addAwardRequestSchema), addAwardController)

router.get('/profile')


export default router