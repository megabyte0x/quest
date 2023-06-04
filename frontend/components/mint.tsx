import React, { useState } from "react";
import { useAccount } from "wagmi";

export default function Mint() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txnLink, setTxnLink] = useState("");

  const { address } = useAccount();

  const handleMint = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          imageURI:
            "ipfs://Qma6TgUxvjRR7p3xRoUPhiVq1FQMjBfemgoquNwz91souF/test.png",
        }),
      });
      const data = await res.json();
      setTxnLink(data.txLink);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleMint}>Mint the Quest</button>
      {txnLink ? (
        <a href={txnLink} target="_blank">
          View Transaction
        </a>
      ) : (
        <div>The QUEST NFT not minted yet!</div>
      )}
    </div>
  );
}
