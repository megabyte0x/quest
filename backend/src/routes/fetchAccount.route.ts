import express from "express";
import { ethers } from "ethers";

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
const accountFunctionSignature = [
  {
    constant: true, // This is true if your function is a view or pure function
    name: "account",
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
      { name: "salt", type: "unit256" },
    ],
    outputs: [
      {
        name: "result",
        type: "address",
      },
    ],
  },
];

const contractWithAccountInstance = new ethers.Contract(
  contractAddresses[2],
  accountFunctionSignature,
  provider
);

const salt = 0;
router.get("/fetchAccount", async (_req, res) => {
  const body = _req.body;
  const tokenId = body.tokenId;

  try {
    const accountAddress = await contractWithAccountInstance.account(
      contractAddresses[3],
      80001,
      contractAddresses[1],
      tokenId,
      salt
    );

    res.status(200).json({ tkbAddress: accountAddress });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
