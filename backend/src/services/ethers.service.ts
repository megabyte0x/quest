import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_IDS } from "../config/contract";
import {
  ACCOUNT_FUNCTION_SIGNATURE,
  BALANCE_OF_FUNCTION_SIGNATURE,
} from "../config/signature";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com"
);

const salt = ethers.utils.parseUnits("0", "ether");
const chainId = ethers.utils.parseUnits("80001", "ether");
const initData = "0x8129fc1c";

const createAccountFunctionSelector = ethers.utils
  .id("createAccount")
  .slice(0, 10);

const safeBatchTransferFromFunctionSelector = ethers.utils
  .id("safeBatchTransferFrom")
  .slice(0, 10);

export const getAccTransactionData = async (tokenId: string) => {
  try {
    const tokenIdAsBigInt = ethers.utils.parseUnits(tokenId, "ether");
    const params = [
      CONTRACT_ADDRESSES[3],
      chainId,
      CONTRACT_ADDRESSES[2],
      tokenIdAsBigInt,
      salt,
      initData,
    ];

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "address", "uint256", "uint256", "bytes"],
      params
    );

    const data = createAccountFunctionSelector + encodedParams.slice(2);

    const transactionGasPrice = await provider.estimateGas({
      to: CONTRACT_ADDRESSES[0],
      data: data,
    });

    const transactionData = {
      to: CONTRACT_ADDRESSES[2],
      data: data,
      gasLimit: ethers.utils.formatEther(transactionGasPrice),
      // you might need to adjust this value
    };
    return transactionData;
  } catch (error) {
    throw error;
  }
};

export const getTransactionLink = async (txnData: any) => {
  try {
    const tx = await provider.sendTransaction(txnData);
    const receipt = await tx.wait();
    const link = `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`;
    return link;
  } catch (error) {
    throw error;
  }
};

export const getAssetTransactionData = async (
  address: string,
  tkbAddress: string
) => {
  const tokenBalance: any = [];

  try {
    const contractWithBalanceOfInstance = new ethers.Contract(
      CONTRACT_ADDRESSES[0],
      BALANCE_OF_FUNCTION_SIGNATURE,
      provider
    );
    TOKEN_IDS.map(async (tokenId) => {
      const balance = await contractWithBalanceOfInstance.balanceOf(
        address,
        tokenId
      );
      tokenBalance.push(balance);
    });

    const params = [address, tkbAddress, TOKEN_IDS, tokenBalance, "0x00"];

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "uint256[]", "uint256[]", "bytes"],
      params
    );

    const data = safeBatchTransferFromFunctionSelector + encodedParams.slice(2);

    const transactionGasPrice = await provider.estimateGas({
      to: CONTRACT_ADDRESSES[0],
      data: data,
    });

    const transactionData = {
      to: CONTRACT_ADDRESSES[0],
      data: data,
      gasLimit: ethers.utils.formatEther(transactionGasPrice), // you might need to adjust this value
    };

    return transactionData;
  } catch (error) {
    throw error;
  }
};

export const getAccountAddress = async (tokenId: string) => {
  const tokenIdAsBigInt = ethers.utils.parseUnits(tokenId, "ether");

  try {
    const contractWithAccountInstance = new ethers.Contract(
      CONTRACT_ADDRESSES[2],
      ACCOUNT_FUNCTION_SIGNATURE,
      provider
    );
    const accountAddress = await contractWithAccountInstance.account(
      CONTRACT_ADDRESSES[3],
      chainId,
      CONTRACT_ADDRESSES[1],
      tokenIdAsBigInt,
      salt
    );
    return accountAddress;
  } catch (error) {
    throw error;
  }
};
