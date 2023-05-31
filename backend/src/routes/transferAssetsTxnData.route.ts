import express from "express";
import { ethers } from "ethers";
import axios from "axios";

const router = express.Router();
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com"
);

// 0 => Polygon Quest NFTs
// 1 => Thirdweb NFT
const contractAddresses = [
  "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
  "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5",
];

const tokenIds = [
  "8962398328008975812529484945300417553755890154116798226846535769934920679474",
  "8962398328008975812529484945300417553755890154116798226846535773233455562802",
  "8962398328008975812529484945300417553755890154116798226846535774332967190728",
  "8962398328008975812529484945300417553755890154116798226846535772133943935026",
  "8962398328008975812529484945300417553755890154116798226846535771034432307250",
  "8962398328008975812529484945300417553755890154116798226846535775432478818314",
];

const balanceOfFunctionSignature = [
  {
    constant: true, // This is true if your function is a view or pure function
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "result",
        type: "uint256",
      },
    ],
  },
];

const contractWithBalanceOfInstance = new ethers.Contract(
  contractAddresses[0],
  balanceOfFunctionSignature,
  provider
);

const safeBatchTransferFromFunctionName = "safeBatchTransferFrom";
const safeBatchTransferFromFunctionSelector = ethers.utils
  .id(safeBatchTransferFromFunctionName)
  .slice(0, 10);

router.get("/transferAssetsTxnData", async (_req, res) => {
  const body = _req.body;
  const address = body.address;
  const tokenBalance: any = [];

  try {
    tokenIds.map(async (tokenId) => {
      const balance = await contractWithBalanceOfInstance.balanceOf(
        address,
        tokenId
      );
      tokenBalance.push(balance);
    });

    // Use the fetchTokenId route from the fetchTokenId.route.ts to get the tokenId of the Thirdweb NFT
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

    const params = [address, tkbAddress, tokenIds, tokenBalance, "0x00"];

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "uint256[]", "uint256[]", "bytes"],
      params
    );

    const data = safeBatchTransferFromFunctionSelector + encodedParams.slice(2);

    const transactionGasPrice = await provider.estimateGas({
      to: contractAddresses[0],
      data: data,
    });

    const transactionData = {
      to: contractAddresses[0],
      data: data,
      gasLimit: ethers.utils.formatEther(transactionGasPrice), // you might need to adjust this value
    };

    res.status(200).json({ txnData: transactionData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export default router;
