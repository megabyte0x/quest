import express from "express"
import { getAllNFT, getArtHistory, getGenerateArt, getMint, getTokenId, getUploadImage } from "../controllers/nft.controller";

const router = express.Router()

router.get('/', (_req, res) => {
    res.status(200).json("This is nft route")
})

router.get("/artHistory", getArtHistory);

router.get('/fetchTokenId', getTokenId)

router.get('/generateArt', getGenerateArt)

router.get('/getAllNFT', getAllNFT)

router.get('/mint', getMint)

router.get('/uploadImage', getUploadImage)

export default router