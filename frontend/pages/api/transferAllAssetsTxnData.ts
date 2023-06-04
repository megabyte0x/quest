export default async function handler(req: any, res: any) {
  const { address } = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5001/api/v1/account/transferAssetsTxnData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address }),
      }
    );

    const data = await response.json();
    const tkbAddress = data.to;
    const tokenIds = data.data.tokenId;
    const tokenBalance = data.data.tokenBalance;
    res.status(200).json({
      tokenIds: tokenIds,
      tokenBalances: tokenBalance,
      to: tkbAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while transferring all assets" });
    console.error("Error in /transferAllAssetsTxnData Frontend API:", error);
  }
}
