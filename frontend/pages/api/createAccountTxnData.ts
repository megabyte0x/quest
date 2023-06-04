export default async function handler(req: any, res: any) {
  const { tokenId } = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5001/api/v1/account/createAccountTxnData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId: tokenId }),
      }
    );

    const data = await response.json();
    const txnData = data.transactionData;
    const contractAddress = data.to;

    res
      .status(200)
      .json({ txnData: txnData, contractAddress: contractAddress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while createAccoutnTxnData" });
    console.error("Error in /fetchAccount Frontend API:", error);
  }
}
