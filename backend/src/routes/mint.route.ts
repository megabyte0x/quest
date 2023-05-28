import express from "express";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const router = express.Router();
const sdk = new ThirdwebSDK("mumbai");

router.get("/mint", async (_req, res) => {
  const body = _req.body;
  const walletAddress = body.address;
  const imageURI = body.imageURI;
  const metadata = {
    name: "Quest NFT",
    description: "This is The Quest by Polygon Developer Advocates",
    image: imageURI, // This can be an image url or file
  };

  try {
    const contract = await sdk.getContract(
      "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5"
    );

    const tx = await contract.erc721.mintTo(walletAddress, metadata);
    const receipt = tx.receipt;

    //* For Later Use cases
    // const tokenId = tx.id; // the id of the NFT minted
    // const nft = await tx.data(); // (optional) fetch details of minted NFT

    res.status(200).json({ receipt });
  } catch (error) {
    console.error("Error in /mint:", error);
  } finally {
    console.log("Minting Complete");
  }
});

export default router;
