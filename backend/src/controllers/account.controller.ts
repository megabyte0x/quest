import { NextFunction, Request, Response } from "express";
import { asyncWrap } from "../middlewares/async.middleware";
import { throwError } from "../helpers/errorHandler.helper";
import {
  getAccTransactionData,
  getAccountAddress,
  getAssetTransactionData,
  getTransactionLink,
} from "../services/ethers.service";
import { getTokenIdResponseData } from "../services/alchemy.service";

export const getCreateAccTxnData = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    const tokenId = body.tokenId as string;

    try {
      const transactionData = await getAccTransactionData(tokenId);

      res.status(200).json({ transactionData });
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getExecuteTxn = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    const txnData = body.txnData;

    try {
      const txnLink = await getTransactionLink(txnData);

      res.status(200).json({ txnLink });
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getTransferAssetTxnData = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    const address = body.address;

    try {
      const thirdwebTokenData = await getTokenIdResponseData(address, 1);
      const thirdwebTokenId = thirdwebTokenData.ownedNfts[0].tokenId;

      const tkbAddress = await getAccountAddress(thirdwebTokenId);

      const transactionData = await getAssetTransactionData(
        address,
        tkbAddress
      );
      const data = {
        to: tkbAddress,
        data: transactionData,
      };
      res.status(200).json(data);
    } catch (error) {
      throwError(500, error);
    }
  }
);

export const getFetchAccount = asyncWrap(
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    const tokenId = body.tokenId as string;

    try {
      const accountAddress = await getAccountAddress(tokenId);

      res.status(200).json({ tkbAddress: accountAddress });
    } catch (error) {
      throwError(500, error);
    }
  }
);
