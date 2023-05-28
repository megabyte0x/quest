import express from "express";
import axios from "axios";

const router = express.Router();

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

router.get("/getAllNFT", (_req, res) => {
  const body = _req.body;
  const address = body.address;
  const contractAddressIndex = body.contractAddressIndex;

  const options = {
    method: "GET",
    url: "https://polygon-mainnet.g.alchemy.com/nft/v3/docs-demo/getNFTsForOwner",
    params: {
      owner: address,
      contractAddress: contractAddresses[contractAddressIndex],
      withMetadata: "true",
      pageSize: "100",
    },
    headers: { accept: "application/json" },
  };

  axios
    .request(options)
    .then(function (response) {
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
        res.status(200).json({ data: null });
      }
    })
    .catch(function (error) {
      console.error("Error in /fetchTokenId:", error);
    });
  res.status(200).json("This is getAllNFT route");
});

export default router;
