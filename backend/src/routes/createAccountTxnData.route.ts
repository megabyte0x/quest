import { ethers } from "ethers";
import express from "express";

const router = express.Router();
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com"
);
// 0 => Polygon Quest NFTs
// 1 => Thirdweb NFT
// 2 => registry address
// 3 => implementation address
const contractAddresses = [
  "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
  "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5",
  "0x02101dfB77FDE026414827Fdc604ddAF224F0921",
  "0x2d25602551487c3f3354dd80d76d54383a243358",
];
const createAccountFunctionSignature = [
  {
    constant: true, // This is true if your function is a view or pure function
    name: "createAccount",
    type: "function",
    inputs: [
      {
        name: "implementation",
        type: "address",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "tokenContract",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
      {
        name: "salt",
        type: "unit256",
      },
      {
        name: "initData",
        type: "bytes",
      },
    ],
    outputs: [
      {
        name: "result",
        type: "address",
      },
    ],
  },
];

const contractWithCreateAccountInstance = new ethers.Contract(
  contractAddresses[2],
  createAccountFunctionSignature,
  provider
);

const createAccountFunctionName = "createAccount";
const createAccountFunctionSelector = ethers.utils
  .id(createAccountFunctionName)
  .slice(0, 10);

const chainId = "80001";
const salt = "0";
const initData = "0x8129fc1c";

router.get("/createAccountTxnData", async (_req, res) => {
  const body = _req.body;
  const tokenId = body.tokenId;

  try {
    const params = [
      contractAddresses[3],
      chainId,
      contractAddresses[2],
      tokenId,
      salt,
      initData,
    ];

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "address", "uint256", "uint256", "bytes"],
      params
    );

    const data = createAccountFunctionSelector + encodedParams.slice(2);

    const transactionGasPrice = await provider.estimateGas({
      to: contractAddresses[0],
      data: data,
    });

    const transactionData = {
      to: contractAddresses[2],
      data: data,
      gasLimit: ethers.utils.formatEther(transactionGasPrice),
      // you might need to adjust this value
    };

    res.status(200).json({ transactionData: transactionData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
