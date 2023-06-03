import express from "express"
import { getAllNFT, getArtHistory, getGenerateArt, getMint, getTokenId, getUploadImage } from "../controllers/nft.controller";

const router = express.Router()

router.get('/', (_req, res) => {
    res.status(200).json("This is nft route")
})

router.post("/artHistory", getArtHistory);

router.post('/fetchTokenId', getTokenId)

router.post('/generateArt', getGenerateArt)

router.post('/getAllNFT', getAllNFT)

router.post('/mint', getMint)

router.post('/uploadImage', getUploadImage)

export default router