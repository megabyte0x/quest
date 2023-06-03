// Create a transfer all asset component which will fetch the data from the transferAllAssetData API and will sign a transaction using ethers.js library and send it to the safeTransferFromTxn API.

import React, { useState } from "react";

export default function FetchAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tkba, setTkba] = useState("");
  const [tokenId, setTokenId] = useState("0");

  const handleTKBA = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fetchAccount", {
        method: "POST",
        body: JSON.stringify({
          tokenId: tokenId,
        }),
      });
      const tkbAddress = await res.json();
      setTkba(tkbAddress);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleTKBA}>Get TBA</button>
      {tkba ? <p>{tkba}</p> : <p>TKBA not found</p>}
    </div>
  );
}
