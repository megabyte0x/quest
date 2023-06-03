// Create a transfer all asset component which will fetch the data from the transferAllAssetData API and will sign a transaction using ethers.js library and send it to the safeTransferFromTxn API.

import React, { useState } from "react";

export default function Mint() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txnLink, setTxnLink] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [imageURI, setImageURI] = useState("");

  const handleMint = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({
          address: "0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2",
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
