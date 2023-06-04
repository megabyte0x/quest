export default async function handler(req: any, res: any) {
  const { address, contractAddressIndex } = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const tokenIdResponse = await fetch(
      "http://localhost:5001/api/v1/nft/fetchTokenId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
          contractAddressIndex: contractAddressIndex,
        }),
      }
    );
    const data = await tokenIdResponse.json();
    const isMinted = data.alreadyMinted;
    const tokenId = data?.tokenId;

    res.status(200).json({ isMinted: isMinted, tokenId: tokenId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching tokenId" });
    console.error("Error in /fetchTokenId Frontend API:", error);
  }
}
