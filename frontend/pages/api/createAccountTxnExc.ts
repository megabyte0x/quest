export default async function handler(req: any, res: any) {
  const { txnData } = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5001/api/v1/account/executeTxn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txnData: txnData }),
      }
    );

    const data = await response.json();

    res.status(200).json(data.transactionData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while createAccountTxnExc" });
    console.error("Error in /createAccountTxnExc Frontend API:", error);
  }
}
