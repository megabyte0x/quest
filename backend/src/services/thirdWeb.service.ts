import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import * as dotenv from "dotenv";
dotenv.config();

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY as string,
  "mumbai"
);

export const mint = async (walletAddress: string, metadata: any) => {
  try {
    const contract = await sdk.getContract(
      "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5"
    );

    const tx = await contract.erc721.mintTo(walletAddress, metadata);

    return tx.receipt.transactionHash;
  } catch (error) {
    throw error;
  }
};
