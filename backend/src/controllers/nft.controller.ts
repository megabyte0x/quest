import { NextFunction, Request, Response } from "express";
import { asyncWrap } from "../middlewares/async.middleware";
import { throwError } from "../helpers/errorHandler.helper";
import { macthTokenId } from "../helpers/nft.helper";
import axios from "axios";
import { CONTRACT_ADDRESSES } from "../config/contract";
import { mint } from "../services/thirdWeb.service";
import { uploadImg } from "../services/bundler.service";
import { getTokenIdResponseData } from "../services/alchemy.service";

export const getArtHistory = asyncWrap(
  // @ts-ignore
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.status(200).json({ message: "OK" });
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getTokenId = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const body = req.body;
      const address = body.address;
      const contractAddressIndex = body.contractAddressIndex;

      const responseData = await getTokenIdResponseData(
        address,
        contractAddressIndex
      );
      if (responseData.ownedNfts.length > 0) {
        //Polygon Quest NFTs check
        if (contractAddressIndex === 0) {
          responseData.ownedNfts.forEach((nft: any) => {
            if (macthTokenId(nft.tokenId)) {
              res.status(200).json({
                alreadyMinted: true,
                tokenId: nft.tokenId,
              });
            } else {
              res.status(200).json({ alreadyMinted: false });
            }
          });
        } else {
          //Thirdweb NFT check
          res.status(200).json({
            alreadyMinted: true,
            tokenId: responseData.ownedNfts[0].tokenId,
          });
        }
      } else {
        res.status(200).json({ alreadyMinted: false });
      }
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getGenerateArt = asyncWrap(
  // @ts-ignore
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.status(200).json("This is generateArt route");
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getAllNFT = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const body = req.body;
      const address = body.address;
      const contractAddressIndex = body.contractAddressIndex;

      const options = {
        method: "GET",
        url: `https://polygon-mainnet.g.alchemy.com/nft/v3/${process.env.ALCHMEY_KEY}/getNFTsForOwner`,
        params: {
          owner: address,
          contractAddress: CONTRACT_ADDRESSES[contractAddressIndex],
          withMetadata: "true",
          pageSize: "100",
        },
        headers: { accept: "application/json" },
      };

      const response = await axios.request(options);
      if (response.data.ownedNfts.length > 0) {
        if (contractAddressIndex === 0) {
          // sending all the NFTs token id and image uri in a json format

          const data = response.data.ownedNfts.map((nft: any) => {
            if (macthTokenId(nft.tokenId)) {
              return {
                tokenId: nft.tokenId,
                imageURI: nft.image.pngUrl,
              };
            } else {
              return {};
            }
          });
          res.status(200).json({ data });
        } else {
          const data = response.data.ownedNfts.map((nft: any) => {
            if (macthTokenId(nft.tokenId)) {
              return {
                tokenId: nft.tokenId,
                imageURI: nft.image.pngUrl,
              };
            } else {
              return {};
            }
          });
          res.status(200).json({ data });
        }
      } else {
        res.status(500).json({ data: null });
      }
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getMint = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const body = req.body;
      const walletAddress = body.address;
      const imageURI = body.imageURI;
      const metadata = {
        name: "Quest NFT",
        description: "This is Thirdweb by Polygon Developer Advocates",
        image: imageURI, // This can be an image url or file
      };
      const txnHash = await mint(walletAddress, metadata);

      //* For Later Use cases
      // const tokenId = tx.id; // the id of the NFT minted
      // const nft = await tx.data(); // (optional) fetch details of minted NFT

      res.status(200).json({ txnHash });
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getUploadImage = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    const fileToUpload = body.fileToUpload;
    const fileType = body.fileType;

    try {
      const { id } = await uploadImg(fileToUpload, fileType);

      res.status(200).json({ txLink: `https://arweave.net/${id}` });
    } catch (error) {
      throwError(500, error);
    }
  }
);
