import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { CONTRACT_ADDRESSES } from "../config/contract";
import * as dotenv from "dotenv";
dotenv.config();

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY as string,
  "mumbai"
);

export const mint = async (walletAddress: string, metadata: any) => {
  try {
    const contract = await sdk.getContract(CONTRACT_ADDRESSES[1]);

    const tx = await contract.erc721.mintTo(walletAddress, metadata);

    return tx.receipt.transactionHash;
  } catch (error) {
    throw error;
  }
};
