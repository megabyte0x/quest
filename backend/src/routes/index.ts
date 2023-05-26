import express from "express"
import adminRoutes from "./admin.route"

const router = express.Router()

router.get('/', (_, res) => res.status(200).send("Healthy"));


router.use('/admin', adminRoutes)


export default router