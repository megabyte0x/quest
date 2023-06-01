import { NextFunction, Request, Response } from "express"
import { asyncWrap } from "../middlewares/async.middleware"
import { throwError } from "../helpers/errorHandler.helper"
import { getAccTransactionData, getAccountAddress, getAssetTransactionData, getTransactionLink } from "../services/ethers.service";
import axios from "axios";


export const getCreateAccTxnData = asyncWrap(async (req: Request, res: Response, _next: NextFunction) => {

    const body = req.body;
    const tokenId = body.tokenId as string;

    try {
        const transactionData = await getAccTransactionData(tokenId)

        res.status(200).json({ transactionData });
    } catch (error) {
        throwError(500, error)
    }
})

export const getCreateAccTxn = asyncWrap(async (req: Request, res: Response, _next: NextFunction) => {

    const body = req.body;
    const txnData = body.txnData;

    try {
        const txnLink = await getTransactionLink(txnData)

        res.status(200).json({ txnLink });
    } catch (error) {
        throwError(500, error)
    }
})

export const getTransferAssetTxnData = asyncWrap(async (req: Request, res: Response, _next: NextFunction) => {

    const body = req.body;
    const address = body.address;

    try {

        //  TODO MAKE A GENRIC FUNCTION RATHER THAN CALLING OWN SERVER
        const thirdwebTokenId = await axios.get(
            "http://localhost:5000/fetchTokenId",
            {
                params: {
                    address: address,
                    contractAddressIndex: 1,
                },
            }
        );

        const account = await axios.get("http://localhost:5000/fetchAccount", {
            params: {
                tokenId: thirdwebTokenId.data.tokenId,
            },
        });
        const tkbAddress = account.data.accountAddress;



        const transactionData = await getAssetTransactionData(address, tkbAddress)

        res.status(200).json({ transactionData });
    } catch (error) {
        throwError(500, error)
    }
})

export const getFetchAccount = asyncWrap(async (req: Request, res: Response, _next: NextFunction) => {

    const body = req.body;
    const tokenId = body.tokenId as string;

    try {
        const accountAddress = await getAccountAddress(tokenId)

        res.status(200).json({ tkbAddress: accountAddress });
    } catch (error) {
        throwError(500, error)
    }
})

export const getBatchTransferFromTxn = asyncWrap(async (req: Request, res: Response, _next: NextFunction) => {

    const body = req.body;
    const txnData = body.txnData;

    try {
        const txnLink = await getTransactionLink(txnData)

        res.status(200).json({ txnLink });

    } catch (error) {
        throwError(500, error)
    }
})