import express from "express";
import axios from "axios";

const router = express.Router();

// 0 => Polygon Quest NFTs
// 1 => THE QUEST NFT
const contractAddresses = [
  "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
  "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5",
];

function macthTokenId(tokenId: string) {
  if (
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535769934920679474" ||
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535773233455562802" ||
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535774332967190728" ||
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535772133943935026" ||
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535771034432307250" ||
    tokenId ===
      "8962398328008975812529484945300417553755890154116798226846535775432478818314"
  ) {
    return true;
  } else {
    return false;
  }
}

router.get("/fetchTokenId", (_req, res) => {
  const body = _req.body;
  const address = body.address;
  const contractAddressIndex = body.contractAddressIndex;

  const options = {
    method: "GET",
    url: "https://polygon-mainnet.g.alchemy.com/nft/v3/docs-demo/getNFTsForOwner",
    params: {
      owner: address,
      contractAddress: [contractAddresses[contractAddressIndex]],
      withMetadata: "false",
      pageSize: "100",
      excludeFilters: ["SPAM"],
    },
    headers: { accept: "application/json" },
  };
  // dev note: This will check whether the user have the NFT from the Polygon Quest NFTs (goku, naruto,..) or not, if then then it will return true. If the user have the NFT from THE QUEST NFT then it will return true and the tokenId of the NFT.
  axios
    .request(options)
    .then(function (response) {
      if (response.data.ownedNfts.length > 0) {
        //Polygon Quest NFTs check
        if (contractAddressIndex === 0) {
          response.data.ownedNfts.forEach((nft: any) => {
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
          //THE QUEST NFT check
          res.status(200).json({
            alreadyMinted: true,
            tokenId: response.data.ownedNfts[0].tokenId,
          });
        }
      } else {
        res.status(200).json({ alreadyMinted: false });
      }
    })
    .catch(function (error) {
      console.error("Error in /fetchTokenId:", error);
    });
});

export default router;
