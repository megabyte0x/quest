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
            "ipfs://Qmexqj8zmnmB6vxuAoxN7y7V83JKYqHJ1n8tigtKqeC2gb/me.JPG",
        }),
      });
      const data = await res.json();
      console.log(data);
      setTxnLink(data);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleMint}>Mint the Quest</button>
      {txnLink ? <p>{txnLink}</p> : <p>Transaction link not found</p>}
    </div>
  );
}
