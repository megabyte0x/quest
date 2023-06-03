export default async function handler(req: any, res: any) {
  const { address, imageURI } = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/api/v1/nft/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, imageURI }),
    });
    const data = await response.json();
    const txLink = `https://mumbai.polygonscan.com/tx/${data.receipt}`;
    console.log(txLink);
    res.status(200).json(txLink);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while miniting" });
    console.error("Error in /mint:", error);
  }
}
